<?php

declare (strict_types = 1);

// app/Repositories/ProductRepository.php

namespace App\Repositories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ColorAttribute;
use App\Models\Product;
use App\Models\ProductSeo;
use App\Models\ProductSpecValue;
use App\Models\ProductVariation;
use App\Models\ProductVariationType;
use App\Models\SpecAttribute;
use App\Models\SpecGroup;
use App\Models\Tag;
use App\Modules\Cache\Services\SmartCacheService;
use App\Traits\ImageHandlerTrait;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductRepository extends BaseRepository
{
    use ImageHandlerTrait;

    protected Model $model;
    protected $skuPrefix = 'TBZ';

    public function __construct(Product $model, $skuPrefix = 'TBZ')
    {
        parent::__construct($model);
        $this->model = $model;

        $this->setImageConfig([
            'storage_path' => 'images/products',
        ]);

        $this->skuPrefix = $skuPrefix;

    }

    public function getProductsWithRelations(array $relations = []): Collection
    {
        return $this->model->with($relations)->latest()->get();
    }

    public function getPaginatedProducts(array $params, int $perPage = 10): LengthAwarePaginator
    {
        $query = $this->model->with(['brand', 'category', 'subcategory'])->query();

        if (isset($params['search'])) {
            $query->where(function ($q) use ($params) {
                foreach ($this->getSearchableFields() as $field) {
                    $q->orWhere($field, 'like', '%' . $params['search'] . '%');
                }
            });
        }

        if (isset($params['sort'])) {
            $sortParams = explode('|', $params['sort']);
            if (in_array($sortParams[0], $this->getSortableFields(), true)) {
                $query->orderBy($sortParams[0], $sortParams[1] ?? 'asc');
            }
        }

        return $query->paginate($perPage);
    }

    /**
     * Paginate products with relations for listing pages.
     * Accepts either a Request instance or an array of params.
     */
    public function paginate(Request $request, array $columns = ['*']): \Illuminate\Pagination\LengthAwarePaginator
    {
        $params          = $request->isMethod('post') ? $request->all() : $request->query();
        $combinedRequest = new Request($params);

        $query = $this->model->with(['brand', 'category', 'subcategory']);

        $query = \App\Helpers\QueryBuilderHelper::apply(
            $combinedRequest,
            $query,
            $this->getSearchableFields(),
            $this->getSortableFields()
        );

        return \App\Helpers\QueryBuilderHelper::paginate($combinedRequest, $query);
    }

    public function createProduct(array $data): array
    {
        return DB::transaction(function () use ($data) {
            try {
                $brandId = is_numeric($data['brand_id'])
                    ? (int) $data['brand_id']
                    : $this->getBrandId($data['brand_id']);

                $categoryId = is_numeric($data['category_id'])
                    ? (int) $data['category_id'] : $this->getCategoryId($data['category_id']);

                $subCatId = null;
                if (! empty($data['sub_category_id'])) {
                    $subCatId = is_numeric($data['sub_category_id'])
                        ? (int) $data['sub_category_id'] : $this->getSubCategoryId($categoryId, $data['sub_category_id']);
                }

                $childCatId = null;
                if (! empty($data['child_category_id'])) {
                    $childCatId = is_numeric($data['child_category_id'])
                        ? (int) $data['child_category_id'] : $this->getChildCategoryId($subCatId, $data['child_category_id']);
                }

                $sku = $this->generateSKU($this->skuPrefix, $categoryId, $subCatId, $childCatId);

                // Handle slug - generate if not provided or empty
                $slug = $data['slug'] ?? '';
                if (empty($slug)) {
                    $slug = \Illuminate\Support\Str::slug($data['name']);
                }

                $productData = [
                    'brand_id'           => $brandId ?? null,
                    'category_id'        => $categoryId ?? null,
                    'subcategory_id'     => $subCatId ?? null,
                    'child_category_id'  => $childCatId ?? null,
                    'name'               => $data['name'],
                    'slug'               => $slug,
                    'sku'                => $sku,
                    'unit_price'         => $data['unit_price'],
                    'discount_type'      => $data['discount_type'],
                    'discount_price'     => $data['discount_price'],
                    'short_descp'        => $data['short_descp'],
                    'long_descp'         => $data['long_descp'],
                    'key_features'       => $data['key_features'],
                    'product_specs_data' => $data['product_specs_data'] ?? null,
                    'qty'                => $data['qty'],
                    'hot_deals'          => $data['hot_deals'] ?? 0,
                    'featured'           => $data['featured'] ?? 0,
                    'special_offer'      => $data['special_offer'] ?? 0,
                    'special_deals'      => $data['special_deals'] ?? 0,
                    'call_for_price'     => $data['call_for_price'] ?? 0,
                    'product_thumbnail'  => 'default.png',
                    'status'             => 1,
                    'created_at'         => Carbon::now(),
                    'size'               => $data['size'] ?? null,

                ];

                $product = $this->model->create($productData);

                // Save thumbnail via Media Library and sync column
                if (! empty($data['product_thumbnail'])) {
                    $product->addMedia($data['product_thumbnail'])
                        ->toMediaCollection('thumbnail');
                    $thumbUrl                   = $product->getFirstMediaUrl('thumbnail');
                    $thumbPath                  = ltrim(str_replace(url(''), '', $thumbUrl), '/');
                    $product->product_thumbnail = $thumbPath;
                    $product->save();
                }

                // Calculate and save final price
                $product->final_price = $this->calculateFinalPrice(
                    $data['unit_price'],
                    $data['discount_type'],
                    $data['discount_price'],
                    $data['product_tax'] ?? null,
                    $data['tax_calculation'] ?? null
                );

                $product->save();

                // Process tags and sizes
                $fields = ['tags' => $data['tags'] ?? [], 'size' => $data['size'] ?? []];
                foreach ($fields as $field => $value) {
                    if (! empty($value)) {
                        $product->update([$field => implode(',', $value)]);
                    }
                }

                // Process tags
                $this->processTag($product, $data['tags']);

                // Process Product Variations
                if (! empty($data['variations'])) {
                    foreach ($data['variations'] as $variation) {
                        ProductVariation::create([
                            'product_id' => $product->id,
                            'name'       => $variation['name'],
                            'sku'        => $variation['sku'],
                            'price'      => $variation['price'],
                            'stock'      => $variation['stock'],
                            'attributes' => json_encode($variation['attributes'], JSON_THROW_ON_ERROR),
                        ]);
                    }

                    // Ensure global variation types exist for this product scope
                    $this->ensureGlobalVariationTypes($categoryId, $subCatId, $brandId, $data['variations']);
                }

                // Process color images - store only in Spatie Media Library with custom properties
                if (! empty($data['color_images'])) {
                    foreach ($data['color_images'] as $colorImage) {
                        $file = $colorImage['file'] ?? ($colorImage['image'] ?? null);
                        if ($file) {
                            $colorAttributeId = null;

                            if (isset($colorImage['colorCode'])) {
                                $colorAttr        = ColorAttribute::where('code', $colorImage['colorCode'])->first();
                                $colorAttributeId = $colorAttr?->id;
                            } elseif (isset($colorImage['color_attribute_id'])) {
                                $colorAttributeId = (int) $colorImage['color_attribute_id'];
                            }

                            if ($colorAttributeId) {
                                $product->addMedia($file)
                                    ->withCustomProperties(['color_attribute_id' => $colorAttributeId])
                                    ->toMediaCollection('color_images');
                            }
                        }
                    }
                }

                // Process multi images - store only in Spatie Media Library
                if (! empty($data['images'])) {
                    foreach ($data['images'] as $img) {
                        $product->addMedia($img)
                            ->toMediaCollection('multi_images');
                    }
                }

                // Create SEO data
                ProductSeo::create([
                    'product_id'       => $product->id,
                    'meta_title'       => $data['meta_title'] ?? 'N/A',
                    'meta_description' => $data['meta_description'] ?? 'N/A',
                    'meta_keywords'    => $data['meta_keywords'] ?? '',
                    'meta_tags'        => $data['meta_tags'] ?? '',
                ]);

                // Upsert specs if provided
                if (! empty($data['specs']) && is_array($data['specs'])) {
                    $this->upsertProductSpecs($product->id, $data['specs']);
                }
                SmartCacheService::flushAll();
                return ['success' => true, 'product_id' => $product->id];
            } catch (\Exception $e) {
                Log::error('Error creating product: ' . $e->getMessage());
                throw $e;
            }
        });
    }

    /**
     * Ensure product variation types exist for given variations
     */
    private function ensureGlobalVariationTypes($categoryId, $subCategoryId, $brandId, array $variations): void
    {
        $typeNames = [];
        foreach ($variations as $variation) {
            if (! empty($variation['attributes']) && is_array($variation['attributes'])) {
                foreach (array_keys($variation['attributes']) as $attrName) {
                    $typeNames[$attrName] = true;
                }
            }
        }

        foreach (array_keys($typeNames) as $name) {
            ProductVariationType::firstOrCreate([
                'name'           => $name,
                'category_id'    => $categoryId,
                'subcategory_id' => $subCategoryId,
                'brand_id'       => $brandId,
            ]);
        }
    }

    private function upsertProductSpecs(int $productId, array $specs): void
    {
        Log::info('upsertProductSpecs called', ['productId' => $productId, 'specs' => $specs]);

        foreach ($specs as $groupName => $attributes) {
            Log::info('Processing group: ' . $groupName, ['attributes' => $attributes]);

            $group = SpecGroup::firstOrCreate(['name' => $groupName]);
            Log::info('Group created/found', ['groupId' => $group->id, 'groupName' => $group->name]);

            foreach ($attributes as $attrName => $value) {
                $attribute = SpecAttribute::firstOrCreate([
                    'spec_group_id' => $group->id,
                    'name'          => $attrName,
                ], [
                    'input_type' => 'text',
                ]);
                Log::info('Attribute created/found', ['attrId' => $attribute->id, 'attrName' => $attribute->name]);

                $specValue = ProductSpecValue::updateOrCreate([
                    'product_id'        => $productId,
                    'spec_attribute_id' => $attribute->id,
                ], [
                    'value' => is_array($value) ? json_encode($value, JSON_THROW_ON_ERROR) : (string) $value,
                ]);
                Log::info('Spec value saved', ['specValueId' => $specValue->id, 'value' => $specValue->value]);
            }
        }
    }

    /**
     * Sync product variation types with provided variations
     */
    // Removed per-product sync: variation types are global
    public function processTag($product, $tags)
    {
        if ($tags && is_array($tags)) {
            foreach ($tags as $tagName) {
                // Check if tag exists by name
                $tag = Tag::where('name', $tagName)->first();
                if (! $tag) {
                    // Create if not exists
                    $tag = Tag::create(['name' => $tagName]);
                }

                // Attach (but prevent duplicate entries)
                $product->tag()->syncWithoutDetaching([$tag->id]);
            }
        }
    }

    private function getBrandId($data)
    {
        return Brand::create([
            'name' => $data,
        ])->id;
    }

    public function getCategoryId($data)
    {
        return Category::create([
            'name' => $data])->id;
    }

    public function getSubCategoryId($catId, $data)
    {
        // Create the sub-category as a child of the main category
        $subCategory = Category::create([
            'name'      => $data,
            'slug'      => \Illuminate\Support\Str::slug($data),
            'parent_id' => $catId,
            'level'     => 1,
            'path'      => (string) $catId,
            'status'    => true,
        ]);

        return $subCategory->id;
    }

    public function getChildCategoryId($subCatId, $data)
    {
        // Get the parent category to calculate level and path
        $parentCategory = Category::find($subCatId);
        $level          = $parentCategory ? $parentCategory->level + 1 : 2;
        $path           = $parentCategory ? $parentCategory->path . '/' . $subCatId : (string) $subCatId;

        // Create the child category as a child of the sub-category
        $childCategory = Category::create([
            'name'      => $data,
            'slug'      => \Illuminate\Support\Str::slug($data),
            'parent_id' => $subCatId,
            'level'     => $level,
            'path'      => $path,
            'status'    => true,
        ]);

        return $childCategory->id;
    }

    public function updateProduct(int $productId, array $data): array
    {
        return DB::transaction(function () use ($productId, $data) {
            try {
                // Find the product
                $product = $this->model->findOrFail($productId);

                // Handle thumbnail image update via Media Library
                if (isset($data['product_thumbnail'])) {
                    // replace existing media in singleFile collection
                    $product->addMedia($data['product_thumbnail'])
                        ->toMediaCollection('thumbnail');
                    $thumbUrl                   = $product->getFirstMediaUrl('thumbnail');
                    $product->product_thumbnail = ltrim(str_replace(url(''), '', $thumbUrl), '/');
                }

                                      // Generate new SKU if category changed
                $sku = $product->sku; // Keep existing SKU by default
                if (isset($data['category_id']) || isset($data['sub_category_id']) || isset($data['child_category_id'])) {
                    $sku = $this->generateSKU(
                        'RTX',
                        $data['category_id'] ?? $product->category_id,
                        $data['sub_category_id'] ?? null,
                        $data['child_category_id'] ?? null
                    );
                }

                // Handle slug - generate if not provided or empty
                $slug = $data['slug'] ?? $product->slug;
                if (empty($slug)) {
                    $slug = \Illuminate\Support\Str::slug($data['name'] ?? $product->name);
                }

                // Prepare product data for update
                $productData = [
                    'brand_id'           => $data['brand_id'] ?? $product->brand_id,
                    'category_id'        => $data['category_id'] ?? $product->category_id,
                    'subcategory_id'     => $data['subcategory_id'] ?? $product->subcategory_id,
                    'child_category_id'  => $data['child_category_id'] ?? $product->child_category_id,
                    'name'               => $data['name'] ?? $product->name,
                    'slug'               => $slug,
                    'sku'                => $sku,
                    'unit_price'         => $data['unit_price'] ?? $product->unit_price,
                    'discount_type'      => $data['discount_type'] ?? $product->discount_type,
                    'discount_price'     => $data['discount_price'] ?? $product->discount_price,
                    'short_descp'        => $data['short_descp'] ?? $product->short_descp,
                    'long_descp'         => $data['long_descp'] ?? $product->long_descp,
                    'key_features'       => $data['key_features'] ?? $product->key_features,
                    'product_specs_data' => $data['product_specs_data'] ?? $product->product_specs_data,
                    'qty'                => $data['qty'] ?? $product->qty,
                    'hot_deals'          => $data['hot_deals'] ?? $product->hot_deals,
                    'featured'           => $data['featured'] ?? $product->featured,
                    'special_offer'      => $data['special_offer'] ?? $product->special_offer,
                    'special_deals'      => $data['special_deals'] ?? $product->special_deals,
                    'call_for_price'     => $data['call_for_price'] ?? $product->call_for_price,
                    'size'               => $this->processArrayField($data['size'] ?? $product->size),
                    'updated_at'         => Carbon::now(),
                ];

                // Sync DB column from media if updated above
                if (isset($data['product_thumbnail'])) {
                    $productData['product_thumbnail'] = $product->product_thumbnail;
                }

                // Update product
                $product->update($productData);

                // Calculate and update final price if pricing data changed
                if (isset($data['unit_price']) || isset($data['discount_type']) || isset($data['discount_price'])) {
                    $product->final_price = $this->calculateFinalPrice(
                        $data['unit_price'] ?? $product->unit_price,
                        $data['discount_type'] ?? $product->discount_type,
                        $data['discount_price'] ?? $product->discount_price,
                        $data['product_tax'] ?? null,
                        $data['tax_calculation'] ?? null
                    );
                    $product->save();
                }

                // Update tags if provided
                if (isset($data['tags'])) {
                    // Handle tags - convert to array if it's a string, or use as-is if it's already an array
                    $tagsArray  = is_array($data['tags']) ? $data['tags'] : (is_string($data['tags']) ? explode(',', $data['tags']) : []);
                    $tagsString = $this->processArrayField($data['tags']);

                    $product->update(['tags' => $tagsString]);
                    // Process tag relationships
                    $this->processTag($product, $tagsArray);
                }

                // Update Product Variations
                if (isset($data['variations'])) {
                    // Delete existing variations
                    ProductVariation::where('product_id', $product->id)->delete();

                    // Create new variations
                    foreach ($data['variations'] as $variation) {
                        ProductVariation::create([
                            'product_id' => $product->id,
                            'name'       => $variation['name'],
                            'sku'        => $variation['sku'],
                            'price'      => $variation['price'],
                            'stock'      => $variation['stock'],
                            'attributes' => json_encode($variation['attributes'], JSON_THROW_ON_ERROR),
                        ]);
                    }

                    // Ensure global variation types exist for this product scope
                    $this->ensureGlobalVariationTypes(
                        $data['category_id'] ?? $product->category_id,
                        $data['sub_category_id'] ?? $product->subcategory_id,
                        $data['brand_id'] ?? $product->brand_id,
                        $data['variations']
                    );
                }

                // Update color images - work with Spatie Media Library only
                // 1) Delete selected color images if provided (media IDs)
                if (! empty($data['deleted_color_images']) && is_array($data['deleted_color_images'])) {
                    $mediaItems = $product->media()
                        ->where('collection_name', 'color_images')
                        ->whereIn('id', $data['deleted_color_images'])
                        ->get();
                    foreach ($mediaItems as $media) {
                        $media->delete();
                    }
                }
                // 2) Append newly uploaded color images (supports both colorCode or color_attribute_id)
                if (! empty($data['color_images']) && is_array($data['color_images'])) {
                    foreach ($data['color_images'] as $colorImage) {
                        $file = $colorImage['file'] ?? ($colorImage['image'] ?? null);
                        if (! $file) {
                            continue;
                        }

                        $colorAttributeId = null;
                        if (! empty($colorImage['color_attribute_id'])) {
                            $colorAttributeId = (int) $colorImage['color_attribute_id'];
                        } elseif (! empty($colorImage['colorCode'])) {
                            $attr             = ColorAttribute::where('code', $colorImage['colorCode'])->first();
                            $colorAttributeId = $attr?->id;
                        }

                        if ($colorAttributeId) {
                            $product->addMedia($file)
                                ->withCustomProperties(['color_attribute_id' => $colorAttributeId])
                                ->toMediaCollection('color_images');
                        }
                    }
                }

                // Update multi images - work with Spatie Media Library only
                // 1) Delete selected existing images if provided (media IDs)
                if (! empty($data['deleted_images']) && is_array($data['deleted_images'])) {
                    $mediaItems = $product->media()
                        ->where('collection_name', 'multi_images')
                        ->whereIn('id', $data['deleted_images'])
                        ->get();
                    foreach ($mediaItems as $media) {
                        $media->delete();
                    }
                }
                // 2) Add new images
                if (! empty($data['images']) && is_array($data['images'])) {
                    foreach ($data['images'] as $img) {
                        if (! $img) {
                            continue;
                        }
                        $product->addMedia($img)->toMediaCollection('multi_images');
                    }
                }

                // Handle specs - clear existing and add new ones
                if (isset($data['specs'])) {

                    // Delete existing specs for this product
                    ProductSpecValue::where('product_id', $product->id)->delete();

                    // Add new specs if provided
                    if (! empty($data['specs']) && is_array($data['specs'])) {
                        $this->upsertProductSpecs($product->id, $data['specs']);
                    }
                }

                // Update SEO data
                if (isset($data['meta_title']) || isset($data['meta_description']) || isset($data['meta_keywords']) || isset($data['meta_tags'])) {
                    $seoData = ProductSeo::where('product_id', $product->id)->first();

                    if ($seoData) {
                        $seoData->update([
                            'meta_title'       => $data['meta_title'] ?? $seoData->meta_title,
                            'meta_description' => $data['meta_description'] ?? $seoData->meta_description,
                            'meta_keywords'    => $data['meta_keywords'] ?? $seoData->meta_keywords,
                            'meta_tags'        => $data['meta_tags'] ?? $seoData->meta_tags,
                        ]);
                    } else {
                        ProductSeo::create([
                            'product_id'       => $product->id,
                            'meta_title'       => $data['meta_title'] ?? 'N/A',
                            'meta_description' => $data['meta_description'] ?? 'N/A',
                            'meta_keywords'    => $data['meta_keywords'] ?? '',
                            'meta_tags'        => $data['meta_tags'] ?? '',
                        ]);
                    }
                }

                SmartCacheService::flushAll();

                return ['success' => true, 'product_id' => $product->id];

            } catch (\Exception $e) {
                Log::error('Error updating product: ' . $e->getMessage());
                throw $e;
            }
        });
    }

    /**
     * Helper method to delete image from storage
     */
    private function deleteImageFromStorage(string $imagePath): void
    {
        try {
            // Extract the file path from the public URL
            $relativePath = str_replace(url(''), '', $imagePath);
            $relativePath = ltrim($relativePath, '/');
            $fullPath     = public_path($relativePath);

            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        } catch (\Exception $e) {
            Log::warning('Failed to delete image: ' . $e->getMessage());
        }
    }

    /**
     * Delete spatie media item associated with a stored public path like 'storage/{media_id}/file.jpg'
     */
    private function deleteMediaByStoredPath(Product $product, string $storedPath, string $collection): void
    {
        try {
            $path = ltrim(str_replace(url(''), '', $storedPath), '/');
            // Expecting 'storage/{id}/file'
            if (preg_match('#^storage/(\d+)/#', $path, $m)) {
                $mediaId = (int) $m[1];
                $media   = Media::find($mediaId);
                if ($media && (int) $media->model_id === (int) $product->id && $media->collection_name === $collection) {
                    $media->delete();
                }
            } else {
                // Fallback: try to match by file_name in the target collection
                $fileName = basename($path);
                $media    = $product->media()->where('collection_name', $collection)->where('file_name', $fileName)->first();
                if ($media) {
                    $media->delete();
                }
            }
        } catch (\Exception $e) {
            Log::warning('Failed to delete media: ' . $e->getMessage());
        }
    }

    public function deleteProduct(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            try {
                $product = $this->model->findOrFail($id);

                // Delete all media collections (Spatie Media Library handles file deletion automatically)
                $product->clearMediaCollection('multi_images');
                $product->clearMediaCollection('color_images');
                $product->clearMediaCollection('thumbnail');

                // Delete thumbnail file if stored in column
                if ($product->product_thumbnail) {
                    $this->deleteImageFromStorage($product->product_thumbnail);
                }

                // Delete SEO data
                ProductSeo::where('product_id', $id)->delete();

                // Delete the product
                return $product->delete();
            } catch (\Exception $e) {
                Log::error('Error deleting product: ' . $e->getMessage());
                throw $e;
            }
        });
    }

    /**
     * Delete specific multi images by IDs for a product.
     * Now works with Spatie Media Library media IDs.
     */
    public function deleteMultiImagesByIds(int $productId, array $ids): int
    {
        return DB::transaction(function () use ($productId, $ids) {
            $product    = $this->model->findOrFail($productId);
            $mediaItems = $product->media()->where('collection_name', 'multi_images')->whereIn('id', $ids)->get();
            $deleted    = 0;

            foreach ($mediaItems as $media) {
                try {
                    Log::info('Deleting multi image media', ['id' => $media->id, 'product_id' => $productId]);

                    // Delete from Spatie media library (this also handles file deletion)
                    $media->delete();

                    $deleted++;
                } catch (\Exception $e) {
                    Log::error('Failed to delete multi image media', [
                        'media_id' => $media->id,
                        'error'    => $e->getMessage(),
                        'trace'    => $e->getTraceAsString(),
                    ]);
                    // Continue with next image
                }
            }

            return $deleted;
        });
    }

    public function getProductWithRelations(int $id, array $relations = []): ?object
    {
        return $this->model->with($relations)->find($id);
    }

    public function generateSKU(string $productName, $categoryId, $subCategoryId = null, $childCategoryId = null): string
    {
        try {
            $category      = Category::findOrFail($categoryId);
            $category_name = substr($category->name, 0, 3);
            $name          = substr($productName, 0, 3);

            $sku = strtoupper($this->skuPrefix . '-' . $category_name . '-' . $name);

            // Add sub category to SKU if provided
            if ($subCategoryId) {
                $sub_category      = Category::findOrFail($subCategoryId);
                $sub_category_name = substr($sub_category->name, 0, 3);
                $sku .= '-' . $sub_category_name;
            }

            // Add child category to SKU if provided
            if ($childCategoryId) {
                $child_category      = Category::findOrFail($childCategoryId);
                $child_category_name = substr($child_category->name, 0, 3);
                $sku .= '-' . $child_category_name;
            }

            $sku .= '-' . rand(1000, 9999);

            return $sku;
        } catch (\Exception $e) {
            Log::error('Error generating SKU: ' . $e->getMessage());

            return strtoupper('PROD-' . Str::random(8));
        }
    }

    public function calculateFinalPrice($unitPrice, ?string $discountType, $discountPrice, ?float $productTax, ?bool $taxCalculation): float
    {
        $price = $unitPrice;

        // Apply discount
        if ($discountType === 'flat') {
            $price -= $discountPrice;
        } elseif ($discountType === 'percent') {
            $price -= ($price * ($discountPrice / 100));
        }

        // Apply tax
        if ($taxCalculation) {
            $price /= (1 + $productTax / 100);
        } else {
            $price += $price * ($productTax / 100);
        }

        return round($price, 2);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'sku', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'sku', 'created_at'];
    }

    protected function getPublicUrl(string $storagePath): string
    {
        return ltrim($storagePath, '/');
    }

    /**
     * Convert public URL to storage path
     */
    protected function getStoragePath(string $publicUrl): string
    {
        //		return str_replace('storage/', '', $publicUrl);
        return str_replace('/', '', $publicUrl);
    }

    private function deleteFile(string $path): void
    {
        if ($path) {
            $storagePath = str_replace('storage/', '', $path);
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
        }
    }

    /**
     * Delete multiple products by IDs.
     */
    public function batchDelete(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }

    /**
     * Process array field - handle both array and string inputs
     */
    private function processArrayField($value): string
    {
        if (is_array($value)) {
            return implode(',', $value);
        } elseif (is_string($value)) {
            // If it's already a comma-separated string, return as-is
            // If it's a JSON string like "[]", convert to empty string
            if ($value === '[]' || $value === '{}') {
                return '';
            }
            return $value;
        }
        return '';
    }
}
