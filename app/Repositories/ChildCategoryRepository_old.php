<?php

// app/Repositories/ChildCategoryRepository.php

namespace App\Repositories;

use App\Helpers\QueryBuilderHelper;
use App\Models\ChildCategory;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ChildCategoryRepository_old extends BaseRepository
{
    public function __construct(ChildCategory $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request, array $columns = ['*']): LengthAwarePaginator
    {
        $query           = $this->model->query();
        $params          = $request->isMethod('post') ? $request->all() : $request->query();
        $combinedRequest = new Request($params);

        $query = $this->model->with(['subCategories']);

        $query = QueryBuilderHelper::apply(
            $combinedRequest,
            $query,
            $this->getSearchableFields(),
            $this->getSortableFields()
        );

        return QueryBuilderHelper::paginate($combinedRequest, $query);
    }

    public function create(array $data): ChildCategory
    {
        return DB::transaction(function () use ($data) {
            // Extract sub_category_ids from data
            $subCategoryIds = $data['sub_category_ids'] ?? [];
            unset($data['sub_category_ids']);

            // Create the child category
            $childCategory = $this->model->create($data);

            // Attach sub-categories with priority
            if (! empty($subCategoryIds)) {
                $pivotData = [];
                foreach ($subCategoryIds as $subCategoryId) {
                    $pivotData[$subCategoryId] = [
                        'priority'   => $data['priority'] ?? 0,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $childCategory->subCategories()->attach($pivotData);
            }

            return $childCategory->load('subCategories');
        });
    }

    public function update(array $data, int $id): ChildCategory
    {
        return DB::transaction(function () use ($data, $id) {
            $childCategory = $this->find($id);

            // Extract sub_category_ids from data
            $subCategoryIds = $data['sub_category_ids'] ?? null;
            unset($data['sub_category_ids']);

            // Update the child category
            $childCategory->update($data);

            // Update sub-categories if provided
            if ($subCategoryIds !== null) {
                $pivotData = [];
                foreach ($subCategoryIds as $subCategoryId) {
                    $pivotData[$subCategoryId] = [
                        'priority'   => $data['priority'] ?? 0,
                        'updated_at' => now(),
                    ];
                }
                $childCategory->subCategories()->sync($pivotData);
            }

            return $childCategory->load('subCategories');
        });
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'priority', 'is_active'];
    }

    /**
     * Delete multiple child categories by IDs.
     */
    public function batchDelete(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }
}
