<?php

// app/Repositories/ProductCartRepository.php

namespace App\Repositories;

use App\Models\ProductCart;

class ProductCartRepository extends BaseRepository
{
    public function __construct(ProductCart $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['user_id', 'product_id', 'qty', 'price', 'color', 'size', 'variation', 'cartTotal'];
    }
}
