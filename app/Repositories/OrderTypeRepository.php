<?php

namespace App\Repositories;

use App\Models\OrderType;

class OrderTypeRepository extends BaseRepository
{
    public function __construct(OrderType $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'created_at'];
    }
}
