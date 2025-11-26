<?php

// app/Repositories/SubCategoryRepository.php

namespace App\Repositories;

use App\Helpers\QueryBuilderHelper;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class SubCategoryRepository extends BaseRepository
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    public function paginate(Request $request, array $columns = ['*']): LengthAwarePaginator
    {
        $params          = $request->isMethod('post') ? $request->all() : $request->query();
        $combinedRequest = new Request($params);

        // Child categories are categories at level 2 (parent is a sub-category)
        $query = $this->model
            ->whereNotNull('parent_id')
            ->where('level', 1)
        // ->whereHas('children')
            ->with(['parent', 'children'])
            ->orderBy('parent_id', 'asc');

        $query = QueryBuilderHelper::apply(
            $combinedRequest,
            $query,
            $this->getSearchableFields(),
            $this->getSortableFields()
        );

        $paginator = QueryBuilderHelper::paginate($combinedRequest, $query);

        // Shape data for frontend: expose parent as sub_categories array
        $paginator->getCollection()->transform(function (Category $category) {
            $category->setAttribute('sub_categories', $category->parent ? [$category->parent] : []);
            return $category;
        });

        return $paginator;
    }

    public function create(array $data): Category
    {
        return DB::transaction(function () use ($data) {
            // Derive parent (sub-category) from provided sub_category_id
            $subCategoryId = $data['category_id'] ?? null;

            // Compute hierarchy like CategoryRepository
            $level = 0;
            $path  = '';
            if ($subCategoryId) {
                $parent = $this->model->find($subCategoryId);
                if ($parent) {
                    $level = ($parent->level ?? 0) + 1;
                    $path  = $parent->path ? $parent->path . '/' . $subCategoryId : (string) $subCategoryId;
                }
            }

            $data['parent_id'] = $subCategoryId;
            $data['level']     = $level;
            $data['path']      = $path;

            // Remove file fields from data before creating and handle via media library
            $fileFields = ['image', 'banner', 'meta_image'];
            $fileData   = [];
            foreach ($fileFields as $field) {
                if (isset($data[$field])) {
                    $fileData[$field] = $data[$field];
                    unset($data[$field]);
                }
            }

            $category = $this->model->create($data);

            foreach ($fileData as $field => $file) {
                if ($file) {
                    $category->addMediaFromRequest($field)->toMediaCollection($field);
                }
            }

            // Attach shaped field for frontend
            $category->setAttribute('sub_categories', $category->parent ? [$category->parent] : []);

            return $category;
        });
    }

    public function update(array $data, int $id): Category
    {
        return DB::transaction(function () use ($data, $id) {
            $category = $this->find($id);

            // Derive parent (sub-category) from provided sub_category_id
            if (array_key_exists('category_id', $data)) {
                $data['parent_id'] = $data['category_id'];
                unset($data['category_id']);
            }

            $parentId = $data['parent_id'] ?? $category->parent_id;

            // Compute hierarchy like CategoryRepository
            $level = 0;
            $path  = '';
            if ($parentId) {
                $parent = $this->model->find($parentId);
                if ($parent) {
                    $level = ($parent->level ?? 0) + 1;
                    $path  = $parent->path ? $parent->path . '/' . $parentId : (string) $parentId;
                }
            }

            $data['level'] = $level;
            $data['path']  = $path;

            $category->update($data);

            // Shape for frontend
            $category->setAttribute('sub_categories', $category->parent ? [$category->parent] : []);

            return $category;
        });
    }

    public function withRelation(array $relations, int $id): ?Category
    {
        $category = $this->model->with(array_merge($relations, ['parent']))->find($id);
        if ($category) {
            $category->setAttribute('sub_categories', $category->parent ? [$category->parent] : []);
        }
        return $category;
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'priority', 'status'];
    }

    /**
     * Delete multiple child categories by IDs.
     */
    public function batchDelete(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }
}