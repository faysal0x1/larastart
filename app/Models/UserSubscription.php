<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'subscription_type_id',
        'subject_id',
        'status',
        'start_date',
        'end_date',
        'trial_ends_at',
        'cancelled_at',
        'cancellation_reason',
        'amount_paid',
        'currency',
        'payment_method',
        'transaction_id',
        'billing_details',
        'auto_renew',
        'next_billing_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'trial_ends_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'amount_paid' => 'decimal:2',
        'billing_details' => 'array',
        'auto_renew' => 'boolean',
        'next_billing_date' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeExpired($query)
    {
        return $query->where('status', 'expired');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Helper methods
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired' || ($this->end_date && now()->gt($this->end_date));
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function hasTrial(): bool
    {
        return $this->trial_ends_at && now()->lt($this->trial_ends_at);
    }

    public function getDaysRemaining(): int
    {
        if (! $this->end_date) {
            return 0;
        }

        $remaining = now()->diffInDays($this->end_date, false);

        return $remaining > 0 ? $remaining : 0;
    }
}
