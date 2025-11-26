<?php

declare (strict_types = 1);

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasImageUrl
{
    /**
     * The name of the image column in the database.
     * Override this in your model if needed.
     */
    protected string $imageColumn = 'image';

    /**
     * Get the full public URL for the image
     */
    public function getImageUrlAttribute(): ?string
    {
        $column = $this->imageColumn ?? 'image';

        if (! $this->{$column}) {
            return null;
        }

        return Storage::disk('public')->url($this->{$column});
    }

    /**
     * Check if image exists
     */
    public function hasImage(): bool
    {
        $column = $this->imageColumn ?? 'image';

        return $this->{$column} && Storage::disk('public')->exists($this->{$column});
    }
}
