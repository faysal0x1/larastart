<?php

// app/Http/Controllers/Admin/CompareController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\CompareStoreRequest;
use App\Http\Requests\CompareUpdateRequest;
use App\Repositories\CompareRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompareController extends Controller
{
    public function __construct(
        private readonly CompareRepository $compareRepository
    ) {}

    /**
     * Display a listing of compares.
     */
    public function index(Request $request): Response
    {
        $compares = $this->compareRepository->paginate($request);

        return Inertia::render('compare/index', [
            'compares' => $compares,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new compare.
     */
    public function create(): Response
    {
        return Inertia::render('compare/create');
    }

    /**
     * Store a newly created compare in storage.
     */
    public function store(CompareStoreRequest $request): RedirectResponse
    {
        try {
            $this->compareRepository->create($request->validated());

            return success_route('compare.index', 'Compare created successfully.');
        } catch (\Exception $e) {
            return error_route('compare.index', 'Failed to create compare: '.$e->getMessage());
        }
    }

    /**
     * Display the specified compare.
     */
    public function show(int $id): Response
    {
        $compare = $this->compareRepository->find($id);

        if (! $compare) {
            error_response('Compare not found', 404);
        }

        return Inertia::render('compare/show', [
            'compare' => $compare,
        ]);
    }

    /**
     * Show the form for editing the specified compare.
     */
    public function edit(int $id): Response
    {
        $compare = $this->compareRepository->find($id);

        if (! $compare) {
            error_response('Compare not found', 404);
        }

        return Inertia::render('compare/edit', [
            'compare' => $compare,
        ]);
    }

    /**
     * Update the specified compare in storage.
     */
    public function update(CompareUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->compareRepository->update($request->validated(), $id);

            return success_route('compare.index', 'Compare updated successfully.');

        } catch (\Exception $e) {
            return error_route('compare.index', 'Failed to update compare: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified compare from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->compareRepository->delete($id);

            return success_route('compare.index', 'Compare deleted successfully.');
        } catch (\Exception $e) {
            return error_route('compare.index', 'Failed to delete compare: '.$e->getMessage());
        }
    }
}
