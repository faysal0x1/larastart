<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariationTypeValue extends Model
{
    protected $table = 'product_variation_type_values';

    protected $fillable = [
        'variation_type_id',
        'value',
    ];

    public function variationType(): BelongsTo
    {
        return $this->belongsTo(ProductVariationType::class, 'variation_type_id');
    }
}