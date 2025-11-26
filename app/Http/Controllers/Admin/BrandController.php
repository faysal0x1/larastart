<?php
namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BrandStoreRequest;
use App\Repositories\BrandRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function __construct(
        private readonly BrandRepository $brandRepository
    ) {}

    /**
     * Display a listing of brands.
     */
    public function index(Request $request)
    {
        $brands = $this->brandRepository->paginate($request);
        return Inertia::render('brand/index', [
            'brands'  => $brands,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new brand.
     */
    public function create(): Response
    {
        return Inertia::render('brand/create');
    }

    /**
     * Store a newly created brand in storage.
     */
    public function store(BrandStoreRequest $request): RedirectResponse
    {
        try {
            $this->brandRepository->create($request->validated());

            return success_route('brand.index', 'Brand created successfully.');
        } catch (\Exception $e) {
            return error_route('brand.index', 'Failed to create brand: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified brand.
     */
    public function show(int $id): Response
    {
        $brand = $this->brandRepository->find($id);

        if (! $brand) {
            error_response('Brand not found', 404);
        }

        return Inertia::render('brand/show', [
            'brand' => $brand,
        ]);
    }

    /**
     * Show the form for editing the specified brand.
     */
    public function edit(int $id): Response
    {
        $brand = $this->brandRepository->find($id);

        if (! $brand) {
            error_response('Brand not found', 404);
        }

        return Inertia::render('brand/edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified brand in storage.
     */
    public function update(Request $request, int $id)
    {

//        return $request->all();
        try {

            $this->brandRepository->update($request->all(), $id);

            return success_route('brand.index', 'Brand updated successfully.');

        } catch (\Exception $e) {

            return error_route('brand.index', 'Failed to update brand: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified brand from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->brandRepository->delete($id);

            return success_route('brand.index', 'Brand deleted successfully.');
        } catch (\Exception $e) {
            return error_route('brand.index', 'Failed to delete brand: ' . $e->getMessage());
        }
    }

    /**
     * Remove multiple brands from storage.
     */
    public function batchDelete(Request $request): RedirectResponse
    {
        try {
            $ids = $request->input('ids', []);

            if (empty($ids)) {
                return error_route('brand.index', 'No brands selected for deletion.');
            }

            // Validate that all IDs are integers
            $validIds = array_filter($ids, function ($id) {
                return is_numeric($id) && (int) $id > 0;
            });

            if (empty($validIds)) {
                return error_route('brand.index', 'Invalid brand IDs provided.');
            }

            $deletedCount = $this->brandRepository->batchDelete($validIds);

            if ($deletedCount > 0) {
                return success_route('brand.index', "Successfully deleted {$deletedCount} brands.");
            } else {
                return error_route('brand.index', 'No brands were deleted.');
            }
        } catch (\Exception $e) {
            return error_route('brand.index', 'Failed to delete brands: ' . $e->getMessage());
        }
    }
}