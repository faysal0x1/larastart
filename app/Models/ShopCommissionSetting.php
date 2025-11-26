<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopCommissionSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'category_id',
        'subcategory_id',
        'commission_rate',
        'fixed_commission',
        'commission_type',
        'is_active',
        'notes',
    ];

    protected $casts = [
        'commission_rate' => 'decimal:2',
        'fixed_commission' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByShop($query, $shopId)
    {
        return $query->where('shop_id', $shopId);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeBySubcategory($query, $subcategoryId)
    {
        return $query->where('subcategory_id', $subcategoryId);
    }

    // Helper methods
    public function calculateCommission($amount)
    {
        if ($this->commission_type === 'fixed') {
            return $this->fixed_commission;
        }

        if ($this->commission_type === 'percentage') {
            return ($amount * $this->commission_rate) / 100;
        }

        if ($this->commission_type === 'hybrid') {
            return $this->fixed_commission + (($amount * $this->commission_rate) / 100);
        }

        return 0;
    }
}