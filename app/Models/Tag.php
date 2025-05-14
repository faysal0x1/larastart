<?php

namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
	use SlugGenerator;

	protected $fillable = [
		'name',
		'slug',
		'status'
	];

	/**
	 * Get all blogs that have this tag
	 */
	public function blogs(): BelongsToMany {
		return $this->belongsToMany(Blog::class, 'blog_tag');
	}


	public function post(): BelongsToMany {
		return $this->belongsToMany(Post::class);
	}
}
