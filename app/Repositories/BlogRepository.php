<?php
// app/Repositories/BlogRepository.php

namespace App\Repositories;

use App\Models\Blog;
use App\Repositories\Interfaces\BlogRepositoryInterface;

class BlogRepository extends BaseRepository implements BlogRepositoryInterface
{
    public function __construct(Blog $model)
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