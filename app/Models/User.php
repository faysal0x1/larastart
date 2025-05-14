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

	/**
	 * Get the freelancer profile associated with the user.
	 */
	public function freelancer(): HasOne {
		return $this->hasOne(Freelancer::class);
	}

	/**
	 * Get the employer profile associated with the user.
	 */
	public function employer(): HasOne {
		return $this->hasOne(Employer::class);
	}

	public function location() {
		return $this->hasOne(UserLocation::class);
	}

	public function professionalDetail() {
		return $this->hasOne(FreelancerProfessionalDetail::class);
	}

	/**
	 * Get the user that referred this user.
	 */
	public function referrer(): BelongsTo {
		return $this->belongsTo(__CLASS__, 'referred_by');
	}

	/**
	 * Get the users referred by this user.
	 */
	public function referrals(): HasMany {
		return $this->hasMany(__CLASS__, 'referred_by');
	}

	/**
	 * Determine if the user is a freelancer.
	 */
	public function isFreelancer(): bool {
		return $this->role === 'freelancer';
	}

	/**
	 * Determine if the user is an employer.
	 */
	public function isEmployer(): bool {
		return $this->role === 'employer';
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


	/**
	 * Get the micro tasks created by this user (as an employer)
	 */
	public function createdMicroTasks(): HasMany {
		return $this->hasMany(MicroTask::class, 'employer_id');
	}

	/**
	 * Get the micro task completions by this user
	 */
	public function microTaskCompletions(): HasMany {
		return $this->hasMany(MicroTaskSubmission::class);
	}

	/**
	 * Get micro tasks completed by this user
	 */
	public function completedMicroTasks(): BelongsToMany {
		return $this->belongsToMany(MicroTask::class, 'micro_task_completions')
			->withPivot('status', 'points_awarded', 'proof_of_completion', 'rejection_reason')
			->withTimestamps();
	}

	/**
	 * Get approved micro task completions
	 */
	public function approvedCompletions(): HasMany {
		return $this->hasMany(MicroTaskSubmission::class)->where('status', 'approved');
	}

	/**
	 * Get rejected micro task completions
	 */
	public function rejectedCompletions(): HasMany {
		return $this->hasMany(MicroTaskSubmission::class)->where('status', 'rejected');
	}

	/**
	 * Get pending micro task completions
	 */
	public function pendingCompletions(): HasMany {
		return $this->hasMany(MicroTaskSubmission::class)->where('status', 'pending');
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
