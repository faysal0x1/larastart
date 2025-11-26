<?php
namespace App\Models;

use App\Traits\HasSingleImageMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Category extends Model implements HasMedia
{
    use InteractsWithMedia, HasSingleImageMedia;

    protected $table   = 'categories';
    protected $appends = ['image_url'];

    protected string $imageFormat      = 'webp';
    protected int $imageQuality        = 85;
    protected int $imageMaxWidth       = 800;
    protected int $imageMaxHeight      = 600;
    protected string $imageAspectRatio = '4:3';
    //    protected bool $imageCrop          = true;
    protected string $imageResizeMode = 'crop';

    /**
     * Get the image URL attribute
     * Prioritizes preview_url, falls back to original_url, then to stored image field
     */
    public function getImageUrlAttribute(): ?string
    {
        // Try 'image' collection first, then 'default' collection
        $media = $this->getFirstMedia('image') ?? $this->getFirstMedia('default');

        if ($media) {
            // Try preview URL first, then original URL
            if (! empty($media->preview_url)) {
                return $media->preview_url;
            }
            if (! empty($media->original_url)) {
                return $media->original_url;
            }
        }

        // Fallback to stored image field
        if (! empty($this->image)) {
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
    protected $fillable = [
        'name',
        'slug',
        'priority',
        'description',
        'bottom_description',
        'image',
        'banner',
        'meta_title',
        'meta_image',
        'meta_description',
        'parent_id',
        'level',
        'path',
        'status',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
    ];

    // Relationships
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function descendants(): HasMany
    {
        return $this->children()->with('descendants');
    }

    public function ancestors()
    {
        $ancestors = collect();
        $category  = $this->parent;

        while ($category) {
            $ancestors->prepend($category);
            $category = $category->parent;
        }

        return $ancestors;
    }

    // Scope for root categories (no parent)
    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }

    // Scope for categories at specific level
    public function scopeAtLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    // Scope for categories with specific parent
    public function scopeWithParent($query, $parentId)
    {
        return $query->where('parent_id', $parentId);
    }

    public function registerMediaCollections(): void
    {
        $this->registerSingleImageMediaCollection();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = \Illuminate\Support\Str::slug($model->name);
            }
        });

        static::updating(function ($model) {
            // If you want slug to update when name changes, keep this block
            // Otherwise, remove it to make slug permanent
            if ($model->isDirty('name') && empty($model->slug)) {
                $model->slug = \Illuminate\Support\Str::slug($model->name);
            }
        });
    }
}
