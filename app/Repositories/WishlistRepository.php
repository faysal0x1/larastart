<?php

namespace App\Repositories;

use App\Models\Wishlist;

class WishlistRepository extends BaseRepository
{
    public function __construct(Wishlist $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['user_id', 'product_id', 'qty', 'price', 'color', 'size', 'cartTotal'];
    }
}
