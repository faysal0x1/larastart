<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLoginHistory extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'user_id',
		'ip_address',
		'user_agent',
		'location',
		'session_id',
		'event_type',
		'error_message',
		'additional_data',
		'created_at',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'location' => 'array',
		'additional_data' => 'array',
	];

	/**
	 * Get the user that owns this login history record.
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
