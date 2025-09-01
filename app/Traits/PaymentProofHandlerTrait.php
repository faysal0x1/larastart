<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Exception;
use Illuminate\Support\Facades\Log;

trait PaymentProofHandlerTrait
{
    protected ?ImageManager $imageManager = null;

    protected string $paymentProofStoragePath = 'deposits/proofs/';

    protected int $originalImageQuality = 95;
    protected int $compressedImageQuality = 80;
    protected int $thumbnailImageQuality = 85;

    protected int $maxCompressedWidth = 800;
    protected int $maxThumbnailWidth = 300;

    protected string $paymentProofImageFormat = 'jpg';

    /**
     * Initialize image manager if not already initialized
     */
    protected function initImageManager(): void
    {
        if (!$this->imageManager) {
            $this->imageManager = new ImageManager(new Driver);
        }
    }

    /**
     * Process uploaded payment proof file (image or PDF)
     *
     * @param UploadedFile $file
     * @param int $userId
     * @param array|null $options
     * @return array
     */
    public function handlePaymentProofUpload(
        UploadedFile $file,
        int $userId,
        ?array $options = null
    ): array {
        // Validate file before processing
        $this->validatePaymentProofFile($file);

        $timestamp = time();
        $originalExtension = strtolower($file->getClientOriginalExtension());
        $baseFileName = 'deposit_proof_' . $userId . '_' . $timestamp;

        // Create user-specific directory
        $uploadPath = $this->paymentProofStoragePath . $userId;
        $this->ensureDirectoryExists($uploadPath);

        // Handle PDF files differently
        if ($originalExtension === 'pdf') {
            return $this->handlePdfUpload($file, $uploadPath, $baseFileName);
        }

        // Process images with multiple variants
        return $this->handleImageUpload($file, $uploadPath, $baseFileName, $options);
    }

    /**
     * Handle PDF file upload
     *
     * @param UploadedFile $file
     * @param string $uploadPath
     * @param string $baseFileName
     * @return array
     */
    protected function handlePdfUpload(
        UploadedFile $file,
        string $uploadPath,
        string $baseFileName
    ): array {
        try {
            $fileName = $baseFileName . '.pdf';
            $filePath = $uploadPath . '/' . $fileName;

            // Store the PDF file
            Storage::disk('public')->putFileAs($uploadPath, $file, $fileName);

            Log::info('PDF payment proof uploaded successfully', [
                'path' => $filePath,
                'size' => $file->getSize(),
                'original_name' => $file->getClientOriginalName()
            ]);

            return [
                'original_path' => $filePath,
                'thumbnail_path' => null,
                'compressed_path' => null,
                'original_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'is_image' => false,
                'dimensions' => null,
                'status' => 'success',
                'message' => 'PDF uploaded successfully'
            ];

        } catch (Exception $e) {
            Log::error('PDF processing failed', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName()
            ]);

            throw new Exception('Failed to process PDF file: ' . $e->getMessage());
        }
    }

    /**
     * Handle image upload with multiple variants (original, compressed, thumbnail)
     *
     * @param UploadedFile $file
     * @param string $uploadPath
     * @param string $baseFileName
     * @param array|null $options
     * @return array
     */
    protected function handleImageUpload(
        UploadedFile $file,
        string $uploadPath,
        string $baseFileName,
        ?array $options = null
    ): array {
        try {
            $this->initImageManager();

            // Override defaults with options if provided
            $originalQuality = $options['original_quality'] ?? $this->originalImageQuality;
            $compressedQuality = $options['compressed_quality'] ?? $this->compressedImageQuality;
            $thumbnailQuality = $options['thumbnail_quality'] ?? $this->thumbnailImageQuality;
            $maxCompressedWidth = $options['max_compressed_width'] ?? $this->maxCompressedWidth;
            $maxThumbnailWidth = $options['max_thumbnail_width'] ?? $this->maxThumbnailWidth;
            $format = $options['format'] ?? $this->paymentProofImageFormat;

            // Create image instance and get original dimensions
            $img = $this->imageManager->read($file);
            $originalWidth = $img->width();
            $originalHeight = $img->height();

            // Generate file paths
            $originalPath = $uploadPath . '/' . $baseFileName . '_original.' . $format;
            $compressedPath = $uploadPath . '/' . $baseFileName . '_compressed.' . $format;
            $thumbnailPath = $uploadPath . '/' . $baseFileName . '_thumb.' . $format;

            // 1. Process and save original (high quality)
            $originalImg = clone $img;
            $processedOriginal = $this->processImageVariant(
                $originalImg,
                null, // No resizing for original
                $originalQuality,
                $format
            );
            Storage::disk('public')->put($originalPath, $processedOriginal);

            // 2. Process and save compressed version
            $compressedImg = clone $img;
            if ($compressedImg->width() > $maxCompressedWidth) {
                $compressedImg->resize($maxCompressedWidth);
            }
            $processedCompressed = $this->processImageVariant(
                $compressedImg,
                null,
                $compressedQuality,
                $format
            );
            Storage::disk('public')->put($compressedPath, $processedCompressed);

            // 3. Process and save thumbnail
            $thumbnailImg = clone $img;
            $thumbnailImg->resize($maxThumbnailWidth, $maxThumbnailWidth, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $processedThumbnail = $this->processImageVariant(
                $thumbnailImg,
                null,
                $thumbnailQuality,
                $format
            );
            Storage::disk('public')->put($thumbnailPath, $processedThumbnail);

            // Get file sizes
            $originalSize = Storage::disk('public')->size($originalPath);
            $compressedSize = Storage::disk('public')->size($compressedPath);
            $thumbnailSize = Storage::disk('public')->size($thumbnailPath);

            // Get final dimensions after processing
            $compressedDimensions = $this->getImageDimensions($compressedPath);
            $thumbnailDimensions = $this->getImageDimensions($thumbnailPath);

            Log::info('Image payment proof processed successfully', [
                'original_path' => $originalPath,
                'sizes' => [
                    'original' => $originalSize,
                    'compressed' => $compressedSize,
                    'thumbnail' => $thumbnailSize,
                ]
            ]);

            return [
                'original_path' => $originalPath,
                'thumbnail_path' => $thumbnailPath,
                'compressed_path' => $compressedPath,
                'original_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'processed_sizes' => [
                    'original' => $originalSize,
                    'compressed' => $compressedSize,
                    'thumbnail' => $thumbnailSize,
                ],
                'mime_type' => 'image/' . $format,
                'is_image' => true,
                'dimensions' => [
                    'original' => ['width' => $originalWidth, 'height' => $originalHeight],
                    'compressed' => $compressedDimensions,
                    'thumbnail' => $thumbnailDimensions,
                ],
                'status' => 'success',
                'message' => 'Image processed successfully'
            ];

        } catch (Exception $e) {
            Log::error('Image processing failed, falling back to original', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName()
            ]);

            return $this->fallbackSaveOriginal($file, $uploadPath, $baseFileName, $e->getMessage());
        }
    }

    /**
     * Process image variant based on format and quality
     *
     * @param mixed $image
     * @param int|null $maxWidth
     * @param int $quality
     * @param string $format
     * @return mixed
     */
    protected function processImageVariant($image, ?int $maxWidth, int $quality, string $format)
    {
        // Resize if max width is specified and image is larger
        if ($maxWidth && $image->width() > $maxWidth) {
            $image->resize($maxWidth);
        }

        // Convert and compress based on format
        return match (strtolower($format)) {
            'webp' => $image->toWebp($quality),
            'jpg', 'jpeg' => $image->toJpeg($quality),
            'png' => $image->toPng(),
            'gif' => $image->toGif(),
            default => $image->toJpeg($quality),
        };
    }

    /**
     * Get image dimensions from stored file
     *
     * @param string $path
     * @return array
     */
    protected function getImageDimensions(string $path): array
    {
        try {
            $fullPath = Storage::disk('public')->path($path);
            if (file_exists($fullPath)) {
                $imageSize = getimagesize($fullPath);
                return [
                    'width' => $imageSize[0] ?? 0,
                    'height' => $imageSize[1] ?? 0
                ];
            }
        } catch (Exception $e) {
            Log::warning('Could not get image dimensions', ['path' => $path, 'error' => $e->getMessage()]);
        }

        return ['width' => 0, 'height' => 0];
    }

    /**
     * Validate uploaded payment proof file
     *
     * @param UploadedFile $file
     * @throws Exception
     */
    protected function validatePaymentProofFile(UploadedFile $file): void
    {
        if (!$file->isValid()) {
            throw new Exception('Invalid file upload');
        }

        // Check file size (10MB max)
        $maxSize = 10 * 1024 * 1024;
        if ($file->getSize() > $maxSize) {
            throw new Exception('File size exceeds maximum limit of 10MB');
        }

        // Check allowed extensions
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];
        $extension = strtolower($file->getClientOriginalExtension());

        if (!in_array($extension, $allowedExtensions)) {
            throw new Exception('File type not allowed. Allowed types: ' . implode(', ', $allowedExtensions));
        }

        // Additional MIME type validation
        $allowedMimeTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'
        ];

        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            throw new Exception('Invalid file type detected');
        }
    }

    /**
     * Ensure upload directory exists
     *
     * @param string $path
     */
    protected function ensureDirectoryExists(string $path): void
    {
        if (!Storage::disk('public')->exists($path)) {
            Storage::disk('public')->makeDirectory($path, 0755, true);
        }
    }

    /**
     * Fallback method to save original file when processing fails
     *
     * @param UploadedFile $file
     * @param string $uploadPath
     * @param string $baseFileName
     * @param string $errorMessage
     * @return array
     */
    protected function fallbackSaveOriginal(
        UploadedFile $file,
        string $uploadPath,
        string $baseFileName,
        string $errorMessage
    ): array {
        try {
            $originalExtension = $file->getClientOriginalExtension();
            $fileName = $baseFileName . '.' . $originalExtension;
            $filePath = $uploadPath . '/' . $fileName;

            Storage::disk('public')->putFileAs($uploadPath, $file, $fileName);

            return [
                'original_path' => $filePath,
                'thumbnail_path' => null,
                'compressed_path' => null,
                'original_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'is_image' => false,
                'dimensions' => null,
                'processing_error' => $errorMessage,
                'status' => 'fallback',
                'message' => 'File saved without processing due to error'
            ];

        } catch (Exception $e) {
            Log::error('Fallback save also failed', [
                'error' => $e->getMessage(),
                'original_error' => $errorMessage,
                'file' => $file->getClientOriginalName()
            ]);

            throw new Exception('Complete processing failure: ' . $e->getMessage());
        }
    }

    /**
     * Delete payment proof files
     *
     * @param array $fileData
     * @return bool
     */
    public function deletePaymentProofFiles(array $fileData): bool
    {
        try {
            $filesToDelete = array_filter([
                $fileData['original_path'] ?? null,
                $fileData['thumbnail_path'] ?? null,
                $fileData['compressed_path'] ?? null,
            ]);

            foreach ($filesToDelete as $filePath) {
                if (Storage::disk('public')->exists($filePath)) {
                    Storage::disk('public')->delete($filePath);
                }
            }

            Log::info('Payment proof files deleted successfully', [
                'files' => $filesToDelete
            ]);

            return true;

        } catch (Exception $e) {
            Log::error('Failed to delete payment proof files', [
                'error' => $e->getMessage(),
                'files' => $fileData
            ]);

            return false;
        }
    }

    /**
     * Get optimized file path based on use case
     *
     * @param array $fileData
     * @param string $variant ('original', 'compressed', 'thumbnail')
     * @return string|null
     */
    public function getPaymentProofPath(array $fileData, string $variant = 'compressed'): ?string
    {
        return match ($variant) {
            'original' => $fileData['original_path'] ?? null,
            'thumbnail' => $fileData['thumbnail_path'] ?? $fileData['original_path'] ?? null,
            'compressed' => $fileData['compressed_path'] ?? $fileData['original_path'] ?? null,
            default => $fileData['original_path'] ?? null,
        };
    }

    /**
     * Get file URL for public access
     *
     * @param string $path
     * @return string
     */
    public function getPaymentProofUrl(string $path): string
    {
        return Storage::disk('public')->url($path);
    }

    /**
     * Set configuration for payment proof handling
     *
     * @param array $config
     */
    public function setPaymentProofConfig(array $config): void
    {
        if (isset($config['storage_path'])) {
            $this->paymentProofStoragePath = rtrim($config['storage_path'], '/') . '/';
        }

        $this->originalImageQuality = $config['original_quality'] ?? $this->originalImageQuality;
        $this->compressedImageQuality = $config['compressed_quality'] ?? $this->compressedImageQuality;
        $this->thumbnailImageQuality = $config['thumbnail_quality'] ?? $this->thumbnailImageQuality;
        $this->maxCompressedWidth = $config['max_compressed_width'] ?? $this->maxCompressedWidth;
        $this->maxThumbnailWidth = $config['max_thumbnail_width'] ?? $this->maxThumbnailWidth;
        $this->paymentProofImageFormat = $config['format'] ?? $this->paymentProofImageFormat;
    }
}

// Usage Example in Model or Service:
/*
use App\Traits\PaymentProofHandlerTrait;

class PaymentService
{
    use PaymentProofHandlerTrait;

    public function processPaymentProof(UploadedFile $file, int $userId, array $options = [])
    {
        // Optionally configure before processing
        $this->setPaymentProofConfig([
            'storage_path' => 'payments/proofs',
            'compressed_quality' => 75,
            'format' => 'webp'
        ]);

        return $this->handlePaymentProofUpload($file, $userId, $options);
    }
}

// Usage in Controller:
class PaymentController extends Controller
{
    use PaymentProofHandlerTrait;

    public function uploadPaymentProof(Request $request)
    {
        $request->validate([
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,gif,webp,pdf|max:10240'
        ]);

        try {
            $file = $request->file('payment_proof');
            $userId = auth()->id();

            $processedFile = $this->handlePaymentProofUpload($file, $userId, [
                'compressed_quality' => 75,
                'format' => 'webp'
            ]);

            // Save to database...

            return response()->json([
                'success' => true,
                'message' => 'Payment proof uploaded successfully',
                'data' => $processedFile
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }
}
*/
