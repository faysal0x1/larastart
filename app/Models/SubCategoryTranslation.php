<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubCategoryTranslation extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategory_id',
        'locale',
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the subcategory that owns this translation
     */
    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }
}
