<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository extends BaseRepository
{
    public function __construct(Post $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['body'];
    }

    protected function getSortableFields(): array
    {
        return ['title', 'body', 'user_id', 'published_at'];
    }
}
