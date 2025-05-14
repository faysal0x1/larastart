<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
	protected $fillable = ['title', 'is_group', 'creator_id'];

	public function participants()
	{
		return $this->belongsToMany(User::class, 'participants')
			->withPivot('last_read')
			->withTimestamps();
	}

	public function messages()
	{
		return $this->hasMany(Message::class);
	}

	public function creator()
	{
		return $this->belongsTo(User::class, 'creator_id');
	}

	public function scopeForUser($query, $userId)
	{
		return $query->whereHas('participants', function ($q) use ($userId) {
			$q->where('user_id', $userId);
		});
	}

	public function latestMessage()
	{
		return $this->hasOne(Message::class)->latest();
	}

	public function markAsReadForUser($userId)
	{
		$this->participants()->updateExistingPivot($userId, [
			'last_read' => now()
		]);
	}
}
