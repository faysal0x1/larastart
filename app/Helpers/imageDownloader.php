<?php


if (!function_exists('download_image')) {
    /**
     * Helper function to download and store images
     */
    function download_image(
        string $storagePath,
        string $source = 'unsplash',
        int    $width = 800,
        int    $height = 600,
        string $category = 'business,technology'
    ): string
    {
        return app('image-downloader')->downloadAndStore($storagePath, $source, $width, $height, $category);
    }
}

if (!function_exists('quick_download_image')) {
    /**
     * Quick download with auto-generated filename
     */
    function quick_download_image(string $directory, string $category = 'business'): string
    {
        return app('image-downloader')->quickDownload($directory, 'unsplash', $category);
    }
}
