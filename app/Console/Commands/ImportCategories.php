<?php
namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;

class ImportCategories extends Command
{
    protected $signature = 'import:categories
                            {--categories-file= : Path to categories JSON file}
                            {--images-path= : Path to category images directory}
                            {--dry-run : Run without actually importing data}
                            {--limit= : Limit number of categories to import}';

    protected $description = 'Import categories and their images from old database JSON file';

    private $categoriesData = [];

    public function handle()
    {
        $categoriesFile = $this->option('categories-file') ?: 'public/json/categories.json';
        $imagesPath     = $this->option('images-path') ?: 'public/category';
        $dryRun         = $this->option('dry-run');
        $limit          = $this->option('limit');

        $this->info('Starting category import process...');

        // Load and parse JSON data
        if (! $this->loadCategoriesData($categoriesFile)) {
            return 1;
        }

        // Import categories
        $this->importCategories($limit, $dryRun);

        // Import images
        $this->importImages($imagesPath, $dryRun);

        $this->info('Category import completed successfully!');
        return 0;
    }

    private function loadCategoriesData($filePath)
    {
        if (! file_exists($filePath)) {
            $this->error("Categories file not found: {$filePath}");
            return false;
        }

        $jsonContent    = file_get_contents($filePath);
        $categoriesJson = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON format in categories file');
            return false;
        }

        // Find categories table data
        foreach ($categoriesJson as $item) {
            if (isset($item['type']) && $item['type'] === 'table' && $item['name'] === 'categories') {
                $this->categoriesData = isset($item['data']) ? $item['data'] : [];
                break;
            }
        }

        if (empty($this->categoriesData)) {
            $this->error('No categories data found in JSON file');
            return false;
        }

        $this->info('Found ' . count($this->categoriesData) . ' categories to import');
        return true;
    }

    private function importCategories($limit, $dryRun)
    {
        $this->info('Starting category import...');

        $imported = 0;
        $skipped  = 0;
        $errors   = 0;

        // First, import all categories without parent relationships
        $categoriesToImport = $limit ? array_slice($this->categoriesData, 0, $limit) : $this->categoriesData;

        // Create a mapping of old ID to new ID for parent relationships
        $idMapping = [];

        // Sort categories by parent_id to ensure parents are created first
        usort($categoriesToImport, function ($a, $b) {
            $aParentId = isset($a['parent_id']) ? (int) $a['parent_id'] : 0;
            $bParentId = isset($b['parent_id']) ? (int) $b['parent_id'] : 0;
            return $aParentId - $bParentId;
        });

        foreach ($categoriesToImport as $categoryData) {
            try {
                // Check if category already exists
                $existingCategory = Category::where('slug', $categoryData['slug'] ?? '')->first();
                if ($existingCategory) {
                    $slug = isset($categoryData['slug']) ? $categoryData['slug'] : 'Unknown';
                    $this->warn("Category with slug '{$slug}' already exists, skipping...");
                    $skipped++;
                    continue;
                }

                // Map category data
                $mappedData = $this->mapCategoryData($categoryData, $idMapping);
                if (! $mappedData) {
                    $title = isset($categoryData['title']) ? $categoryData['title'] : 'Unknown';
                    $this->warn("Skipping category due to missing required data: {$title}");
                    $skipped++;
                    continue;
                }

                if ($dryRun) {
                    $this->info("DRY RUN: Would import category: {$mappedData['name']}");
                    $imported++;
                } else {
                    // Create category
                    $category = Category::create($mappedData);

                    // Store the mapping of old ID to new ID
                    if (isset($categoryData['id'])) {
                        $idMapping[$categoryData['id']] = $category->id;
                    }

                    $this->info("Imported category: {$category->name}");
                    $imported++;
                }

            } catch (\Exception $e) {
                $title = isset($categoryData['title']) ? $categoryData['title'] : 'Unknown';
                $this->error("Error importing category '{$title}': " . $e->getMessage());
                $errors++;
            }
        }

        $this->info("Category import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }

    private function mapCategoryData($oldData, $idMapping = [])
    {
        // Validate required fields
        if (empty($oldData['title']) || empty($oldData['slug'])) {
            return null;
        }

        // Determine parent_id and level
        $parentId = null;
        $level    = 0;

        if (isset($oldData['parent_id']) && $oldData['parent_id'] !== '0' && $oldData['parent_id'] !== 0) {
            // Find the new parent ID from our mapping
            $oldParentId = $oldData['parent_id'];
            if (isset($idMapping[$oldParentId])) {
                $parentId = $idMapping[$oldParentId];
                // Calculate level based on parent's level
                $parentCategory = Category::find($parentId);
                $level          = $parentCategory ? $parentCategory->level + 1 : 1;
            }
        }

        // Build path for easy querying
        $path = null;
        if ($parentId) {
            $parentCategory = Category::find($parentId);
            $path           = $parentCategory ? $parentCategory->path . '/' . $parentId : (string) $parentId;
        }

        return [
            'name'             => $oldData['title'],
            'slug'             => $oldData['slug'],
            'priority'         => (int) (isset($oldData['position']) ? $oldData['position'] : 0),
            'description'      => isset($oldData['description']) ? $oldData['description'] : null,
            'image'            => isset($oldData['image']) ? $oldData['image'] : null,
            'banner'           => isset($oldData['banner']) ? $oldData['banner'] : null,
            'meta_title'       => isset($oldData['meta_title']) ? $oldData['meta_title'] : null,
            'meta_image'       => isset($oldData['meta_image']) ? $oldData['meta_image'] : null,
            'meta_description' => isset($oldData['meta_description']) ? $oldData['meta_description'] : null,
            'parent_id'        => $parentId,
            'level'            => $level,
            'path'             => $path,
            'status'           => (int) (isset($oldData['is_active']) ? $oldData['is_active'] : 1) === 1,
        ];
    }

    private function importImages($imagesPath, $dryRun)
    {
        $this->info('Starting category image import...');

        if ($dryRun) {
            $this->info('DRY RUN: Skipping image import as categories are not actually created');
            return;
        }

        $imported      = 0;
        $skipped       = 0;
        $errors        = 0;
        $missingImages = [];

        foreach ($this->categoriesData as $categoryData) {
            try {
                $category = Category::where('slug', $categoryData['slug'] ?? '')->first();
                if (! $category) {
                    continue;
                }

                $imageName = isset($categoryData['image']) ? $categoryData['image'] : '';
                if (empty($imageName)) {
                    continue;
                }

                $oldImagePath = $imagesPath . '/' . $imageName;
                if (! file_exists($oldImagePath)) {
                    $missingImages[] = [
                        'category' => $category->name,
                        'image'    => $imageName,
                        'path'     => $oldImagePath,
                    ];
                    $skipped++;
                    continue;
                }

                // Check if category already has an image
                if ($category->hasMedia('default')) {
                    $this->info("Category '{$category->name}' already has an image, skipping...");
                    $skipped++;
                    continue;
                }

                // Add image to Spatie Media Library
                $category->addMedia($oldImagePath)
                    ->toMediaCollection('default');

                $this->info("Added image for category: {$category->name}");
                $imported++;

            } catch (\Exception $e) {
                $title = isset($categoryData['title']) ? $categoryData['title'] : 'Unknown';
                $this->error("Error importing image for category '{$title}': " . $e->getMessage());
                $errors++;
            }
        }

        // Report missing images summary
        if (! empty($missingImages)) {
            $this->warn("\n" . str_repeat('=', 60));
            $this->warn("MISSING CATEGORY IMAGES SUMMARY");
            $this->warn(str_repeat('=', 60));
            $this->warn("Total missing images: " . count($missingImages));
            $this->warn("\nMissing images by category:");

            foreach ($missingImages as $missing) {
                $this->warn("- {$missing['category']}: {$missing['image']}");
            }

            $this->warn("\nNote: These images were not found in the expected location.");
            $this->warn("You may need to:");
            $this->warn("1. Check if images are in a different directory");
            $this->warn("2. Update the image paths in the JSON data");
            $this->warn("3. Re-upload the missing images");
            $this->warn(str_repeat('=', 60) . "\n");
        }

        $this->info("Category image import completed: {$imported} imported, {$skipped} skipped, {$errors} errors");
    }
}
