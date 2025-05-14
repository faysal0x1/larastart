<?php
// app/Repositories/TagRepository.php

namespace App\Repositories;

use App\Models\Tag;
use App\Repositories\Interfaces\TagRepositoryInterface;

class TagRepository extends BaseRepository implements TagRepositoryInterface
{
    public function __construct(Tag $model)
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