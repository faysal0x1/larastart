<?php
namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Repositories\ChildCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ChildControllerController extends Controller
{
    public function __construct(
        private readonly ChildCategoryRepository $childCategoryRepository
    ) {}

    /**
     * Display a listing of child categories.
     */
    public function index(Request $request): Response
    {
        $childCategories = $this->childCategoryRepository->paginate($request);

        return Inertia::render('childcategory/index', [
            'childCategories' => $childCategories,
            'filters'         => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new child category.
     */
    public function create()
    {
        $subCategories = Category::whereNotNull('parent_id')->get();

        return Inertia::render('childcategory/create', [
            'subCategories' => $subCategories,
        ]);
    }

    /**
     * Store a newly created child category in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->all();

            $this->childCategoryRepository->create($validatedData);
            return success_route('child-category.index', 'Child Category created successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to create child category:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data'  => $request->all(),
            ]);

            return error_route('child-category.index', 'Failed to create child category: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified child category.
     */
    public function show(Category $childCategory): Response
    {
        // Load relationships for the child category
        $childCategory->load(['parent', 'children', 'products']);

        return Inertia::render('childcategory/show', [
            'childCategory' => $childCategory,
        ]);
    }

    /**
     * Show the form for editing the specified child category.
     */
    public function edit(Category $childCategory): Response
    {
        $subCategories = Category::whereNotNull('parent_id')->get();
        $childCategory = $this->childCategoryRepository->withRelation(['children'], $childCategory->id);

        return Inertia::render('childcategory/edit', [
            'childCategory' => $childCategory,
            'subCategories' => $subCategories,
        ]);
    }

    /**
     * Update the specified child category in storage.
     */
    public function update(Request $request, Category $childCategory): RedirectResponse
    {
        try {
            $this->childCategoryRepository->update($request->all(), $childCategory->id);

            return success_route('child-category.index', 'Child Category updated successfully.');
        } catch (\Exception $e) {
            return error_route('child-category.index', 'Failed to update child category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified child category from storage.
     */
    public function destroy(Category $childCategory): RedirectResponse
    {
        try {
            $this->childCategoryRepository->delete($childCategory->id);

            return success_route('child-category.index', 'Child Category deleted successfully.');
        } catch (\Exception $e) {
            return error_route('child-category.index', 'Failed to delete child category: ' . $e->getMessage());
        }
    }

    /**
     * Remove multiple child categories from storage.
     */
    public function batchDelete(Request $request): RedirectResponse
    {
        try {
            $ids = $request->input('ids', []);

            if (empty($ids)) {
                return error_route('child-category.index', 'No child categories selected for deletion.');
            }

            // Validate that all IDs are integers
            $validIds = array_filter($ids, function ($id) {
                return is_numeric($id) && (int) $id > 0;
            });

            if (empty($validIds)) {
                return error_route('child-category.index', 'Invalid child category IDs provided.');
            }

            $deletedCount = $this->childCategoryRepository->batchDelete($validIds);

            if ($deletedCount > 0) {
                return success_route('child-category.index', "Successfully deleted {$deletedCount} child categories.");
            } else {
                return error_route('child-category.index', 'No child categories were deleted.');
            }
        } catch (\Exception $e) {
            return error_route('child-category.index', 'Failed to delete child categories: ' . $e->getMessage());
        }
    }
}