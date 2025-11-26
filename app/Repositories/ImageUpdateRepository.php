<?php
namespace App\Repositories;

use App\Traits\HasSingleImageMedia;
use App\Traits\ImageHandlerTrait;
use Illuminate\Http\UploadedFile;
use RuntimeException;
use Spatie\MediaLibrary\HasMedia;

class ImageUpdateRepository
{
    protected string $modelClass;

    use ImageHandlerTrait;

    public function __construct(string $modelClass, array $imageConfig = [])
    {
        $this->modelClass = $modelClass;
        $this->setImageConfig($imageConfig);
    }

    public function updateImage($image, int $id): bool
    {
        $model = $this->modelClass::find($id);

        if (! $model) {
            throw new RuntimeException(class_basename($this->modelClass) . ' not found');
        }

        // Check if model uses Spatie Media Library with HasSingleImageMedia trait
        if ($this->usesSpatieMediaLibrary($model)) {
            return $this->updateImageViaSpatie($model, $image);
        }

        // Fallback to traditional image field update
        // Delete old image if exists
        if ($model->image) {
            $this->deleteImage($model->image);
        }

        $imagePath = $this->handleImageUpload($image);

        return $model->update(['image' => $imagePath]);
    }

    /**
     * Check if model uses Spatie Media Library with HasSingleImageMedia trait
     */
    protected function usesSpatieMediaLibrary($model): bool
    {
        return $model instanceof HasMedia &&
        in_array(HasSingleImageMedia::class, class_uses_recursive($model));
    }

    /**
     * Update image using Spatie Media Library
     */
    protected function updateImageViaSpatie($model, UploadedFile $image): bool
    {
        // Determine the collection name (field name, defaulting to 'image')
        $field = property_exists($model, 'imageField') ? $model->imageField : 'image';

        // Determine which collection to use - check 'default' first, then field name
        $collectionName = $this->getCollectionName($model, $field);

        // Delete old media from collection
        $model->clearMediaCollection($collectionName);

        // Get image processing options from model
        $options = $this->getImageProcessingOptions($model);

        // Convert image using the same logic as HasSingleImageMedia trait
        $convertedFile = $this->convertImageForSpatie($image, $options);

        // Generate filename
        $originalName = pathinfo($convertedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName     = $originalName . '.' . $options['format'];

        // Add media to collection
        $media = $model->addMedia($convertedFile)
            ->usingFileName($fileName)
            ->usingName($fileName)
            ->toMediaCollection($collectionName);

        // Update the image field with the media URL (following HasSingleImageMedia pattern)
        $model->forceFill([$field => ltrim($media->getUrl(), '/')])->saveQuietly();

        return true;
    }

    /**
     * Get collection name - prioritize field name (as trait uses), but support 'default' for backward compatibility
     */
    protected function getCollectionName($model, string $field): string
    {
        // The HasSingleImageMedia trait uses the field name as collection name
        // So prioritize field name collection first
        if ($model->getFirstMedia($field)) {
            return $field;
        }

        // Check if model has media in 'default' collection (for backward compatibility)
        if ($model->getFirstMedia('default')) {
            return 'default';
        }

        // For new uploads, use field name (as the trait does)
        // This matches what registerSingleImageMediaCollection() registers
        return $field;
    }

    /**
     * Get image processing options from model
     */
    protected function getImageProcessingOptions($model): array
    {
        $defaultOptions = [
            'format'       => 'webp',
            'quality'      => 80,
            'max_width'    => 1200,
            'max_height'   => null,
            'aspect_ratio' => null,
            'crop'         => false,
            'resize_mode'  => 'fit',
        ];

        // Get options from model if method exists
        if (method_exists($model, 'getImageProcessingOptions')) {
            return $model->getImageProcessingOptions();
        }

        // Otherwise, check for properties on the model
        $modelOptions = [];
        if (property_exists($model, 'imageFormat')) {
            $modelOptions['format'] = $model->imageFormat;
        }
        if (property_exists($model, 'imageQuality')) {
            $modelOptions['quality'] = $model->imageQuality;
        }
        if (property_exists($model, 'imageMaxWidth')) {
            $modelOptions['max_width'] = $model->imageMaxWidth;
        }
        if (property_exists($model, 'imageMaxHeight')) {
            $modelOptions['max_height'] = $model->imageMaxHeight;
        }
        if (property_exists($model, 'imageAspectRatio')) {
            $modelOptions['aspect_ratio'] = $model->imageAspectRatio;
        }
        if (property_exists($model, 'imageCrop')) {
            $modelOptions['crop'] = $model->imageCrop;
        }
        if (property_exists($model, 'imageResizeMode')) {
            $modelOptions['resize_mode'] = $model->imageResizeMode;
        }

        return array_merge($defaultOptions, $modelOptions);
    }

    /**
     * Convert image for Spatie Media Library (same logic as HasSingleImageMedia trait)
     */
    protected function convertImageForSpatie(UploadedFile $file, array $options): UploadedFile
    {
        $imageManager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
        $image        = $imageManager->read($file);

        // Apply aspect ratio if specified
        if (! empty($options['aspect_ratio'])) {
            $image = $this->applyAspectRatio($image, $options['aspect_ratio'], $options);
        }

        // Apply resizing
        if (! empty($options['max_width']) || ! empty($options['max_height'])) {
            $image = $this->applyResizing($image, $options);
        }

        // Convert to specified format
        $convertedData = $this->convertToFormat($image, $options);

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
    protected function applyAspectRatio($image, string $aspectRatio, array $options)
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
    protected function applyResizing($image, array $options)
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
    protected function convertToFormat($image, array $options)
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
