<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'user_id',
        'rating',
        'comment',
        'is_verified_purchase',
        'is_approved',
        'approved_at',
    ];

    protected $casts = [
        'rating'               => 'integer',
        'is_verified_purchase' => 'boolean',
        'is_approved'          => 'boolean',
        'approved_at'          => 'datetime',
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
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeByRating($query, $rating)
    {
        return $query->where('rating', $rating);
    }
}
