<?php

declare(strict_types=1);

namespace App\Support;

use Illuminate\Support\Facades\Storage;

class ImageCacheBuster
{
    public static function fromPath(?string $imagePath, ?string $updatedAt = null): string
    {
        if (! $imagePath) {
            return '/placeholder.svg';
        }

        if (filter_var($imagePath, FILTER_VALIDATE_URL)) {
            return $imagePath;
        }

        $url = str_starts_with($imagePath, '/')
            ? $imagePath
            : Storage::url($imagePath);

        $cacheBuster = $updatedAt ? strtotime($updatedAt) : time();
        $separator   = str_contains($url, '?') ? '&' : '?';

        return $url . $separator . 'v=' . $cacheBuster;
    }
}

