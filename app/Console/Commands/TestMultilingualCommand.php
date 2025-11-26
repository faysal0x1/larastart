<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Language;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Console\Command;

class TestMultilingualCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:multilingual';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the multilingual functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Multilingual System...');

        // Check languages
        $languages = Language::active()->get();
        $this->info("Found {$languages->count()} active languages:");
        foreach ($languages as $language) {
            $this->line("  - {$language->code}: {$language->name} ({$language->native_name})");
        }

        // Create test data if no products exist
        if (Product::count() === 0) {
            $this->info('Creating test data...');

            // Create a test brand (or use existing)
            $brand = Brand::firstOrCreate(
                ['slug' => 'test-brand'],
                [
                    'name' => 'Test Brand',
                    'status' => 1,
                ]
            );

            // Create brand translations
            $brand->setTranslatedAttribute('name', 'টেস্ট ব্র্যান্ড', 'bn');
            $brand->setTranslatedAttribute('slug', 'test-brand-bn', 'bn');
            $brand->setTranslatedAttribute('name', 'ماركة تجريبية', 'ar');
            $brand->setTranslatedAttribute('slug', 'test-brand-ar', 'ar');
            $brand->setTranslatedAttribute('name', 'टेस्ट ब्रांड', 'hi');
            $brand->setTranslatedAttribute('slug', 'test-brand-hi', 'hi');

            // Create a test category (or use existing)
            $category = Category::firstOrCreate(
                ['slug' => 'test-category'],
                [
                    'name' => 'Test Category',
                    'priority' => 1,
                    'status' => 1,
                    'image' => 'test.jpg',
                ]
            );

            // Create category translations
            $category->setTranslatedAttribute('name', 'টেস্ট ক্যাটাগরি', 'bn');
            $category->setTranslatedAttribute('slug', 'test-category-bn', 'bn');
            $category->setTranslatedAttribute('name', 'فئة تجريبية', 'ar');
            $category->setTranslatedAttribute('slug', 'test-category-ar', 'ar');
            $category->setTranslatedAttribute('name', 'टेस्ट श्रेणी', 'hi');
            $category->setTranslatedAttribute('slug', 'test-category-hi', 'hi');

            // Create a test subcategory if none exist
            $subcategory = SubCategory::firstOrCreate(
                ['slug' => 'test-subcategory'],
                [
                    'name' => 'Test Subcategory',
                    'category_id' => $category->id,
                    'priority' => 1,
                    'status' => 1,
                ]
            );

            // Create subcategory translations
            $subcategory->setTranslatedAttribute('name', 'টেস্ট সাব-ক্যাটাগরি', 'bn');
            $subcategory->setTranslatedAttribute('slug', 'test-subcategory-bn', 'bn');
            $subcategory->setTranslatedAttribute('name', 'فئة فرعية تجريبية', 'ar');
            $subcategory->setTranslatedAttribute('slug', 'test-subcategory-ar', 'ar');
            $subcategory->setTranslatedAttribute('name', 'टेस्ट सब-कैटेगरी', 'hi');
            $subcategory->setTranslatedAttribute('slug', 'test-subcategory-hi', 'hi');

            // Create a test product (or use existing)
            $product = Product::firstOrCreate(
                ['sku' => 'TEST-001'],
                [
                    'brand_id' => $brand->id,
                    'category_id' => $category->id,
                    'subcategory_id' => $subcategory->id,
                    'name' => 'Test Product',
                    'slug' => 'test-product',
                    'qty' => '10',
                    'unit_price' => 100,
                    'long_descp' => 'This is a test product description.',
                    'product_thumbnail' => 'test.jpg',
                    'status' => 1,
                ]
            );

            // Create product translations
            $product->setTranslatedAttribute('name', 'টেস্ট প্রোডাক্ট', 'bn');
            $product->setTranslatedAttribute('slug', 'test-product-bn', 'bn');
            $product->setTranslatedAttribute('short_descp', 'এটি একটি টেস্ট প্রোডাক্ট।', 'bn');
            $product->setTranslatedAttribute('long_descp', 'এটি একটি টেস্ট প্রোডাক্টের বিবরণ।', 'bn');

            $product->setTranslatedAttribute('name', 'منتج تجريبي', 'ar');
            $product->setTranslatedAttribute('slug', 'test-product-ar', 'ar');
            $product->setTranslatedAttribute('short_descp', 'هذا منتج تجريبي.', 'ar');
            $product->setTranslatedAttribute('long_descp', 'هذا وصف لمنتج تجريبي.', 'ar');

            $product->setTranslatedAttribute('name', 'टेस्ट प्रोडक्ट', 'hi');
            $product->setTranslatedAttribute('slug', 'test-product-hi', 'hi');
            $product->setTranslatedAttribute('short_descp', 'यह एक टेस्ट प्रोडक्ट है।', 'hi');
            $product->setTranslatedAttribute('long_descp', 'यह एक टेस्ट प्रोडक्ट का विवरण है।', 'hi');

            $this->info('Test data created successfully!');
        }

        // Test translations
        $this->info('Testing translations...');

        $product = Product::with(['brand', 'category', 'subcategory'])->first();
        if ($product) {
            $this->line("Product: {$product->name}");
            $this->line("Brand: {$product->brand->name}");
            $this->line("Category: {$product->category->name}");
            $this->line("Subcategory: {$product->subcategory->name}");

            // Test Bengali translations
            $this->line("\nBengali translations:");
            $this->line('  Product: '.($product->getTranslatedName('bn') ?: 'Not found'));
            $this->line('  Brand: '.($product->brand->getTranslatedName('bn') ?: 'Not found'));
            $this->line('  Category: '.($product->category->getTranslatedName('bn') ?: 'Not found'));
            $this->line('  Subcategory: '.($product->subcategory->getTranslatedName('bn') ?: 'Not found'));

            // Test Arabic translations
            $this->line("\nArabic translations:");
            $this->line('  Product: '.($product->getTranslatedName('ar') ?: 'Not found'));
            $this->line('  Brand: '.($product->brand->getTranslatedName('ar') ?: 'Not found'));
            $this->line('  Category: '.($product->category->getTranslatedName('ar') ?: 'Not found'));
            $this->line('  Subcategory: '.($product->subcategory->getTranslatedName('ar') ?: 'Not found'));

            // Test Hindi translations
            $this->line("\nHindi translations:");
            $this->line('  Product: '.($product->getTranslatedName('hi') ?: 'Not found'));
            $this->line('  Brand: '.($product->brand->getTranslatedName('hi') ?: 'Not found'));
            $this->line('  Category: '.($product->category->getTranslatedName('hi') ?: 'Not found'));
            $this->line('  Subcategory: '.($product->subcategory->getTranslatedName('hi') ?: 'Not found'));
        }

        $this->info('Multilingual test completed!');
    }
}
