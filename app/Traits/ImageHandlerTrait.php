<?php


namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

trait ImageHandlerTrait
{
	protected ?ImageManager $imageManager = null;

	protected string $imageStoragePath = 'images/';

	protected int $maxImageWidth = 1200;

	protected int $imageQuality = 80;

	protected string $imageFormat = 'webp';

	/**
	 * Initialize image manager if not already initialized
	 */
	protected function initImageManager(): void
	{
		if (! $this->imageManager) {
			$this->imageManager = new ImageManager(new Driver);
		}
	}

	/**
	 * Handle image upload with optional compression and format conversion
	 */
	public function handleImageUpload(
		$image,
		string $subfolder = '',
		?array $options = null
	): string {
		$this->initImageManager();

		// Use provided options or fall back to defaults
		$maxWidth = $options['max_width'] ?? $this->maxImageWidth;
		$quality = $options['quality'] ?? $this->imageQuality;
		$format = $options['format'] ?? $this->imageFormat;

		// Generate a unique filename
		$filename = Str::uuid().'.'.$format;
		$path = $this->imageStoragePath.($subfolder ? trim($subfolder, '/').'/' : '').$filename;

		$img = $this->imageManager->read($image);

		// Resize if needed
		if ($img->width() > $maxWidth) {
			$img->resize($maxWidth);
		}

		// Convert and compress based on format
		$processedImage = match (strtolower($format)) {
			'webp' => $img->toWebp($quality),
			'jpg', 'jpeg' => $img->toJpeg($quality),
			'png' => $img->toPng(),
			'gif' => $img->toGif(),
			default => $img->toWebp($quality),
		};

		// Store the file
		Storage::disk('public')->put($path, $processedImage->toString());

		return $path;
	}

	/**
	 * Delete an image from storage
	 */
	public function deleteImage(?string $imagePath): bool
	{
		if ($imagePath && Storage::disk('public')->exists($imagePath)) {
			return Storage::disk('public')->delete($imagePath);
		}

		return false;
	}

	/**
	 * Set configuration for image handling
	 */
	public function setImageConfig(array $config): void
	{
		if (isset($config['storage_path'])) {
			$this->imageStoragePath = rtrim($config['storage_path'], '/').'/';
		}
		$this->maxImageWidth = $config['max_width'] ?? $this->maxImageWidth;
		$this->imageQuality = $config['quality'] ?? $this->imageQuality;
		$this->imageFormat = $config['format'] ?? $this->imageFormat;
	}
}
