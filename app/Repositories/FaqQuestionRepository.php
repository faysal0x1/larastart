<?php

namespace App\Repositories;

use App\Models\FaqQuestion;

class FaqQuestionRepository extends BaseRepository
{
    public function __construct(FaqQuestion $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['answer'];
    }

    protected function getSortableFields(): array
    {
        return ['question', 'answer', 'status', 'ranking'];
    }
}
