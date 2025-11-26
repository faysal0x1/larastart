<?php

namespace App\Repositories;

use App\Models\DealOfTheDay;

class DealOfTheDayRepository extends BaseRepository
{
    public function __construct(DealOfTheDay $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['title', 'slug', 'product_id', 'start_date', 'end_date', 'image', 'discount_type', 'discount', 'status'];
    }
}
