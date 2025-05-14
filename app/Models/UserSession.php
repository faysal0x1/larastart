<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSession extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'user_id',
		'session_id',
		'session_token',
		'ip_address',
		'user_agent',
		'device_details',
		'is_active',
		'login_time',
		'last_activity',
		'expiry_time',
		'logged_out_at',
		'force_logged_out',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'device_details' => 'array',
		'is_active' => 'boolean',
		'force_logged_out' => 'boolean',
		'login_time' => 'datetime',
		'last_activity' => 'datetime',
		'expiry_time' => 'datetime',
		'logged_out_at' => 'datetime',
	];

	/**
	 * Get the user that owns the session.
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
