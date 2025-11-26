<?php
namespace App\Repositories;

use App\Helpers\QueryBuilderHelper;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class CategoryRepository extends BaseRepository
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
        $query = $this->model->whereNull('parent_id')
            ->withCount('children');

        $query = QueryBuilderHelper::apply(
            $combinedRequest,
            $query,
            $this->getSearchableFields(),
            $this->getSortableFields()
        );

        $paginator = QueryBuilderHelper::paginate($combinedRequest, $query);

        // Get all category IDs in the current page
        $categoryIds = $paginator->getCollection()->pluck('id')->toArray();

        // Pre-calculate all descendants counts in a single batch
        $descendantsCounts = [];
        foreach ($categoryIds as $categoryId) {
            $descendantsCounts[$categoryId] = $this->getDescendantsCount($categoryId);
        }

        // Shape data for frontend: expose parent as sub_categories array and add counts
        $paginator->getCollection()->transform(function (Category $category) use ($descendantsCounts) {
            $category->setAttribute('sub_categories', $category->parent ? [$category->parent] : []);

            // Sub categories count = direct children count
            $subCategoriesCount = $category->children_count ?? 0;
            $category->setAttribute('sub_categories_count', $subCategoriesCount);

            // Child categories count = total descendants count (all nested children)
            $childCategoriesCount = $descendantsCounts[$category->id] ?? 0;
            $category->setAttribute('child_categories_count', $childCategoriesCount);

            return $category;
        });

        return $paginator;
    }

    protected function getSearchableFields(): array
    {
        return ['name', 'created_at'];
    }

    protected function getSortableFields(): array
    {
        return ['name', 'slug', 'priority', 'status', 'image'];
    }

    /**
     * Delete multiple categories by their IDs.
     */
    public function batchDelete(array $ids): int
    {
        return $this->model->whereIn('id', $ids)->delete();
    }

    /**
     * Get all root categories (categories with no parent).
     */
    public function getRootCategories()
    {
        return $this->model->whereNull('parent_id')
            ->with(['children', 'children.children'])
            ->orderBy('name')
            ->get();
    }

    /**
     * Get children of a specific category.
     */
    public function getChildren(int $parentId)
    {
        return $this->model->where('parent_id', $parentId)
            ->with(['children'])
            ->orderBy('name')
            ->get();
    }

    /**
     * Get available parent categories for a given category (excluding self and descendants).
     */
    public function getAvailableParents(int $excludeId)
    {
        // Get the category and its descendants to exclude
        $category   = $this->model->find($excludeId);
        $excludeIds = [$excludeId];

        if ($category) {
            // Get all descendants
            $descendants = $this->getDescendants($excludeId);
            $excludeIds  = array_merge($excludeIds, $descendants->pluck('id')->toArray());
        }

        return $this->model->whereNotIn('id', $excludeIds)
            ->with(['children', 'children.children'])
            ->orderBy('name')
            ->get();
    }

    /**
     * Get all descendants of a category.
     */
    public function getDescendants(int $parentId)
    {
        $descendants = collect();
        $children    = $this->model->where('parent_id', $parentId)->get();

        foreach ($children as $child) {
            $descendants->push($child);
            $descendants = $descendants->merge($this->getDescendants($child->id));
        }

        return $descendants;
    }

    /**
     * Get the count of all descendants of a category.
     */
    public function getDescendantsCount(int $parentId): int
    {
        $count = 0;
        $children = $this->model->where('parent_id', $parentId)->get();

        foreach ($children as $child) {
            $count++; // Count the direct child
            $count += $this->getDescendantsCount($child->id); // Recursively count descendants
        }

        return $count;
    }

    /**
     * Get the full category hierarchy.
     */
    public function getHierarchy()
    {
        return $this->model->with(['children', 'children.children'])
            ->whereNull('parent_id')
            ->orderBy('name')
            ->get();
    }

    /**
     * Create a category with proper hierarchy setup.
     */
    public function createWithHierarchy(array $data)
    {

//        $parentId = $data['parent_id'] ?? null;
        $level    = 0;
        $path     = '';

//        if ($parentId) {
//            $parent = $this->model->find($parentId);
//            if ($parent) {
//                $level = $parent->level + 1;
//                $path  = $parent->path ? $parent->path . '/' . $parentId : (string) $parentId;
//            }
//        }

        $data['level'] = $level;
        $data['path']  = $path;
//        $data['slug']  = \Illuminate\Support\Str::slug($data['name']);


        try {
            // Remove file fields from data before creating
            $fileFields = ['image', 'banner', 'meta_image'];
            $fileData   = [];
            foreach ($fileFields as $field) {
                if (isset($data[$field])) {
                    $fileData[$field] = $data[$field];
                    unset($data[$field]);
                }
            }

            $category = $this->model->create($data);

            // Handle file uploads using Spatie Media Library
            foreach ($fileData as $field => $file) {
                if ($file) {
                    $category->addMediaFromRequest($field)
                        ->toMediaCollection($field);
                }
            }

            return $category;
        } catch (\Exception $e) {
            Log::error('Failed to create category in repository:', [
                'error' => $e->getMessage(),
                'data'  => $data,
            ]);
            throw $e;
        }
    }

    /**
     * Update a category and maintain hierarchy.
     */
    public function updateWithHierarchy(array $data, int $id)
    {
        $category = $this->model->find($id);
        if (! $category) {
            return null;
        }

        $parentId = $data['parent_id'] ?? $category->parent_id;
        $level    = 0;
        $path     = '';

//        if ($parentId) {
//            $parent = $this->model->find($parentId);
//            if ($parent) {
//                $level = $parent->level + 1;
//                $path  = $parent->path ? $parent->path . '/' . $parentId : (string) $parentId;
//            }
//        }

        $data['level'] = $level;
        $data['path']  = $path;
        $data['slug']  = \Illuminate\Support\Str::slug($data['name']);

        $category->update($data);

        // Update descendants' levels and paths
        $this->updateDescendantsHierarchy($id);

        return $category;
    }

    /**
     * Update hierarchy for all descendants.
     */
    private function updateDescendantsHierarchy(int $parentId)
    {
        $children = $this->model->where('parent_id', $parentId)->get();

        foreach ($children as $child) {
            $parent = $this->model->find($parentId);
            $level  = $parent ? $parent->level + 1 : 0;
            $path   = $parent ? ($parent->path ? $parent->path . '/' . $parentId : (string) $parentId) : '';

            $child->update([
                'level' => $level,
                'path'  => $path,
            ]);

            // Recursively update children
            $this->updateDescendantsHierarchy($child->id);
        }
    }
}