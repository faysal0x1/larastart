<?php

namespace App\Repositories;

use App\Models\Conversation;

class ConversationRepository extends BaseRepository
{
    public function __construct(Conversation $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['title', 'is_group', 'creator_id'];
    }
}
