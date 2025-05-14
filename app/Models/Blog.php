<?php

namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{

	use SlugGenerator, SoftDeletes;

	protected $fillable = [
		'blog_category_id',
		'created_by',
		'title',
		'slug',
		'featured_image',
		'summary',
		'content',
		'views',
		'is_featured',
		'published_at',
		'status',
		'meta_title',
		'meta_description',
		'meta_keywords',
		'og_image'
	];

	protected $casts = [
		'published_at' => 'datetime',
		'is_featured' => 'boolean',
	];

	/**
	 * Get the category that owns the blog
	 */
	public function category(): BelongsTo {
		return $this->belongsTo(BlogCategory::class, 'blog_category_id');
	}

	/**
	 * Get the user who created the blog
	 */
	public function author(): BelongsTo {
		return $this->belongsTo(User::class, 'created_by');
	}

	/**
	 * Get all tags for this blog
	 */
	public function tags(): BelongsToMany {
		return $this->belongsToMany(Tag::class, 'blog_tag');
	}

	/**
	 * Get all comments for this blog
	 */
	public function comments(): HasMany {
		return $this->hasMany(BlogComment::class);
	}

	/**
	 * Get only approved comments for this blog
	 */
	public function approvedComments(): HasMany {
		return $this->hasMany(BlogComment::class)->where('status', 1);
	}

	/**
	 * Get all likes for this blog
	 */
	public function likes(): HasMany {
		return $this->hasMany(BlogLike::class);
	}


	/**
	 * Check if a specific user has liked this blog
	 */
	public function isLikedBy(User $user): bool {
		return $this->likes()->where('user_id', $user->id)->exists();
	}

	/**
	 * Increment view count
	 */
	public function incrementView(): Blog {
		$this->increment('views');
		return $this;
	}

	/**
	 * Scope a query to only include published blogs
	 */
	public function scopePublished($query) {
		return $query->where('status', 1)
			->where('published_at', '<=', now());
	}

	/**
	 * Scope a query to only include featured blogs
	 */
	public function scopeFeatured($query) {
		return $query->where('is_featured', true);
	}
}
