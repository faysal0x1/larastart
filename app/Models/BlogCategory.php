<?php

namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
	use SlugGenerator, SoftDeletes;

	protected $fillable = [
		'name',
		'slug',
		'description',
		'status',
		'order'
	];

	/**
	 * Get all blogs that belong to this category
	 */
	public function blogs(): HasMany {
		return $this->hasMany(Blog::class);
	}
}
