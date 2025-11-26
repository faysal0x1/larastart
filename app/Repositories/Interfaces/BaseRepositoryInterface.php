<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepositoryInterface
{
    public function all(array $columns = ['*']): Collection;

    public function paginate(array $filters = [], int $perPage = 15, array $columns = ['*']): LengthAwarePaginator;

    public function create(array $data): array;

    public function find(int $id, array $columns = ['*']): array;

    public function update(int $id, array $data): array;

    public function delete(int $id): bool;

    public function withRelations(array $relations): self;
}
