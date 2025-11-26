<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DealOfTheDayProduct extends Model
{

    protected $table = 'deal_of_the_day_products';

    protected $fillable = [
        'deal_of_the_day_id',
        'product_id',
        'quantity',
        'price',
        'discount_type',
        'discount',
    ];

    public function dealOfTheDay() {
        return $this->belongsTo(DealOfTheDay::class);
    }


    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function getDiscountedPriceAttribute() {
        if ($this->discount_type == 'fixed') {
            return $this->price - $this->discount;
        }
        return $this->price - ($this->price * $this->discount / 100);
    }

}
