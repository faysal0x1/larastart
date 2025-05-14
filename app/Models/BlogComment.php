<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogComment extends Model
{

	protected $fillable = [
		'blog_id',
		'user_id',
		'parent_id',
		'content',
		'author_name',
		'author_email',
		'author_ip',
		'status'
	];

	/**
	 * Get the blog that owns the comment
	 */
	public function blog(): BelongsTo {
		return $this->belongsTo(Blog::class);
	}

	/**
	 * Get the user who posted the comment (if registered)
	 */
	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}

	/**
	 * Get the parent comment
	 */
	public function parent(): BelongsTo {
		return $this->belongsTo(__CLASS__, 'parent_id');
	}

	/**
	 * Get all replies to this comment
	 */
	public function replies(): HasMany {
		return $this->hasMany(__CLASS__, 'parent_id');
	}

	/**
	 * Get only approved replies to this comment
	 */
	public function approvedReplies(): HasMany {
		return $this->hasMany(__CLASS__, 'parent_id')->where('status', 1);
	}

	/**
	 * Scope a query to only include approved comments
	 */
	public function scopeApproved($query) {
		return $query->where('status', 1);
	}
}
