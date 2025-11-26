<?php
namespace App\Console\Commands;

use App\Models\Brand;
use Illuminate\Console\Command;

class ImportBrands extends Command
{
    protected $signature = 'import:brands
                            {--brands-file= : Path to brands JSON file}
                            {--images-path= : Path to brand images directory}
                            {--dry-run : Run without actually importing data}
                            {--limit= : Limit number of brands to import}';

    protected $description = 'Import brands and their images from old database JSON file';

    private $brandsData = [];

    public function handle()
    {
        $brandsFile = $this->option('brands-file') ?: 'public/json/brands.json';
        $imagesPath = $this->option('images-path') ?: 'public/brand';
        $dryRun     = $this->option('dry-run');
        $limit      = $this->option('limit');

        $this->info('Starting brand import process...');

        // Load and parse JSON data
        if (! $this->loadBrandsData($brandsFile)) {
            return 1;
        }

        // Import brands
        $this->importBrands($limit, $dryRun);

        // Import images
        $this->importImages($imagesPath, $dryRun);

        $this->info('Brand import completed successfully!');
        return 0;
    }

    private function loadBrandsData($filePath)
    {
        if (! file_exists($filePath)) {
            $this->error("Brands file not found: {$filePath}");
            return false;
        }

        $jsonContent = file_get_contents($filePath);
        $brandsJson  = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON format in brands file');
            return false;
        }

        // Find brands table data
        foreach ($brandsJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'brands') {
                $this->brandsData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        if (empty($this->brandsData)) {
            $this->error('No brands data found in JSON file');
            return false;
        }

        $this->info('Found ' . count($this->brandsData) . ' brands to import');
        return true;
    }

    private function importBrands($limit, $dryRun)
    {
        $this->info('Starting brand import...');

        $imported = 0;
        $skipped  = 0;
        $errors   = 0;

        $brandsToImport = $limit ? array_slice($this->brandsData, 0, $limit) : $this->brandsData;

        foreach ($brandsToImport as $brandData) {
            try {
                // Check if brand already exists
                $existingBrand = Brand::where('slug', $brandData['slug'] ?? '')->first();
                if ($existingBrand) {
                    $slug = isset($brandData['slug']) ? $brandData['slug'] : 'Unknown';
                    $this->warn("Brand with slug '{$slug}' already exists, skipping...");
                    $skipped++;
                    continue;
                }

                // Map brand data
                $mappedData = $this->mapBrandData($brandData);
                if (! $mappedData) {
                    $title = isset($brandData['title']) ? $brandData['title'] : 'Unknown';
                    $this->warn("Skipping brand due to missing required data: {$title}");
                    $skipped++;
                    continue;
                }

                if ($dryRun) {
                    $this->info("DRY RUN: Would import brand: {$mappedData['name']}");
                    $imported++;
                } else {
                    // Create brand
                    $brand = Brand::create($mappedData);
                    $this->info("Imported brand: {$brand->name}");
                    $imported++;
                }

            } catch (\Exception $e) {
                $title = isset($brandData['title']) ? $brandData['title'] : 'Unknown';
                $this->error("Error importing brand '{$title}': " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("Brand import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }

    private function mapBrandData($oldData)
    {
        // Validate required fields
        if (empty($oldData['title']) || empty($oldData['slug'])) {
            return null;
        }

        return [
            'name'   => $oldData['title'],
            'slug'   => $oldData['slug'],
            'image'  => isset($oldData['image']) ? $oldData['image'] : null,
            'status' => (int) (isset($oldData['is_active']) ? $oldData['is_active'] : 1) === 1,
        ];
    }

    private function importImages($imagesPath, $dryRun)
    {
        $this->info('Starting brand image import...');

        if ($dryRun) {
            $this->info('DRY RUN: Skipping image import as brands are not actually created');
            return;
        }

        $imported      = 0;
        $skipped       = 0;
        $errors        = 0;
        $missingImages = [];

        foreach ($this->brandsData as $brandData) {
            try {
                $brand = Brand::where('slug', $brandData['slug'] ?? '')->first();
                if (! $brand) {
                    continue;
                }

                $imageName = isset($brandData['image']) ? $brandData['image'] : '';
                if (empty($imageName)) {
                    continue;
                }

                $oldImagePath = $imagesPath . '/' . $imageName;
                if (! file_exists($oldImagePath)) {
                    $missingImages[] = [
                        'brand' => $brand->name,
                        'image' => $imageName,
                        'path'  => $oldImagePath,
                    ];
                    $skipped++;
                    continue;
                }

                // Check if brand already has an image
                if ($brand->hasMedia('default')) {
                    $this->info("Brand '{$brand->name}' already has an image, skipping...");
                    $skipped++;
                    continue;
                }

                // Add image to Spatie Media Library
                $brand->addMedia($oldImagePath)
                    ->toMediaCollection('default');

                $this->info("Added image for brand: {$brand->name}");
                $imported++;

            } catch (\Exception $e) {
                $title = isset($brandData['title']) ? $brandData['title'] : 'Unknown';
                $this->error("Error importing image for brand '{$title}': " . $e->getMessage());
                $errors++;
            }
        }

        // Report missing images summary
        if (! empty($missingImages)) {
            $this->warn("\n" . str_repeat('=', 60));
            $this->warn("MISSING BRAND IMAGES SUMMARY");
            $this->warn(str_repeat('=', 60));
            $this->warn("Total missing images: " . count($missingImages));
            $this->warn("\nMissing images by brand:");

            foreach ($missingImages as $missing) {
                $this->warn("- {$missing['brand']}: {$missing['image']}");
            }

            $this->warn("\nNote: These images were not found in the expected location.");
            $this->warn("You may need to:");
            $this->warn("1. Check if images are in a different directory");
            $this->warn("2. Update the image paths in the JSON data");
            $this->warn("3. Re-upload the missing images");
            $this->warn("4. Create placeholder images for missing brands");
            $this->warn(str_repeat('=', 60) . "\n");
        }

        $this->info("Brand image import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }
}