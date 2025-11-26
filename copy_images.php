<?php

/**
 * Helper script to copy old product images to new structure
 * Run this before running the import command
 */

$oldImagesPath = 'public/product';
$newImagesPath = 'storage/app/public/product';

// Create directory if it doesn't exist
if (! is_dir($newImagesPath)) {
    mkdir($newImagesPath, 0755, true);
    echo "Created directory: {$newImagesPath}\n";
}

// Get all image files from old directory
$imageFiles = glob($oldImagesPath . '/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', GLOB_BRACE);

echo "Found " . count($imageFiles) . " image files\n";

$copied  = 0;
$skipped = 0;

foreach ($imageFiles as $imageFile) {
    $fileName    = basename($imageFile);
    $newFilePath = $newImagesPath . '/' . $fileName;

    if (file_exists($newFilePath)) {
        echo "Skipping {$fileName} (already exists)\n";
        $skipped++;
        continue;
    }

    if (copy($imageFile, $newFilePath)) {
        echo "Copied {$fileName}\n";
        $copied++;
    } else {
        echo "Failed to copy {$fileName}\n";
    }
}

echo "\nCopy completed: {$copied} copied, {$skipped} skipped\n";
