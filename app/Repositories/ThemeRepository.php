<?php

// app/Repositories/ThemeRepository.php

namespace App\Repositories;

use App\Models\Theme;

class ThemeRepository extends BaseRepository
{
    public function __construct(Theme $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'description', 'settings', 'is_active'];
    }
}
