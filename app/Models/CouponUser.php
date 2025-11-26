<?php
namespace App\Models;

use App\Modules\Coupon\Models\CouponUser as ModuleCouponUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CouponUser extends ModuleCouponUser
{
    use HasFactory;

    protected $table = 'coupon_users';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function coupons(): BelongsToMany
    {
        return $this->belongsToMany(Coupon::class, 'coupon_users');
    }
}