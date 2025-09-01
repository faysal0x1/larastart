<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
	use  HasFactory, Notifiable, SoftDeletes, HasRoles;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'username',
		'password',
		'role',
		'avatar',
		'phone',
		'bio',
		'address',
		'city',
		'state',
		'country',
		'postal_code',
		'account_balance',
		'points',
		'referral_code',
		'referred_by',
		'referred_users_count',
		'loyalty_points',
		'is_verified',
		'is_banned',
		'last_login_at',
		'social_id',
		'social_type',
		'otp',
		'otp_expires_at'
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
		'account_balance' => 'decimal:2',
		'last_login_at' => 'datetime',
		'is_verified' => 'boolean',
		'is_banned' => 'boolean',
	];



	public function location() {
		return $this->hasOne(UserLocation::class);
	}


	/**
	 * Determine if the user is an admin.
	 */
	public function isAdmin(): bool {
		return $this->role === 'admin';
	}


	/**
	 * Get all blogs created by this user
	 */
	public function blogs(): HasMany {
		return $this->hasMany(Blog::class, 'created_by');
	}

	/**
	 * Get all comments made by this user
	 */
	public function comments(): HasMany {
		return $this->hasMany(BlogComment::class);
	}

	/**
	 * Get all blogs liked by this user
	 */
	public function likedBlogs(): BelongsToMany {
		return $this->belongsToMany(Blog::class, 'blog_likes', 'user_id', 'blog_id')->withTimestamps();
	}


	public function conversations()
	{
		return $this->belongsToMany(Conversation::class, 'participants')
			->withPivot('last_read')
			->withTimestamps();
	}

	public function messages()
	{
		return $this->hasMany(Message::class);
	}

	public function isInConversation($conversationId)
	{
		return $this->conversations()->where('conversation_id', $conversationId)->exists();
	}
}
