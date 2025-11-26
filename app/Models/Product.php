<?php
namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use SlugGenerator, SoftDeletes, InteractsWithMedia;

    protected $table   = 'products';
    protected $appends = ['specs_by_group', 'image_url', 'call_for_price_number'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    protected $fillable = [
        'shop_id',
        'vendor_id',
        'brand_id',
        'category_id',
        'subcategory_id',
        'child_category_id',
        'name',
        'slug',
        'type',
        'sku',
        'qty',
        'tags',
        'size',
        'stock',
        'unit_price',
        'discount_type',
        'discount_price',
        'product_tax',
        'tax_calculation',
        'final_price',
        'short_descp',
        'long_descp',
        'product_thumbnail',
        'hot_deals',
        'featured',
        'special_offer',
        'special_deals',
        'call_for_price',
        'status',
        'is_approved',
        'approved_at',
        'rejection_reason',
        'key_features',
        'product_specs_data',
    ];

    /**
     * Register media collections for Spatie Media Library
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')->singleFile();
        $this->addMediaCollection('multi_images');
        $this->addMediaCollection('color_images');
    }

    /**
     * Accessor: prefer Media Library URL, fallback to stored column
     */
    public function getImageUrlAttribute(): ?string
    {
        $mediaUrl = $this->getFirstMediaUrl('thumbnail');
        if (! empty($mediaUrl)) {
            return $mediaUrl;
        }

        $thumb = $this->product_thumbnail ?? null;
        if (empty($thumb)) {
            return null;
        }

        if (Str::startsWith($thumb, ['http://', 'https://'])) {
            return $thumb;
        }

        return $thumb[0] === '/' ? $thumb : '/' . $thumb;
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function tag(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'subcategory_id');
    }

    public function childCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'child_category_id');
    }

    public function multiImages(): HasMany
    {
        return $this->hasMany(MultiImage::class, 'product_id');
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class, 'product_id');
    }

    public function compares(): HasMany
    {
        return $this->hasMany(Compare::class, 'product_id');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'product_id');
    }

    public function productReviews(): HasMany
    {
        return $this->hasMany(ProductReview::class, 'product_id');
    }

    public function colorImages(): HasMany
    {
        return $this->hasMany(ColorImage::class, 'product_id');
    }

    public function seo(): HasOne
    {
        return $this->hasOne(ProductSeo::class, 'product_id');
    }

    public function flashDealProducts(): HasMany
    {
        return $this->hasMany(FlashDealProduct::class, 'product_id');
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function dealOfTheDays(): HasMany
    {
        return $this->hasMany(DealOfTheDay::class, 'product_id');
    }

    public function productCarts(): HasMany
    {
        return $this->hasMany(ProductCart::class, 'product_id');
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class, 'product_id');
    }

    public function specValues(): HasMany
    {
        return $this->hasMany(ProductSpecValue::class);
    }

    public function specsByGroup(): array
    {
        $grouped = [];
        foreach ($this->specValues()->with('attribute.group')->get() as $val) {
            $groupName = $val->attribute->group->name ?? 'General';
            $attrName  = $val->attribute->name ?? '';
            if (! isset($grouped[$groupName])) {
                $grouped[$groupName] = [];
            }
            $grouped[$groupName][$attrName] = $val->value;
        }
        return $grouped;
    }

    public function getSpecsByGroupAttribute(): array
    {
        $grouped = [];
        foreach ($this->specValues()->with('attribute.group')->get() as $val) {
            $groupName                      = $val->attribute->group->name ?? 'General';
            $attrName                       = $val->attribute->name ?? '';
            $grouped[$groupName][$attrName] = $val->value;
        }
        return $grouped;
    }

    public function getCallForPriceNumberAttribute(): string
    {
        return "+8801713991638";
    }
}
