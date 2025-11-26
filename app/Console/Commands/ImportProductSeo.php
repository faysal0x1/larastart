<?php
namespace App\Console\Commands;

use App\Models\Product;
use App\Models\ProductSeo;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportProductSeo extends Command
{
    protected $signature = 'import:product-seo
                            {--products-file= : Path to products JSON file (optional, for better SEO data)}
                            {--dry-run : Run without actually importing data}';

    protected $description = 'Import/Regenerate SEO data for all products (drops existing SEO data first)';

    private $oldProductsData = [];

    public function handle()
    {
        $this->info('Starting Product SEO import...');

        $dryRun       = $this->option('dry-run');
        $productsFile = $this->option('products-file') ?: 'public/json/products.json';

        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be modified');
        }

        // Load old products data if available for better SEO generation
        $this->loadOldProductsData($productsFile);

        // Step 1: Drop all existing SEO data
        $this->dropExistingSeoData($dryRun);

        // Step 2: Import fresh SEO data for all products
        $this->importSeoData($dryRun);

        $this->info('Product SEO import completed successfully!');
    }

    private function loadOldProductsData($productsFile)
    {
        $this->info('Loading old products data for better SEO generation...');

        if (! file_exists($productsFile)) {
            $this->warn("Products file not found: {$productsFile}. Will generate SEO from current product data only.");
            return;
        }

        $productsContent = file_get_contents($productsFile);
        $productsJson    = json_decode($productsContent, true);

        if (! $productsJson) {
            $this->warn('Invalid products JSON file. Will generate SEO from current product data only.');
            return;
        }

        // Find products table data
        foreach ($productsJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'products') {
                $this->oldProductsData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        $this->info('Loaded ' . count($this->oldProductsData) . ' old products for SEO generation');
    }

    private function dropExistingSeoData($dryRun)
    {
        $this->info('Dropping existing Product SEO data...');

        if (! $dryRun) {
            $count = ProductSeo::count();
            DB::table('product_seos')->truncate();
            $this->info("Dropped {$count} existing SEO records");
        } else {
            $count = ProductSeo::count();
            $this->info("Would drop {$count} existing SEO records");
        }
    }

    private function importSeoData($dryRun)
    {
        $this->info('Importing fresh SEO data for all products...');

        $imported = 0;
        $errors   = 0;

        // Get all products
        $products      = Product::with(['brand', 'category'])->get();
        $totalProducts = $products->count();

        $this->info("Found {$totalProducts} products to process");

        foreach ($products as $index => $product) {
            try {
                if (($index + 1) % 100 == 0) {
                    $this->info("Processing product " . ($index + 1) . "/" . $totalProducts . ": {$product->name}");
                }

                // Try to find old product data by SKU
                $oldProductData = $this->findOldProductData($product->sku);

                // Generate SEO data
                $seoData = $this->generateSeoData($product, $oldProductData);

                if ($seoData) {
                    if (! $dryRun) {
                        ProductSeo::create([
                            'product_id'       => $product->id,
                            'meta_title'       => $seoData['meta_title'],
                            'meta_description' => $seoData['meta_description'],
                            'meta_keywords'    => $seoData['meta_keywords'],
                            'meta_tags'        => $seoData['meta_tags'],
                        ]);

                        if (($index + 1) % 100 == 0 || $index < 5) {
                            $this->info("Created SEO data for product: {$product->name}");
                        }
                    } else {
                        $this->info("Would create SEO data for product: {$product->name}");
                    }

                    $imported++;
                } else {
                    $this->warn("Failed to generate SEO data for product: {$product->name}");
                    $errors++;
                }

            } catch (\Exception $e) {
                $this->error("Error creating SEO data for product {$product->name}: " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("SEO import completed: {$imported} imported, {$errors} errors");
    }

    private function findOldProductData($sku)
    {
        if (empty($this->oldProductsData)) {
            return null;
        }

        foreach ($this->oldProductsData as $oldProduct) {
            if (isset($oldProduct['code']) && $oldProduct['code'] === $sku) {
                return $oldProduct;
            }
        }

        return null;
    }

    private function generateSeoData($product, $oldProductData = null)
    {
        // Generate meta title (max 60 characters for SEO)
        $metaTitle = $product->name;
        // Try from old product data first
        if ($oldProductData) {
            if (isset($oldProductData['meta_title']) && ! empty($oldProductData['meta_title'])) {
                // Keep HTML intact - use the description as-is
                $metaTitle = $oldProductData['meta_title'];
            }
        }

        $metaDescription = '';

        // Try from old product data first
        if ($oldProductData) {
            if (isset($oldProductData['meta_description']) && ! empty($oldProductData['meta_description'])) {
                // Keep HTML intact - use the description as-is
                $metaDescription = $oldProductData['meta_description'];
            } elseif (isset($oldProductData['feature']) && ! empty($oldProductData['feature'])) {
                // Keep HTML intact - use the feature as-is
                $metaDescription = $oldProductData['feature'];
            }
        }

        // Fallback to current product data
        if (empty($metaDescription)) {
            if (! empty($product->long_descp)) {
                // Keep HTML intact - use long description as-is
                $metaDescription = $product->long_descp;
            } elseif (! empty($product->short_descp)) {
                // Keep HTML intact - use short description as-is
                $metaDescription = $product->short_descp;
            } else {
                $metaDescription = "<p>Buy {$product->name} online. High quality product with great features.</p>";
            }
        }

        // Generate meta keywords from product name, brand, and category
        $keywords = [];

        if ($oldProductData) {
            if (isset($oldProductData['meta_keywords']) && ! empty($oldProductData['meta_keywords'])) {
                // Keep HTML intact - use the description as-is
                $keywords = $oldProductData['meta_keywords'];
            }
        }

        $tags = '';
        if ($oldProductData) {
            if (isset($oldProductData['tags']) && ! empty($oldProductData['tags'])) {
                $tags = $oldProductData['tags'];
            }
        }

        // Convert array to string for meta_keywords if needed
        $metaKeywordsString = is_array($keywords) ? implode(', ', array_filter($keywords)) : (string) $keywords;

        return [
            'meta_title'       => $metaTitle,
            'meta_description' => $metaDescription,
            'meta_keywords'    => $metaKeywordsString,
            'meta_tags'        => Str::limit($tags ?: '', 250),
        ];
    }
}