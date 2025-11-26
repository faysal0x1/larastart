<?php

// app/Repositories/BusinessInfoRepository.php

namespace App\Repositories;

use App\Models\BusinessInfo;

class BusinessInfoRepository extends BaseRepository
{
    public function __construct(BusinessInfo $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['content', 'type'];
    }
}
