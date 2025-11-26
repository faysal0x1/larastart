<?php

// app/Repositories/SubjectRepository.php

namespace App\Repositories;

use App\Models\Subject;

class SubjectRepository extends BaseRepository
{
    public function __construct(Subject $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['description'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'description', 'image', 'color', 'sort_order', 'status'];
    }
}
