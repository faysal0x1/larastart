<?php
namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubCategory extends Model
{
    use SlugGenerator;

    protected $table = 'sub_categories';

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

    // Relationships
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'subcategory_id');
    }

    // Many-to-many relationship with categories
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_sub_category')
            ->withPivot('priority')
            ->withTimestamps();
    }

    // Many-to-many relationship with child categories
    public function childCategories(): BelongsToMany
    {
        return $this->belongsToMany(ChildCategory::class, 'sub_category_child_category')
            ->withPivot('priority')
            ->withTimestamps();
    }
}
