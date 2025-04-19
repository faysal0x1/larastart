<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
	use  HasFactory, Notifiable, SoftDeletes;

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
	public function freelancer()
	{
		return $this->hasOne(Freelancer::class);
	}

	/**
	 * Get the employer profile associated with the user.
	 */
	public function employer()
	{
		return $this->hasOne(Employer::class);
	}

	/**
	 * Get the user that referred this user.
	 */
	public function referrer()
	{
		return $this->belongsTo(User::class, 'referred_by');
	}

	/**
	 * Get the users referred by this user.
	 */
	public function referrals()
	{
		return $this->hasMany(User::class, 'referred_by');
	}

	/**
	 * Determine if the user is a freelancer.
	 */
	public function isFreelancer()
	{
		return $this->role === 'freelancer';
	}

	/**
	 * Determine if the user is an employer.
	 */
	public function isEmployer()
	{
		return $this->role === 'employer';
	}

	/**
	 * Determine if the user is an admin.
	 */
	public function isAdmin()
	{
		return $this->role === 'admin';
	}

}
