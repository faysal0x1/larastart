<?php

// app/Repositories/SliderRepository.php

namespace App\Repositories;

use App\Models\Slider;

class SliderRepository extends BaseRepository
{
    public function __construct(Slider $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['title', 'short_title', 'image', 'status'];
    }
}
