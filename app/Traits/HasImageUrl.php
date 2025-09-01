<?php
namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait HasImageUrl
{
    /**
     * The default name of the image column in the database.
     * Override this in your model if needed.
     */
    protected string $imageColumnName = 'image';

    /**
     * Get the full public URL for the image
     */
    public function getImageUrlAttribute(): ?string
    {
        $columnName = $this->imageColumnName;

        if (! $this->{$columnName}) {
            return null;
        }

        return Storage::disk('public')->url($this->{$columnName});
    }

    /**
     * Check if image exists
     */
    public function hasImage(): bool
    {
        $columnName = $this->imageColumnName;

        return $this->{$columnName} && Storage::disk('public')->exists($this->{$columnName});
    }
}