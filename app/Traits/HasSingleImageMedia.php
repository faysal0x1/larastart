<?php

declare (strict_types = 1);

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

trait HasSingleImageMedia
{
    /**
     * Default image processing options
     *
     * Available options:
     * - format: Output format (webp, jpg, png, gif, avif)
     * - quality: Image quality 1-100 (for lossy formats)
     * - max_width: Maximum width in pixels
     * - max_height: Maximum height in pixels
     * - aspect_ratio: Target aspect ratio (e.g., '16:9', '4:3', '1:1')
     * - crop: Whether to crop to exact aspect ratio (true/false)
     * - resize_mode: How to resize ('fit', 'fill', 'crop')
     *   - 'fit': Resize maintaining aspect ratio, no cropping
     *   - 'fill': Resize to exact dimensions, may distort
     *   - 'crop': Crop to exact dimensions, maintaining aspect ratio
     */
    protected array $imageProcessingOptions = [
        'format'       => 'webp',
        'quality'      => 80,
        'max_width'    => 1200,
        'max_height'   => null,
        'aspect_ratio' => null,  // e.g., '16:9', '4:3', '1:1'
        'crop'         => false, // whether to crop to exact aspect ratio
        'resize_mode'  => 'fit', // 'fit', 'fill', 'crop'
    ];

    /**
     * Boot the trait and wire up model events to handle image uploads.
     */
    public static function bootHasSingleImageMedia(): void
    {
        static::saved(function ($model) {
            $field = property_exists($model, 'imageField') ? $model->imageField : 'image';

            $value = $model->{$field} ?? null;
            if ($value instanceof UploadedFile) {
                // Get image processing options from model
                $options = $model->getImageProcessingOptions();

                // Convert image to specified format with options
                $convertedFile = static::convertImage($value, $options);

                // Generate filename as string
                $originalName = pathinfo($convertedFile->getClientOriginalName(), PATHINFO_FILENAME);
                $fileName     = $originalName . '.' . $options['format'];

                $media = $model->addMedia($convertedFile)
                    ->usingFileName($fileName)
                    ->usingName($fileName)
                    ->toMediaCollection($field);
                $model->forceFill([$field => ltrim($media->getUrl(), '/')])->saveQuietly();
            }
        });
    }

    /**
     * Helper to register the single-file media collection for the image field.
     * Call this inside your model's registerMediaCollections implementation.
     */
    public function registerSingleImageMediaCollection(): void
    {
        $field = property_exists($this, 'imageField') ? $this->imageField : 'image';
        $this->addMediaCollection($field)->singleFile();
    }

    /**
     * Accessor: Prefer media URL; fallback to stored column value.
     */
    public function getImageUrlAttribute(): ?string
    {
        $field    = property_exists($this, 'imageField') ? $this->imageField : 'image';
        $mediaUrl = $this->getFirstMediaUrl($field);
        if (! empty($mediaUrl)) {
            return $mediaUrl;
        }

        $value = $this->{$field} ?? null;
        if (empty($value)) {
            return null;
        }

        if (Str::startsWith($value, ['http://', 'https://'])) {
            return $value;
        }

        return $value[0] === '/' ? $value : '/' . $value;
    }

    /**
     * Get image processing options for this model
     * Override this method in your model to customize image processing
     */
    public function getImageProcessingOptions(): array
    {
        $defaultOptions = $this->imageProcessingOptions ?? [];

        // Allow model to override options via properties
        $modelOptions = [];
        if (property_exists($this, 'imageFormat')) {
            $modelOptions['format'] = $this->imageFormat;
        }
        if (property_exists($this, 'imageQuality')) {
            $modelOptions['quality'] = $this->imageQuality;
        }
        if (property_exists($this, 'imageMaxWidth')) {
            $modelOptions['max_width'] = $this->imageMaxWidth;
        }
        if (property_exists($this, 'imageMaxHeight')) {
            $modelOptions['max_height'] = $this->imageMaxHeight;
        }
        if (property_exists($this, 'imageAspectRatio')) {
            $modelOptions['aspect_ratio'] = $this->imageAspectRatio;
        }
        if (property_exists($this, 'imageCrop')) {
            $modelOptions['crop'] = $this->imageCrop;
        }
        if (property_exists($this, 'imageResizeMode')) {
            $modelOptions['resize_mode'] = $this->imageResizeMode;
        }

        return array_merge($defaultOptions, $modelOptions);
    }

    /**
     * Convert uploaded file with specified options
     */
    protected static function convertImage(UploadedFile $file, array $options): UploadedFile
    {
        $imageManager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
        $image        = $imageManager->read($file);

        // Apply aspect ratio if specified
        if (! empty($options['aspect_ratio'])) {
            $image = static::applyAspectRatio($image, $options['aspect_ratio'], $options);
        }

        // Apply resizing
        if (! empty($options['max_width']) || ! empty($options['max_height'])) {
            $image = static::applyResizing($image, $options);
        }

        // Convert to specified format
        $convertedData = static::convertToFormat($image, $options);

        // Create a temporary file with converted content
        $tempPath = tempnam(sys_get_temp_dir(), $options['format'] . '_');
        file_put_contents($tempPath, $convertedData);

        // Create a new UploadedFile instance
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '.' . $options['format'];
        $mimeType     = 'image/' . $options['format'];

        return new UploadedFile(
            $tempPath,
            $originalName,
            $mimeType,
            null,
            true// test mode
        );
    }

    /**
     * Apply aspect ratio to image
     */
    protected static function applyAspectRatio($image, string $aspectRatio, array $options)
    {
        $ratio        = explode(':', $aspectRatio);
        $targetRatio  = $ratio[0] / $ratio[1];
        $currentRatio = $image->width() / $image->height();

        if ($options['crop'] ?? false) {
            // Crop to exact aspect ratio
            if ($currentRatio > $targetRatio) {
                // Image is too wide, crop width
                $newWidth = (int) ($image->height() * $targetRatio);
                $image->crop($newWidth, $image->height(), ($image->width() - $newWidth) / 2, 0);
            } else {
                // Image is too tall, crop height
                $newHeight = (int) ($image->width() / $targetRatio);
                $image->crop($image->width(), $newHeight, 0, ($image->height() - $newHeight) / 2);
            }
        } else {
            // Fit to aspect ratio without cropping
            if ($currentRatio > $targetRatio) {
                // Image is too wide, reduce width
                $newWidth = (int) ($image->height() * $targetRatio);
                $image->resize($newWidth, $image->height());
            } else {
                // Image is too tall, reduce height
                $newHeight = (int) ($image->width() / $targetRatio);
                $image->resize($image->width(), $newHeight);
            }
        }

        return $image;
    }

    /**
     * Apply resizing to image
     */
    protected static function applyResizing($image, array $options)
    {
        $maxWidth   = $options['max_width'] ?? null;
        $maxHeight  = $options['max_height'] ?? null;
        $resizeMode = $options['resize_mode'] ?? 'fit';

        if (! $maxWidth && ! $maxHeight) {
            return $image;
        }

        switch ($resizeMode) {
            case 'fit':
                $image->resize($maxWidth, $maxHeight, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                break;
            case 'fill':
                $image->resize($maxWidth, $maxHeight);
                break;
            case 'crop':
                $image->cover($maxWidth, $maxHeight);
                break;
        }

        return $image;
    }

    /**
     * Convert image to specified format
     */
    protected static function convertToFormat($image, array $options)
    {
        $format  = strtolower($options['format']);
        $quality = $options['quality'] ?? 80;

        return match ($format) {
            'webp'  => $image->toWebp($quality),
            'jpg', 'jpeg' => $image->toJpeg($quality),
            'png'   => $image->toPng(),
            'gif'   => $image->toGif(),
            'avif'  => $image->toAvif($quality),
            default => $image->toWebp($quality),
        };
    }
}