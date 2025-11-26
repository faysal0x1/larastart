<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductTranslation extends Model
{
    protected $fillable = [
        'product_id',
        'locale',
        'name',
        'slug',
        'short_descp',
        'long_descp',
        'tags',
        'size',
    ];

    /**
     * Get the product that owns this translation
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
