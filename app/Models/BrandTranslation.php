<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BrandTranslation extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'locale',
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the brand that owns this translation
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
}
