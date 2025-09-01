<?php

// ===================================
// 1. Service Class: app/Services/ImageDownloadService.php
// ===================================

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageDownloadService
{
    protected array $imageSources = [
        'unsplash'    => 'https://source.unsplash.com/{width}x{height}/?{category}',
        'picsum'      => 'https://picsum.photos/{width}/{height}',
        'loremflickr' => 'https://loremflickr.com/{width}/{height}/{category}',
        'placeholder' => 'https://via.placeholder.com/{width}x{height}/CCCCCC/666666?text={text}',
        'dummyimage'  => 'https://dummyimage.com/{width}x{height}/CCCCCC/666666&text={text}',
    ];

    protected int $timeout = 30;
    protected string $disk = 'public';
    protected int $quality = 80;

    /**
     * Download and store image
     */
    public function downloadAndStore(
        string $storagePath,
        string $source = 'unsplash',
        int $width = 800,
        int $height = 600,
        string $category = 'business,technology',
        bool $convertToWebP = true,
        ?string $customUrl = null
    ): string {
        try {
            // Ensure directory exists
            $directory = dirname($storagePath);
            Storage::disk($this->disk)->makeDirectory($directory);

            // Get image URL
            $imageUrl = $customUrl ?: $this->buildImageUrl($source, $width, $height, $category);

            // Download the image
            $response = Http::timeout($this->timeout)->get($imageUrl);

            if (! $response->successful()) {
                // Try fallback sources if primary source fails
                $fallbackSources = ['picsum', 'dummyimage', 'placeholder'];
                $imageContent    = null;

                foreach ($fallbackSources as $fallbackSource) {
                    if ($fallbackSource === $source) {
                        continue;
                    }
                    // Skip if it's the same source

                    try {
                        $fallbackUrl      = $this->buildImageUrl($fallbackSource, $width, $height, $category);
                        $fallbackResponse = Http::timeout($this->timeout)->get($fallbackUrl);

                        if ($fallbackResponse->successful()) {
                            $imageContent = $fallbackResponse->body();
                            Log::info("Used fallback source: {$fallbackSource} for {$storagePath}");
                            break;
                        }
                    } catch (Exception $fallbackException) {
                        Log::warning("Fallback source {$fallbackSource} failed: {$fallbackException->getMessage()}");
                        continue;
                    }
                }

                if ($imageContent === null) {
                    throw new Exception("Failed to download image from all sources");
                }
            } else {
                $imageContent = $response->body();
            }

            // Convert to WebP if requested and supported
            if ($convertToWebP && $this->supportsWebP()) {
                $imageContent = $this->convertToWebP($imageContent);
                $storagePath  = $this->ensureWebPExtension($storagePath);
            }

            // Store the image
            Storage::disk($this->disk)->put($storagePath, $imageContent);

            return $storagePath;

        } catch (Exception $e) {
            Log::error("Image download failed: {$e->getMessage()}");
            return $this->createFallbackImage($storagePath, $width, $height);
        }
    }

    /**
     * Download multiple images
     */
    public function downloadMultiple(array $paths, array $options = []): array
    {
        $results = [];
        foreach ($paths as $index => $path) {
            $pathOptions = is_array($options) && isset($options[$index]) ? $options[$index] : $options;
            $results[]   = $this->downloadAndStore($path, ...$this->parseOptions($pathOptions));
        }
        return $results;
    }

    /**
     * Quick download with auto-generated filename
     */
    public function quickDownload(
        string $directory,
        string $source = 'unsplash',
        string $category = 'business'
    ): string {
        $filename    = Str::uuid() . '.webp';
        $storagePath = "{$directory}/{$filename}";
        return $this->downloadAndStore($storagePath, $source, category: $category);
    }

    /**
     * Build image URL from source template
     */
    protected function buildImageUrl(string $source, int $width, int $height, string $category): string
    {
        if (! isset($this->imageSources[$source])) {
            throw new Exception("Unknown image source: {$source}");
        }

        $template = $this->imageSources[$source];

        return str_replace(
            ['{width}', '{height}', '{category}', '{text}'],
            [$width, $height, urlencode($category), urlencode('Image')],
            $template
        );
    }

    /**
     * Convert image to WebP format
     */
    protected function convertToWebP(string $imageData): string
    {
        try {
            $image = imagecreatefromstring($imageData);

            if ($image === false) {
                return $imageData;
            }

            // Convert palette image to true color for WebP support
            if (imageistruecolor($image) === false) {
                $trueColorImage = imagecreatetruecolor(imagesx($image), imagesy($image));
                imagecopy($trueColorImage, $image, 0, 0, 0, 0, imagesx($image), imagesy($image));
                imagedestroy($image);
                $image = $trueColorImage;
            }

            ob_start();
            imagewebp($image, null, $this->quality);
            $webpData = ob_get_contents();
            ob_end_clean();
            imagedestroy($image);

            return $webpData ?: $imageData;
        } catch (Exception $e) {
            Log::warning("WebP conversion failed: {$e->getMessage()}");
            return $imageData;
        }
    }

    /**
     * Create fallback placeholder image
     */
    protected function createFallbackImage(string $storagePath, int $width = 800, int $height = 600): string
    {
        try {
            $image           = imagecreatetruecolor($width, $height);
            $backgroundColor = imagecolorallocate($image, 240, 240, 240);
            $textColor       = imagecolorallocate($image, 100, 100, 100);

            // Fill background
            imagefill($image, 0, 0, $backgroundColor);

            $text       = "Placeholder";
            $font       = 5;
            $textWidth  = imagefontwidth($font) * strlen($text);
            $textHeight = imagefontheight($font);
            $x          = ($width - $textWidth) / 2;
            $y          = ($height - $textHeight) / 2;

            imagestring($image, $font, $x, $y, $text, $textColor);

            ob_start();
            imagewebp($image, null, $this->quality);
            $imageData = ob_get_contents();
            ob_end_clean();
            imagedestroy($image);

            $storagePath = $this->ensureWebPExtension($storagePath);
            Storage::disk($this->disk)->put($storagePath, $imageData);

            return $storagePath;
        } catch (Exception $e) {
            Log::error("Fallback image creation failed: {$e->getMessage()}");
            return $storagePath;
        }
    }

    /**
     * Check if WebP is supported
     */
    protected function supportsWebP(): bool
    {
        return extension_loaded('gd') && function_exists('imagewebp');
    }

    /**
     * Ensure file has WebP extension
     */
    protected function ensureWebPExtension(string $path): string
    {
        $pathInfo = pathinfo($path);
        if (strtolower($pathInfo['extension'] ?? '') !== 'webp') {
            return $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '.webp';
        }
        return $path;
    }

    /**
     * Parse options array for method parameters
     */
    protected function parseOptions(array $options): array
    {
        return [
            $options['source'] ?? 'unsplash',
            $options['width'] ?? 800,
            $options['height'] ?? 600,
            $options['category'] ?? 'business,technology',
            $options['convertToWebP'] ?? true,
            $options['customUrl'] ?? null,
        ];
    }

    /**
     * Configuration methods
     */
    public function setTimeout(int $timeout): self
    {
        $this->timeout = $timeout;
        return $this;
    }

    public function setDisk(string $disk): self
    {
        $this->disk = $disk;
        return $this;
    }

    public function setQuality(int $quality): self
    {
        $this->quality = max(1, min(100, $quality));
        return $this;
    }
}

//class MicroTaskSeederUpdated extends Seeder
//{
//    public function run(): void
//    {
//        // Method 1: Using Facade
//        $imagePath = ImageDownloader::downloadAndStore(
//            'microtask/thumbnails/1/thumbnail.webp',
//            'unsplash',
//            800,
//            600,
//            'business,office'
//        );
//
//        // Method 2: Using Helper Function
//        // $imagePath = download_image('microtask/thumbnails/1/thumbnail.webp', 'unsplash', 800, 600, 'business,office');
//
//        // Method 3: Quick download with auto-generated name
//        // $imagePath = ImageDownloader::quickDownload('microtask/thumbnails/1', 'business');
//
//        DB::table('micro_tasks')->insert([
//            [
//                'id'                      => 1,
//                'title'                   => 'Post by Employee Mim for USA only YouTube Cat',
//                'slug'                    => 'post-by-employee-mim-for-usa-only-youtube-cat',
//                'employer_id'             => 10,
//                'category_id'             => 2,
//                'country_id'              => 2,
//                'task_type'               => 'other',
//                'description'             => 'Sample task description...',
//                'external_link'           => 'https://www.example.com',
//                'budget'                  => 62,
//                'deadline'                => '2025-07-01',
//                'completion_instructions' => 'Sample instructions...',
//                'points_per_completion'   => 152,
//                'max_completions'         => 34,
//                'status'                  => 'pending',
//                'expires_at'              => '2025-06-30 18:00:00',
//                'thumbnail'               => $imagePath, // Using downloaded image path
//                'requires_admin_approval' => 1,
//                'created_at'              => now(),
//                'updated_at'              => now(),
//                'deleted_at'              => null,
//            ],
//        ]);
//    }
//}
