<?php

namespace App\Repositories;

use App\Models\Coupon;

class CouponRepository extends BaseRepository
{
    public function __construct(Coupon $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['type', 'title', 'slug', 'code', 'coupon_for', 'limit', 'user_limit', 'coupon_used', 'discount_type', 'discount', 'max_discount', 'minimum_purchase', 'start_at', 'end_at', 'status'];
    }
}
