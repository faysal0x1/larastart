<?php
namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;

class ImportProductSpecs extends Command
{
    protected $signature = 'import:product-specs
                            {--products-file= : Path to products JSON file}
                            {--dry-run : Run without actually importing data}';

    protected $description = 'Import/Update specification data and call_for_price for products from JSON file';

    private $oldProductsData = [];

    public function handle()
    {
        $this->info('Starting Product Specifications import...');

        $dryRun       = $this->option('dry-run');
        $productsFile = $this->option('products-file') ?: 'public/json/products.json';

        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be modified');
        }

        // Load old products data from JSON file
        if (! $this->loadOldProductsData($productsFile)) {
            return;
        }

        // Import specification data and call_for_price for products
        $this->importSpecsData($dryRun);

        $this->info('Product Specifications import completed successfully!');
    }

    private function loadOldProductsData($productsFile)
    {
        $this->info('Loading products data from JSON file...');

        if (! file_exists($productsFile)) {
            $this->error("Products file not found: {$productsFile}");
            return false;
        }

        $productsContent = file_get_contents($productsFile);
        $productsJson    = json_decode($productsContent, true);

        if (! $productsJson) {
            $this->error('Invalid products JSON file.');
            return false;
        }

        // Find products table data
        foreach ($productsJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'products') {
                $this->oldProductsData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        $this->info('Loaded ' . count($this->oldProductsData) . ' products from JSON file');

        return true;
    }

    private function importSpecsData($dryRun)
    {
        $this->info('Importing specification data and call_for_price for products...');

        $updated = 0;
        $errors  = 0;
        $skipped = 0;

        $totalProducts = count($this->oldProductsData);
        $this->info("Processing {$totalProducts} products from JSON");

        foreach ($this->oldProductsData as $index => $oldProduct) {
            try {
                if (($index + 1) % 100 == 0) {
                    $this->info("Processing product " . ($index + 1) . "/" . $totalProducts);
                }

                // Get SKU from old product data
                $sku = isset($oldProduct['code']) ? $oldProduct['code'] : null;

                if (empty($sku)) {
                    $skipped++;
                    continue;
                }

                // Find matching product in database by SKU
                $product = Product::where('sku', $sku)->first();

                if (! $product) {
                    $skipped++;
                    continue;
                }

                // Extract data to update
                $specsData    = $this->getSpecificationData($oldProduct);
                $callForPrice = $this->getCallForPrice($oldProduct);

                // Prepare update array
                $updateData = [];

                if ($specsData !== null) {
                    $updateData['product_specs_data'] = $specsData;
                }

                if ($callForPrice !== null) {
                    $updateData['call_for_price'] = $callForPrice;
                }

                // Skip if nothing to update
                if (empty($updateData)) {
                    $skipped++;
                    continue;
                }

                if (! $dryRun) {
                    // Update the product
                    Product::where('id', $product->id)->update($updateData);

                    if (($index + 1) % 100 == 0 || $index < 5) {
                        $this->info("Updated product: {$product->name} (SKU: {$sku})");
                    }
                } else {
                    $this->info("Would update product: {$product->name} (SKU: {$sku})");
                }

                $updated++;

            } catch (\Exception $e) {
                $productName = isset($oldProduct['title']) ? $oldProduct['title'] : 'Unknown';
                $this->error("Error updating product {$productName}: " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("Specifications import completed: {$updated} updated, {$skipped} skipped, {$errors} errors");
    }

    private function getSpecificationData($oldProduct)
    {
        // Get specification from old product data
        $specification = null;

        if (isset($oldProduct['specification']) && ! empty($oldProduct['specification'])) {
            $specification = $oldProduct['specification'];
        }

        return $specification;
    }

    private function getCallForPrice($oldProduct)
    {
        // Get call_for_price from old product data
        $callForPrice = null;

        if (isset($oldProduct['call_for_price'])) {
            // Convert to boolean
            // Accept: "0", "1", 0, 1, true, false
            $value = $oldProduct['call_for_price'];

            if ($value === "1" || $value === 1 || $value === true || $value === "true") {
                $callForPrice = true;
            } elseif ($value === "0" || $value === 0 || $value === false || $value === "false") {
                $callForPrice = false;
            }
        }

        return $callForPrice;
    }
}