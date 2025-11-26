<?php

namespace App\Repositories;

use App\Models\ColorAttribute;

class ColorAttributeRepository extends BaseRepository
{
    public function __construct(ColorAttribute $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'code'];
    }
}
