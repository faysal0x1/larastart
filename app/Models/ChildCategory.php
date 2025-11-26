<?php
namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChildCategory extends Model
{
    use SlugGenerator;

    protected $table = 'child_categories';

    protected $fillable = [
        'name',
        'slug',
        'priority',
        'description',
        'image',
        'banner',
        'meta_title',
        'meta_image',
        'meta_description',
        'is_featured',
        'is_active',
    ];

    // Many-to-many relationship with sub-categories
    public function subCategories(): BelongsToMany
    {
        return $this->belongsToMany(SubCategory::class, 'sub_category_child_category')
            ->withPivot('priority')
            ->withTimestamps();
    }

    // Relationship with products (if needed)
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'child_category_id');
    }
}