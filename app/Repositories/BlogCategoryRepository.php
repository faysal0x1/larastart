<?php
// app/Repositories/BlogCategoryRepository.php

namespace App\Repositories;

use App\Models\BlogCategory;
use App\Repositories\Interfaces\BlogCategoryRepositoryInterface;

class BlogCategoryRepository extends BaseRepository implements BlogCategoryRepositoryInterface
{
    public function __construct(BlogCategory $model)
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