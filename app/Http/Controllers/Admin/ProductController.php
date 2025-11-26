<?php
namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ColorAttribute;
use App\Models\Product;
use App\Models\ProductSeo;
use App\Models\ProductVariation;
use App\Models\ProductVariationType;
use App\Models\ProductVariationTypeValue;
use App\Models\SpecGroup;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Repositories\ProductRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ) {}

    /**
     * Display a listing of products.
     */
    public function index(Request $request): Response
    {
        $products = $this->productRepository->paginate($request);

        return Inertia::render('product/index', [
            'products' => $products,
            'filters'  => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        return Inertia::render('product/create', [
            'brands'          => Brand::latest()->get(),
            'categories'      => Category::with(['children', 'children.children'])->roots()->latest()->get(),
            'tags'            => Tag::latest()->get(),
            'colorAttributes' => ColorAttribute::latest()->get(),
        ]);
    }

    /**
     * Get subcategories for a given category
     */
    public function getSubCategories($categoryId)
    {
        $subCategories = Category::where('parent_id', $categoryId)
            ->with(['children'])
            ->latest()
            ->get();

        return response()->json($subCategories);
    }

    /**
     * Get child categories for a given subcategory
     */
    public function getChildCategories($subCategoryId)
    {
        $childCategories = Category::where('parent_id', $subCategoryId)
            ->latest()
            ->get();

        return response()->json($childCategories);
    }

    public function variationTypes(Request $request)
    {
        $query = ProductVariationType::query();

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }
        if ($request->filled('sub_category_id')) {
            $query->where('subcategory_id', $request->integer('sub_category_id'));
        }
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->integer('brand_id'));
        }

        $types = $query->orderBy('name')->get(['id', 'name']);

        return response()->json($types);
    }

    /**
     * Store a newly created product in storage.
     */
    //    public function store(Request $request): RedirectResponse
    public function store(Request $request)
    {
        // return $request->all();

        //        try {
        $result = $this->productRepository->createProduct($request->all());

        return success_route('product.index', 'Product created successfully.');
        //        } catch (\Exception $e) {
        //            return error_response($e->getMessage(), 500);
        //        }
    }

    public function specOptions(Request $request)
    {
        $groups = SpecGroup::query()
            ->with(['attributes' => function ($q) {
                $q->orderBy('name');
            }])
            ->orderBy('name')
            ->get()
            ->map(function ($g) {
                return [
                    'id'         => $g->id,
                    'name'       => $g->name,
                    'attributes' => $g->attributes->map(fn($a) => [
                        'id'         => $a->id,
                        'name'       => $a->name,
                        'input_type' => $a->input_type,
                    ])->values(),
                ];
            })
            ->values();

        return response()->json($groups);
    }

    /**
     * Display the specified product.
     */
    public function show(int $id): Response
    {
        $product = $this->productRepository->getProductWithRelations($id, [
            'brand',
            'category',
            'subcategory',
            'childCategory',
            'seo',
            'colorImages',
            'colorImages.colorAttribute',
            'multiImages',
            'variations',
            'specValues.attribute.group',
            'tag',
        ]);

        if (! $product) {
            error_response('Product not found', 404);
        }

        return Inertia::render('product/show', [
            'product'      => $product,
            'productSpecs' => $product ? $product->specsByGroup() : new \stdClass(),
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(int $id)
    {
        $product = $this->productRepository->getProductWithRelations($id, [
            'seo',
            'brand',
            'variations',
            'specValues.attribute.group',
            'category',
            'subcategory',
            'childCategory',
            'tag',
        ]);

        $categories      = Category::with(['children', 'children.children'])->roots()->latest()->get();
        $colorAttributes = ColorAttribute::all();
        $seo             = ProductSeo::find($id);

        if (! $product) {
            error_response('Product not found', 404);
        }

        // Handle legacy data: if subcategory_id and child_category_id are null,
        // but category_id exists, try to determine the correct hierarchy
        if ($product->category_id && ! $product->subcategory_id && ! $product->child_category_id) {
            $category = Category::find($product->category_id);
            if ($category) {
                // Check if this is actually a child category (level 2)
                if ($category->level == 2 && $category->parent_id) {
                    $product->child_category_id = $category->id;
                    $subCategory                = Category::find($category->parent_id);
                    if ($subCategory && $subCategory->parent_id) {
                        $product->subcategory_id = $subCategory->id;
                        $product->category_id    = $subCategory->parent_id;
                    }
                }
                // Check if this is actually a subcategory (level 1)
                elseif ($category->level == 1 && $category->parent_id) {
                    $product->subcategory_id = $category->id;
                    $product->category_id    = $category->parent_id;
                }
                // Otherwise, it's a main category (level 0), no changes needed
            }
        }

        // Load subcategories and child categories for the product's category hierarchy
        $subCategories   = [];
        $childCategories = [];

        if ($product->category_id) {
            $subCategories = Category::where('parent_id', $product->category_id)->get();
        }

        if ($product->subcategory_id) {
            $childCategories = Category::where('parent_id', $product->subcategory_id)->get();
        }

        // Load media collections from Spatie Media Library
        $multiImages = $product->getMedia('multi_images')->map(function ($media) {
            return [
                'id'    => $media->id,
                'photo' => $media->getUrl(),
                'url'   => $media->getUrl(),
            ];
        });

        // Load color images from media collection with color attribute info
        $colorImages = $product->getMedia('color_images')->map(function ($media) {
            // Get color attribute from custom properties
            $colorAttributeId = $media->getCustomProperty('color_attribute_id');
            $colorAttribute   = null;

            if ($colorAttributeId) {
                $colorAttribute = ColorAttribute::find($colorAttributeId);
            }

            return [
                'id'                 => $media->id,
                'image'              => $media->getUrl(),
                'url'                => $media->getUrl(),
                'color_attribute_id' => $colorAttributeId,
                'color_attribute'    => $colorAttribute ? [
                    'id'   => $colorAttribute->id,
                    'name' => $colorAttribute->name,
                    'code' => $colorAttribute->code,
                ] : null,
            ];
        });

        return Inertia::render('product/edit', [
            'product'         => $product,
            'categories'      => $categories,
            'subCategories'   => $subCategories,
            'childCategories' => $childCategories,
            'seo'             => $seo,
            'colorAttributes' => $colorAttributes,
            'brands'          => Brand::latest()->get(),
            'productSpecs'    => $product ? $product->specsByGroup() : new \stdClass(),
            'multi_images'    => $multiImages,
            'color_images'    => $colorImages,
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, int $id)
    {
        // try {
        $data = $request->all();

        // Update the product using the proper updateProduct method
        $this->productRepository->updateProduct($id, $data);

        return success_route('product.index', 'Product updated successfully.');
        // } catch (\Exception $e) {
        //     Log::error('Product update error', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        //     return error_route('product.index', 'Failed to update product: ' . $e->getMessage());
        // }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->productRepository->delete($id);

            return success_route('product.index', 'Product deleted successfully.');
        } catch (\Exception $e) {
            return error_route('product.index', 'Failed to delete product: ' . $e->getMessage());
        }
    }

    public function GetSubCategory($category_id)
    {
        $subCategories = SubCategory::where('category_id', $category_id)
            ->orderBy('name', 'ASC')
            ->get();

        return response()->json($subCategories);
    }

    public function variationTypeValues(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $name = $request->string('name');

        // First, try to fetch from dedicated values table matching the scoped type
        $typeQuery = ProductVariationType::query()->where('name', $name);
        if ($request->filled('category_id')) {
            $typeQuery->where('category_id', $request->integer('category_id'));
        }

        if ($request->filled('sub_category_id')) {
            $typeQuery->where('subcategory_id', $request->integer('sub_category_id'));
        }

        if ($request->filled('brand_id')) {
            $typeQuery->where('brand_id', $request->integer('brand_id'));
        }

        $types  = $typeQuery->get(['id']);
        $values = [];
        if ($types->count() > 0) {
            $typeIds = $types->pluck('id');
            $values  = ProductVariationTypeValue::whereIn('variation_type_id', $typeIds)
                ->orderBy('value')
                ->pluck('value')
                ->unique()
                ->values()
                ->all();
        }

        // Fallback: mine values from existing variations if no values present yet
        if (empty($values)) {
            $variationsQuery = ProductVariation::query()
                ->whereHas('product', function ($q) use ($request) {
                    if ($request->filled('category_id')) {
                        $q->where('category_id', $request->integer('category_id'));
                    }
                    if ($request->filled('sub_category_id')) {
                        $q->where('subcategory_id', $request->integer('sub_category_id'));
                    }
                    if ($request->filled('brand_id')) {
                        $q->where('brand_id', $request->integer('brand_id'));
                    }
                });

            $valuesSet = [];
            foreach ($variationsQuery->get(['attributes']) as $row) {
                $attrs = json_decode($row->attributes ?? '{}', true);
                if (is_array($attrs) && array_key_exists($name, $attrs)) {
                    $valuesSet[$attrs[$name]] = true;
                }
            }
            $values = array_keys($valuesSet);
            sort($values);
        }

        return response()->json($values);
    }

    /**
     * Show bulk edit page for updating categories/brand and pricing for multiple products.
     */
    public function bulkEdit(Request $request): Response
    {
        $products = [];

        return Inertia::render('product/bulk-edit', [
            'products'   => $products,
            'brands'     => Brand::latest()->get(['id', 'name']),
            'categories' => Category::with(['children', 'children.children'])->roots()->latest()->get(),
        ]);
    }

    public function all(Request $request): JsonResponse
    {
        $search = $request->input('search', '');
        $limit  = $request->integer('limit', 50); // Default limit of 50 products
        $page   = $request->integer('page', 1);
        $offset = ($page - 1) * $limit;

        $query = Product::query()
            ->select(['id', 'name', 'sku', 'brand_id', 'category_id', 'subcategory_id', 'child_category_id', 'unit_price', 'qty', 'discount_type', 'discount_price', 'call_for_price']);

        // Add search functionality
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        // Add brand filter
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->integer('brand_id'));
        }

        // Add category filter (main category only)
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        // Get total count for pagination
        $total = $query->count();

        $products = $query
            ->orderBy('name')
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->map(function ($p) {
                return [
                    'id'                => $p->id,
                    'name'              => $p->name,
                    'sku'               => $p->sku,
                    'brand_id'          => $p->brand_id,
                    'category_id'       => $p->category_id,
                    'subcategory_id'    => $p->subcategory_id,
                    'child_category_id' => $p->child_category_id,
                    'unit_price'        => $p->unit_price,
                    'qty'               => $p->qty,
                    'discount_type'     => $p->discount_type,
                    'discount_price'    => $p->discount_price,
                    'call_for_price'    => $p->call_for_price,
                    'thumbnail_url'     => $p->image_url ?? null,
                ];
            })
            ->values();

        return response()->json([
            'data'     => $products,
            'total'    => $total,
            'page'     => $page,
            'limit'    => $limit,
            'has_more' => ($offset + $limit) < $total,
        ]);
    }

    /**
     * Delete selected multi images for a product (AJAX).
     * Now works with Spatie Media Library media IDs.
     */
    public function deleteImages(Request $request, int $product)
    {
        $validated = $request->validate([
            'ids'   => 'required|array|min:1',
            'ids.*' => 'integer|exists:media,id',
        ]);

        $count = $this->productRepository->deleteMultiImagesByIds($product, $validated['ids']);

        return back();
    }

    public function basic(Product $product): JsonResponse
    {
        return response()->json([
            'id'                => $product->id,
            'name'              => $product->name,
            'sku'               => $product->sku,
            'brand_id'          => $product->brand_id,
            'category_id'       => $product->category_id,
            'subcategory_id'    => $product->subcategory_id,
            'child_category_id' => $product->child_category_id,
            'unit_price'        => $product->unit_price,
            'qty'               => $product->qty,
            'discount_type'     => $product->discount_type,
            'discount_price'    => $product->discount_price,
            'thumbnail_url'     => $product->image_url ?? null,
        ]);
    }

    /**
     * Apply bulk updates to selected products.
     */
    public function bulkUpdate(Request $request): RedirectResponse
    {
        // try {
        // Validate that updates array exists and is not empty
        $validated = $request->validate([
            'updates'                     => 'required|array|min:1',
            'updates.*.product_id'        => 'required|integer|exists:products,id',
            'updates.*.brand_id'          => 'nullable|integer|exists:brands,id',
            'updates.*.category_id'       => 'nullable|integer|exists:categories,id',
            'updates.*.subcategory_id'    => 'nullable|integer|exists:categories,id',
            'updates.*.child_category_id' => 'nullable|integer|exists:categories,id',
            'updates.*.unit_price'        => 'nullable|numeric|min:0',
            'updates.*.qty'               => 'nullable|integer|min:0',
            'updates.*.discount_type'     => 'nullable|in:flat,percent',
            'updates.*.discount_price'    => 'nullable|numeric|min:0',
            'updates.*.call_for_price'    => 'nullable|boolean',
        ]);

        $updates      = $validated['updates'];
        $updatedCount = 0;

        foreach ($updates as $row) {
            $productId = $row['product_id'];

            // Prepare update data, excluding product_id
            $updateData    = [];
            $allowedFields = [
                'brand_id',
                'category_id',
                'subcategory_id',
                'child_category_id',
                'unit_price',
                'qty',
                'discount_type',
                'discount_price',
                'call_for_price',
            ];

            foreach ($allowedFields as $field) {
                if (array_key_exists($field, $row)) {
                    $updateData[$field] = $row[$field];
                }
            }

            // Only update if there's data to update
            if (! empty($updateData)) {
                Product::where('id', $productId)->update($updateData);
                $updatedCount++;
            }
        }

        return success_route('product.bulk.edit', "Successfully updated {$updatedCount} product(s).");
        // } catch (\Illuminate\Validation\ValidationException $e) {
        //     // Return to the form with validation errors
        //     return back()->withErrors($e->errors())->withInput();
        // } catch (\Exception $e) {
        //     Log::error('Bulk update error', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        //     return error_route('product.bulk.edit', 'Failed to update products: ' . $e->getMessage());
        // }
    }

    public function storeVariationType(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'category_id'     => 'nullable|integer|exists:categories,id',
            'sub_category_id' => 'nullable|integer|exists:sub_categories,id',
            'brand_id'        => 'nullable|integer|exists:brands,id',
        ]);

        $variationType = ProductVariationType::firstOrCreate([
            'name'           => $validated['name'],
            'category_id'    => $validated['category_id'] ?? null,
            'subcategory_id' => $validated['sub_category_id'] ?? null,
            'brand_id'       => $validated['brand_id'] ?? null,
        ]);

        return response()->json(['id' => $variationType->id, 'name' => $variationType->name]);
    }

    public function storeVariationTypeValue(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'value'           => 'required|string|max:255',
            'category_id'     => 'nullable|integer|exists:categories,id',
            'sub_category_id' => 'nullable|integer|exists:sub_categories,id',
            'brand_id'        => 'nullable|integer|exists:brands,id',
        ]);

        $type = ProductVariationType::firstOrCreate([
            'name'           => $validated['name'],
            'category_id'    => $validated['category_id'] ?? null,
            'subcategory_id' => $validated['sub_category_id'] ?? null,
            'brand_id'       => $validated['brand_id'] ?? null,
        ]);

        $value = ProductVariationTypeValue::firstOrCreate([
            'variation_type_id' => $type->id,
            'value'             => $validated['value'],
        ]);

        return response()->json(['id' => $value->id, 'value' => $value->value]);
    }

    /**
     * Remove multiple products from storage.
     */
    public function batchDelete(Request $request): RedirectResponse
    {
        try {
            $ids = $request->input('ids', []);

            if (empty($ids)) {
                return error_route('product.index', 'No products selected for deletion.');
            }

            // Validate that all IDs are integers
            $validIds = array_filter($ids, function ($id) {
                return is_numeric($id) && (int) $id > 0;
            });

            if (empty($validIds)) {
                return error_route('product.index', 'Invalid product IDs provided.');
            }

            $deletedCount = $this->productRepository->batchDelete($validIds);

            if ($deletedCount > 0) {
                return success_route('product.index', "Successfully deleted {$deletedCount} products.");
            } else {
                return error_route('product.index', 'No products were deleted.');
            }
        } catch (\Exception $e) {
            return error_route('product.index', 'Failed to delete products: ' . $e->getMessage());
        }
    }
}