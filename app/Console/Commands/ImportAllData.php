<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportAllData extends Command
{
    protected $signature = 'import:all-data
                            {--products-file= : Path to products JSON file}
                            {--product-images-file= : Path to product images JSON file}
                            {--brands-file= : Path to brands JSON file}
                            {--categories-file= : Path to categories JSON file}
                            {--product-images-path= : Path to product images directory}
                            {--brand-images-path= : Path to brand images directory}
                            {--category-images-path= : Path to category images directory}
                            {--dry-run : Run without actually importing data}
                            {--limit= : Limit number of items to import per type}';

    protected $description = 'Import all data (brands, categories, products, and images) from old database JSON files';

    public function handle() {
        $dryRun = $this->option('dry-run');
        $limit = $this->option('limit');

        $this->info('🚀 Starting complete data import process...');
        $this->newLine();

        // Step 1: Import Brands
        $this->info('📦 Step 1: Importing Brands...');
        $this->call('import:brands', [
            '--brands-file' => $this->option('brands-file') ?: 'public/json/brands.json',
            '--images-path' => $this->option('brand-images-path') ?: 'public/brand',
            '--dry-run' => $dryRun,
            '--limit' => $limit,
        ]);
        $this->newLine();

        // Step 2: Import Categories
        $this->info('📁 Step 2: Importing Categories...');
        $this->call('import:categories', [
            '--categories-file' => $this->option('categories-file') ?: 'public/json/categories.json',
            '--images-path' => $this->option('category-images-path') ?: 'public/category',
            '--dry-run' => $dryRun,
            '--limit' => $limit,
        ]);
        $this->newLine();

        // Step 3: Import Products
        $this->info('🛍️ Step 3: Importing Products...');
        $this->call('import:old-database', [
            '--products-file' => $this->option('products-file') ?: 'public/json/products.json',
            '--images-file' => $this->option('product-images-file') ?: 'public/json/product_images.json',
            '--images-path' => $this->option('product-images-path') ?: 'public/product',
            '--dry-run' => $dryRun,
            '--limit' => $limit,
        ]);
        $this->newLine();


        // Step 4 : Imprort Product Price
        $this->info(" Step 4 : Importing Product Price ... ");

        $this->call('app:import-product-price');

        $this->newLine();

        $this->info('✅ Complete data import process finished!');

        if ($dryRun) {
            $this->warn('⚠️ This was a DRY RUN - no data was actually imported');
        } else {
            $this->info('🎉 All data has been successfully imported!');
        }

        return 0;
    }
}
