<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface RepositoryInterface
{
    public function all(array $columns = ['*']): array;

    public function paginate(Request $request, array $columns = ['*']): LengthAwarePaginator;

    public function create(array $data): Model;

    public function update(array $data, int $id): Model;

    public function delete(int $id): bool;

    public function find(int $id, array $columns = ['*']): ?Model;

    public function findBy(string $field, $value, array $columns = ['*']): ?Model;

    public function query(): Builder;
}
