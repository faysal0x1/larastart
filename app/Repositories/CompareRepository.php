<?php

namespace App\Repositories;

use App\Models\Compare;

class CompareRepository extends BaseRepository
{
    public function __construct(Compare $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['user_id', 'product_id'];
    }
}
