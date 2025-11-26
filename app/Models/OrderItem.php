<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class OrderItem extends Model
{

    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'shop_id',
        'product_id',
        'product_name',
        'product_sku',
        'quantity',
        'qty',
        'price',
        'unit_price',
        'total_price',
        'vendor_amount',
        'options',
    ];



    // Relationships
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_items');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }
}
