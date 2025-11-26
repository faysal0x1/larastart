<?php
namespace App\Models;

use App\Modules\Coupon\Models\Coupon as ModelsCoupon;
use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends ModelsCoupon
{
//    use Cachable, SlugGenerator;
    use SlugGenerator;

    protected $table = 'coupons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'title',
        'slug',
        'code',
        'coupon_for',
        'limit',
        'user_limit',
        'coupon_used',
        'discount_type',
        'discount',
        'max_discount',
        'minimum_purchase',
        'start_at',
        'end_at',
        'status',
    ];

    public function couponUsers(): HasMany
    {
        return $this->hasMany(CouponUser::class, 'coupon_id');
    }

}