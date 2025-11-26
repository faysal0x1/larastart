<?php

declare (strict_types=1);

namespace App\Models;

use App\Traits\HasSingleImageMedia;
use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Brand extends Model implements HasMedia
{
    use InteractsWithMedia, HasSingleImageMedia;

    protected $table = 'brands';

    protected $appends = ['image_url'];

    /**
     * Get the image URL attribute
     * Prioritizes preview_url, falls back to original_url, then to stored image field
     */
    public function getImageUrlAttribute(): ?string {
        // First, try to get from Spatie Media Library
        $media = $this->getFirstMedia('default');
        if ($media) {
            // Try preview URL first, then original URL
            if (!empty($media->preview_url)) {
                return $media->preview_url;
            }
            if (!empty($media->original_url)) {
                return $media->original_url;
            }
        }

        // Fallback to stored image field
        if (!empty($this->image)) {
            // If it's already a full URL, return as is
            if (str_starts_with($this->image, 'http')) {
                return $this->image;
            }
            // If it starts with /, return as is
            if (str_starts_with($this->image, '/')) {
                return $this->image;
            }
            // Otherwise, prepend /
            return '/' . $this->image;
        }

        return null;
    }

    protected string $imageFormat = 'webp';
    protected int $imageQuality = 85;
    protected int $imageMaxWidth = 800;
    protected int $imageMaxHeight = 600;
    protected string $imageAspectRatio = '4:3';
//    protected bool $imageCrop          = true;
    protected string $imageResizeMode = 'crop';

    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'bottom_description',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
    ];

    public function registerMediaCollections(): void {
        $this->registerSingleImageMediaCollection();
    }


    public function products(): HasMany {
        return $this->hasMany(Product::class, 'brand_id');
    }

    public function totalProducts() {
        return $this->products()->count();
    }


    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = \Illuminate\Support\Str::slug($model->name);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('name') && empty($model->slug)) {
                $model->slug = \Illuminate\Support\Str::slug($model->name);
            }
        });
    }
}
