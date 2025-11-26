<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopAnalytic extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'date',
        'total_views',
        'unique_visitors',
        'total_orders',
        'total_sales',
        'total_commission',
        'total_products',
        'new_products',
        'total_reviews',
        'average_rating',
        'total_customers',
        'new_customers',
    ];

    protected $casts = [
        'date'             => 'date',
        'total_views'      => 'integer',
        'unique_visitors'  => 'integer',
        'total_orders'     => 'integer',
        'total_sales'      => 'decimal:2',
        'total_commission' => 'decimal:2',
        'total_products'   => 'integer',
        'new_products'     => 'integer',
        'total_reviews'    => 'integer',
        'average_rating'   => 'decimal:2',
        'total_customers'  => 'integer',
        'new_customers'    => 'integer',
    ];

    // Relationships
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    // Scopes
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    public function scopeByShop($query, $shopId)
    {
        return $query->where('shop_id', $shopId);
    }
}
