<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopPayout extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'user_id',
        'amount',
        'fee',
        'net_amount',
        'status',
        'payout_method',
        'payout_details',
        'notes',
        'processed_at',
        'completed_at',
    ];

    protected $casts = [
        'amount'         => 'decimal:2',
        'fee'            => 'decimal:2',
        'net_amount'     => 'decimal:2',
        'payout_details' => 'array',
        'processed_at'   => 'datetime',
        'completed_at'   => 'datetime',
    ];

    // Relationships
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPayoutMethod($query, $method)
    {
        return $query->where('payout_method', $method);
    }
}
