<?php
namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportOldDatabase extends Command
{
    protected $signature = 'import:old-database
                            {--products-file= : Path to products JSON file}
                            {--images-file= : Path to product images JSON file}
                            {--images-path= : Path to old images directory}
                            {--dry-run : Run without actually importing data}
                            {--limit= : Limit number of products to import}';

    protected $description = 'Import products and images from old database JSON files';

    private $productsData   = [];
    private $imagesData     = [];
    private $brandMap       = [];
    private $categoryMap    = [];
    private $brandsData     = [];
    private $categoriesData = [];

    public function handle()
    {
        $this->info('Starting old database import...');

        // Get file paths
        $productsFile = $this->option('products-file') ?: 'public/json/products.json';
        $imagesFile   = $this->option('images-file') ?: 'public/json/product_images.json';
        $imagesPath   = $this->option('images-path') ?: 'public/image';
        $dryRun       = $this->option('dry-run');
        $limit        = $this->option('limit');

        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be imported');
        }

        // Load and parse JSON files
        $this->loadJsonFiles($productsFile, $imagesFile);

        // Load brands and categories data for name lookup
        $this->loadBrandsAndCategoriesData();

        // Create brand and category mappings
        $this->createMappings();

        // Import products first
        $this->importProducts($limit, $dryRun);

        // Import images after products are imported
        $this->importImages($imagesPath, $dryRun);

        $this->info('Import completed successfully!');
    }

    private function loadJsonFiles($productsFile, $imagesFile)
    {
        $this->info('Loading JSON files...');

        // Load products JSON
        if (! file_exists($productsFile)) {
            $this->error("Products file not found: {$productsFile}");
            return;
        }

        $productsContent = file_get_contents($productsFile);
        $productsJson    = json_decode($productsContent, true);

        if (! $productsJson) {
            $this->error('Invalid products JSON file');
            return;
        }

        // Find products table data
        foreach ($productsJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'products') {
                $this->productsData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        $this->info('Found ' . count($this->productsData) . ' products');

        // Load images JSON
        if (! file_exists($imagesFile)) {
            $this->error("Images file not found: {$imagesFile}");
            return;
        }

        $imagesContent = file_get_contents($imagesFile);
        $imagesJson    = json_decode($imagesContent, true);

        if (! $imagesJson) {
            $this->error('Invalid images JSON file');
            return;
        }

        // Find product_images table data
        foreach ($imagesJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'product_images') {
                $this->imagesData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        $this->info('Found ' . count($this->imagesData) . ' product images');
    }

    private function createMappings()
    {
        $this->info('Creating brand and category mappings...');

        // Get existing brands
        $brands = Brand::all();
        foreach ($brands as $brand) {
            $this->brandMap[$brand->id] = $brand->id;
        }

        // Get existing categories (including all levels)
        $categories = Category::all();
        foreach ($categories as $category) {
            $this->categoryMap[$category->id] = $category->id;
        }

        $this->info('Mappings created successfully');
    }

    private function importProducts($limit, $dryRun)
    {
        $this->info('Starting product import...');

        $imported = 0;
        $skipped  = 0;
        $errors   = 0;

        $productsToImport = $limit ? array_slice($this->productsData, 0, $limit) : $this->productsData;

        foreach ($productsToImport as $index => $productData) {
            try {
                $title = isset($productData['title']) ? $productData['title'] : 'Unknown';
                $sku   = isset($productData['code']) ? $productData['code'] : 'Unknown';

                if (($index + 1) % 100 == 0) {
                    $this->info("Processing product " . ($index + 1) . "/" . count($productsToImport) . ": {$title}");
                }

                // Check if product already exists
                $existingProduct = Product::where('sku', $sku)->first();
                if ($existingProduct) {
                    $this->warn("Product with SKU '{$sku}' already exists, skipping...");
                    $skipped++;
                    continue;
                }

                // Map old fields to new structure
                $mappedData = $this->mapProductData($productData, $dryRun);

                if (! $mappedData) {
                    $title = isset($productData['title']) ? $productData['title'] : 'Unknown';
                    $this->warn("Skipping product due to missing required data: {$title}");
                    $skipped++;
                    continue;
                }

                if (! $dryRun) {
                    $product = Product::create($mappedData);

                    // Create SEO record for the product
                    $this->createProductSeo($product, $productData);

                    $this->info("Imported product: {$product->name} (ID: {$product->id})");
                } else {
                    $this->info("Would import product: {$mappedData['name']}");
                }

                $imported++;

            } catch (\Exception $e) {
                $title = isset($productData['title']) ? $productData['title'] : 'Unknown';
                $sku   = isset($productData['code']) ? $productData['code'] : 'Unknown';
                $this->error("Error importing product '{$title}' (SKU: {$sku}): " . $e->getMessage());
                $this->error("Stack trace: " . $e->getTraceAsString());
                $errors++;
            }
        }

        $this->info("Product import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }

    private function mapProductData($oldData, $dryRun = false)
    {
        // Check required fields
        if (empty($oldData['title']) || empty($oldData['code'])) {
            return null;
        }

        // Handle brand_id - create if not exists
        $brandId = null;
        if (isset($oldData['brand_id']) && $oldData['brand_id']) {
            $oldBrandId = $oldData['brand_id'];

            if (isset($this->brandMap[$oldBrandId])) {
                $brandId = $this->brandMap[$oldBrandId];
            } else {
                // Check if brand exists in JSON data
                $brandName = $this->getBrandNameFromJson($oldBrandId);
                if (! $brandName) {
                    $this->warn("Brand ID {$oldBrandId} not found in brands JSON data, skipping product: {$oldData['title']}");
                    return null;
                }

                // Create new brand if not in dry run mode
                if (! $dryRun) {
                    $brandId = $this->createBrand($oldBrandId, $oldData);
                } else {
                    $this->info("Would create brand for ID: {$oldBrandId}");
                    $brandId = 1;
                }
            }
        }

        // Handle category_id - use the most specific category available
        $categoryId = null;

        // Priority: sub_category_id > category_id
        if (isset($oldData['sub_category_id']) && $oldData['sub_category_id']) {
            $oldSubCategoryId = $oldData['sub_category_id'];
            if (isset($this->categoryMap[$oldSubCategoryId])) {
                $categoryId = $this->categoryMap[$oldSubCategoryId];
            } else {
                // Check if subcategory exists in JSON data
                $subCategoryName = $this->getCategoryNameFromJson($oldSubCategoryId);
                if (! $subCategoryName) {
                    $this->warn("Subcategory ID {$oldSubCategoryId} not found in categories JSON data, skipping product: {$oldData['title']}");
                    return null;
                }

                // Create new category if not in dry run mode
                if (! $dryRun) {
                    $categoryId = $this->createCategory($oldSubCategoryId, $oldData, $oldData['category_id'] ?? null);
                } else {
                    $this->info("Would create subcategory for ID: {$oldSubCategoryId}");
                    $categoryId = 1; // Placeholder for dry run
                }
            }
        } elseif (isset($oldData['category_id']) && $oldData['category_id']) {
            $oldCategoryId = $oldData['category_id'];
            if (isset($this->categoryMap[$oldCategoryId])) {
                $categoryId = $this->categoryMap[$oldCategoryId];
            } else {
                // Check if category exists in JSON data
                $categoryName = $this->getCategoryNameFromJson($oldCategoryId);
                if (! $categoryName) {
                    $this->warn("Category ID {$oldCategoryId} not found in categories JSON data, skipping product: {$oldData['title']}");
                    return null;
                }

                // Create new category if not in dry run mode
                if (! $dryRun) {
                    $categoryId = $this->createCategory($oldCategoryId, $oldData);
                } else {
                    $this->info("Would create category for ID: {$oldCategoryId}");
                    $categoryId = 1; // Placeholder for dry run
                }
            }
        }

        // Calculate final price
        $unitPrice      = (int) (isset($oldData['price']) ? $oldData['price'] : 0);
        $discountAmount = (int) (isset($oldData['discount_amount']) ? $oldData['discount_amount'] : 0);
        $finalPrice     = $unitPrice - $discountAmount;

        return [
            'brand_id'          => $brandId,
            'category_id'       => $categoryId,
            'name'              => $oldData['title'],
            'slug'              => isset($oldData['slug']) ? $oldData['slug'] : Str::slug($oldData['title']),
            'type'              => isset($oldData['type']) ? $oldData['type'] : 'single',
            'sku'               => $oldData['code'],
            'qty'               => (string) (isset($oldData['current_stock']) ? $oldData['current_stock'] : 0),
            'tags'              => isset($oldData['tags']) ? $oldData['tags'] : null,
            'size'              => null,
            'stock'             => 0,
            'unit_price'        => $unitPrice,
            'discount_type'     => null,
            'discount_price'    => null,
            'product_tax'       => null,
            'tax_calculation'   => false,
            'final_price'       => $finalPrice,
            'short_descp'       => isset($oldData['feature']) ? $oldData['feature'] : null,
            'long_descp'        => isset($oldData['description']) ? $oldData['description'] : '',
            'product_thumbnail' => isset($oldData['thumbnail_image']) ? $oldData['thumbnail_image'] : '',
            'hot_deals'         => (int) (isset($oldData['todays_deal']) ? $oldData['todays_deal'] : 0),
            'featured'          => (bool) (isset($oldData['is_featured']) ? $oldData['is_featured'] : false),
            'special_offer'     => false,
            'special_deals'     => false,
            'status'            => (int) (isset($oldData['is_active']) ? $oldData['is_active'] : 1),
            'key_features'      => (isset($oldData['feature']) ? $oldData['feature'] : ''),

//            'is_approved'       => true,
//            'approved_at'       => now(),
//            'rejection_reason'  => null,
        ];
    }

    private function createBrand($oldBrandId, $productData)
    {
        // Try to get brand name from brands JSON data
        $brandName = $this->getBrandNameFromJson($oldBrandId);

        if (! $brandName) {
            // Fallback to product data or use a default
            $brandName = isset($productData['brand_name']) ? $productData['brand_name'] : "Brand {$oldBrandId}";
        }

        try {
            $brand = Brand::create([
                'name'  => $brandName,
                'slug'  => Str::slug($brandName),
                'image' => null,
//                'status' => 1,
            ]);

            // Update mapping
            $this->brandMap[$oldBrandId] = $brand->id;

            $this->info("Created new brand: {$brandName} (ID: {$brand->id})");

            return $brand->id;

        } catch (\Exception $e) {
            $this->error("Error creating brand {$brandName}: " . $e->getMessage());
            return null;
        }
    }

    private function createCategory($oldCategoryId, $productData, $parentCategoryId = null)
    {
        // Try to get category name from categories JSON data
        $categoryName = $this->getCategoryNameFromJson($oldCategoryId);

        if (! $categoryName) {
            // Fallback to product data or use a default
            $categoryName = isset($productData['category_name']) ? $productData['category_name'] :
            (isset($productData['subcategory_name']) ? $productData['subcategory_name'] : "Category {$oldCategoryId}");
        }

        try {
            // Determine parent_id and level
            $parentId = null;
            $level    = 0;
            $path     = null;

            if ($parentCategoryId && isset($this->categoryMap[$parentCategoryId])) {
                $parentId       = $this->categoryMap[$parentCategoryId];
                $parentCategory = Category::find($parentId);
                $level          = $parentCategory ? $parentCategory->level + 1 : 1;
                $path           = $parentCategory ? $parentCategory->path . '/' . $parentId : (string) $parentId;
            }

            $category = Category::create([
                'name'             => $categoryName,
                'slug'             => Str::slug($categoryName),
                'description'      => null,
                'image'            => null,
                'banner'           => null,
                'meta_title'       => null,
                'meta_image'       => null,
                'meta_description' => null,
                'parent_id'        => $parentId,
                'level'            => $level,
                'path'             => $path,
                'status'           => true,
            ]);

            // Update mapping
            $this->categoryMap[$oldCategoryId] = $category->id;

            $this->info("Created new category: {$categoryName} (ID: {$category->id})");

            return $category->id;

        } catch (\Exception $e) {
            $this->error("Error creating category {$categoryName}: " . $e->getMessage());
            return null;
        }
    }

    private function importImages($imagesPath, $dryRun)
    {
        $this->info('Starting image import...');

        if ($dryRun) {
            $this->info('DRY RUN: Skipping image import as products are not actually created');
            return;
        }

        $imported = 0;
        $skipped  = 0;
        $errors   = 0;

        // Group images by product_id
        $imagesByProduct = [];
        foreach ($this->imagesData as $imageData) {
            $productId = isset($imageData['product_id']) ? $imageData['product_id'] : null;
            if ($productId) {
                $imagesByProduct[$productId][] = $imageData;
            }
        }

        foreach ($imagesByProduct as $oldProductId => $images) {
            try {
                // Find the corresponding new product by SKU
                $oldProduct = collect($this->productsData)->firstWhere('id', $oldProductId);
                if (! $oldProduct) {
                    $this->warn("Old product with ID {$oldProductId} not found in products data");
                    $skipped++;
                    continue;
                }

                $sku        = isset($oldProduct['code']) ? $oldProduct['code'] : 'Unknown';
                $newProduct = Product::where('sku', $sku)->first();
                if (! $newProduct) {
                    $this->warn("New product with SKU '{$sku}' not found (product may have failed to import due to missing brand/category)");
                    $skipped++;
                    continue;
                }

                // Import images for this product
                $this->importProductImages($newProduct, $images, $imagesPath, $dryRun, $imported, $skipped, $errors);

            } catch (\Exception $e) {
                $this->error("Error importing images for product ID {$oldProductId}: " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("Image import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }

    private function importProductImages($product, $images, $imagesPath, $dryRun, &$imported, &$skipped, &$errors)
    {
        foreach ($images as $index => $imageData) {
            try {
                $imageName = isset($imageData['image']) ? $imageData['image'] : '';
                if (empty($imageName)) {
                    $skipped++;
                    continue;
                }

                $oldImagePath = $imagesPath . '/' . $imageName;
                $newImagePath = 'product/' . $imageName;

                // Check if old image file exists
                if (! file_exists($oldImagePath)) {
                    $this->warn("Image file not found: {$oldImagePath}");
                    $skipped++;
                    continue;
                }

                if (! $dryRun) {
                    // Copy image to new location using the public disk
                    if (! Storage::disk('public')->exists($newImagePath)) {
                        Storage::disk('public')->put($newImagePath, file_get_contents($oldImagePath));
                    }

                    // Verify file exists in storage before adding to media library
                    if (! Storage::disk('public')->exists($newImagePath)) {
                        $this->error("Failed to copy image to storage: {$newImagePath}");
                        $errors++;
                        continue;
                    }

                    // Add to Spatie Media Library
                    if ($index === 0) {
                        // First image as thumbnail
                        $product->addMediaFromDisk($newImagePath, 'public')
                            ->toMediaCollection('thumbnail');
                    } else {
                        // Additional images as gallery
                        $product->addMediaFromDisk($newImagePath, 'public')
                            ->toMediaCollection('multi_images');
                    }

                    $this->info("Imported image: {$imageName} for product: {$product->name}");
                } else {
                    $this->info("Would import image: {$imageName} for product: {$product->name}");
                }

                $imported++;

            } catch (\Exception $e) {
                $this->error("Error importing image : " . $e->getMessage());
                $errors++;
            }
        }
    }

    private function loadBrandsAndCategoriesData()
    {
        $this->info('Loading brands and categories data for name lookup...');

        // Load brands JSON
        $brandsFile = 'public/json/brands.json';
        if (file_exists($brandsFile)) {
            $brandsContent = file_get_contents($brandsFile);
            $brandsJson    = json_decode($brandsContent, true);

            if ($brandsJson) {
                foreach ($brandsJson as $item) {
                    if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'brands') {
                        $this->brandsData = isset($item['data']) ? $item['data'] : [];
                        break;
                    }
                }
            }
        }

        // Load categories JSON
        $categoriesFile = 'public/json/categories.json';
        if (file_exists($categoriesFile)) {
            $categoriesContent = file_get_contents($categoriesFile);
            $categoriesJson    = json_decode($categoriesContent, true);

            if ($categoriesJson) {
                foreach ($categoriesJson as $item) {
                    if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'categories') {
                        $this->categoriesData = isset($item['data']) ? $item['data'] : [];
                        break;
                    }
                }
            }
        }

        $this->info('Loaded ' . count($this->brandsData) . ' brands and ' . count($this->categoriesData) . ' categories for name lookup');
    }

    private function getBrandNameFromJson($oldBrandId)
    {
        foreach ($this->brandsData as $brand) {
            if (isset($brand['id']) && $brand['id'] == $oldBrandId) {
                return isset($brand['title']) ? $brand['title'] : null;
            }
        }
        return null;
    }

    private function getCategoryNameFromJson($oldCategoryId)
    {
        foreach ($this->categoriesData as $category) {
            if (isset($category['id']) && $category['id'] == $oldCategoryId) {
                return isset($category['title']) ? $category['title'] : null;
            }
        }
        return null;
    }

    private function createProductSeo($product, $productData)
    {
        try {
            // Generate SEO data from product information
            $seoData = $this->generateSeoData($product, $productData);

            if ($seoData) {
                \App\Models\ProductSeo::create([
                    'product_id'       => $product->id,
                    'meta_title'       => $seoData['meta_title'],
                    'meta_description' => $seoData['meta_description'],
                    'meta_keywords'    => $seoData['meta_keywords'],
                    'meta_tags'        => $seoData['meta_tags'],
                ]);

                $this->info("Created SEO data for product: {$product->name}");
            }
        } catch (\Exception $e) {
            $this->error("Error creating SEO data for product {$product->name}: " . $e->getMessage());
        }
    }

    private function generateSeoData($product, $productData)
    {
        // Generate meta title (max 60 characters for SEO)
        $metaTitle = $product->name;
        if (strlen($metaTitle) > 60) {
            $metaTitle = substr($metaTitle, 0, 57) . '...';
        }

        // Generate meta description from product description or features
        $metaDescription = '';
        if (isset($productData['description']) && ! empty($productData['description'])) {
            // Clean HTML and get first 160 characters
            $description     = strip_tags($productData['description']);
            $metaDescription = strlen($description) > 160 ? substr($description, 0, 157) . '...' : $description;
        } elseif (isset($productData['feature']) && ! empty($productData['feature'])) {
            $feature         = strip_tags($productData['feature']);
            $metaDescription = strlen($feature) > 160 ? substr($feature, 0, 157) . '...' : $feature;
        } else {
            $metaDescription = "Buy {$product->name} online. High quality product with great features.";
        }

        // Generate meta keywords from product name, brand, and category
        $keywords = [];

        // Add product name words
        $productWords = explode(' ', strtolower($product->name));
        $keywords     = array_merge($keywords, array_filter($productWords, function ($word) {
            return strlen($word) > 2; // Only words longer than 2 characters
        }));

        // Add brand name if available
        if ($product->brand_id) {
            $brand = Brand::find($product->brand_id);
            if ($brand) {
                $keywords[] = strtolower($brand->name);
            }
        }

        // Add category name if available
        if ($product->category_id) {
            $category = Category::find($product->category_id);
            if ($category) {
                $keywords[] = strtolower($category->name);
            }
        }

        // Add some generic keywords based on product type
        $keywords[] = 'buy online';
        $keywords[] = 'best price';
        $keywords[] = 'quality product';

        // Remove duplicates and limit to 10 keywords
        $keywords = array_unique($keywords);
        $keywords = array_slice($keywords, 0, 10);

        // Generate meta tags (similar to keywords but formatted differently)
        $metaTags = implode(', ', $keywords);

        return [
            'meta_title'       => $metaTitle,
            'meta_description' => $metaDescription,
            'meta_keywords'    => implode(', ', $keywords),
            'meta_tags'        => $metaTags,
        ];
    }
}
