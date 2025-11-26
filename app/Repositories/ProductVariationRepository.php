<?php

// app/Repositories/ProductVariationRepository.php

namespace App\Repositories;

use App\Models\ProductVariation;

class ProductVariationRepository extends BaseRepository
{
    public function __construct(ProductVariation $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['product_id', 'name', 'sku', 'price', 'stock', 'attributes'];
    }
}
