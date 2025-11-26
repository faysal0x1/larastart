<?php

// app/Repositories/Interfaces/CategoryRepositoryInterface.php

namespace App\Repositories\Interfaces;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Delete multiple categories by their IDs.
     */
    public function batchDelete(array $ids): int;
}
