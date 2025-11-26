<?php

// app/Http/Controllers/Admin/ColorAttributeController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ColorAttributeStoreRequest;
use App\Http\Requests\ColorAttributeUpdateRequest;
use App\Repositories\ColorAttributeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ColorAttributeController extends Controller
{
    public function __construct(
        private readonly ColorAttributeRepository $colorattributeRepository
    ) {}

    /**
     * Display a listing of colorattributes.
     */
    public function index(Request $request): Response
    {
        $colorattributes = $this->colorattributeRepository->paginate($request);

        return Inertia::render('colorattribute/index', [
            'colorattributes' => $colorattributes,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new colorattribute.
     */
    public function create(): Response
    {
        return Inertia::render('colorattribute/create');
    }

    /**
     * Store a newly created colorattribute in storage.
     */
    public function store(ColorAttributeStoreRequest $request): RedirectResponse
    {
        try {
            $this->colorattributeRepository->create($request->validated());

            return success_route('colorattribute.index', 'ColorAttribute created successfully.');
        } catch (\Exception $e) {
            return error_route('colorattribute.index', 'Failed to create colorattribute: '.$e->getMessage());
        }
    }

    /**
     * Display the specified colorattribute.
     */
    public function show(int $id): Response
    {
        $colorattribute = $this->colorattributeRepository->find($id);

        if (! $colorattribute) {
            error_response('ColorAttribute not found', 404);
        }

        return Inertia::render('colorattribute/show', [
            'colorattribute' => $colorattribute,
        ]);
    }

    /**
     * Show the form for editing the specified colorattribute.
     */
    public function edit(int $id): Response
    {
        $colorattribute = $this->colorattributeRepository->find($id);

        if (! $colorattribute) {
            error_response('ColorAttribute not found', 404);
        }

        return Inertia::render('colorattribute/edit', [
            'colorattribute' => $colorattribute,
        ]);
    }

    /**
     * Update the specified colorattribute in storage.
     */
    public function update(ColorAttributeUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->colorattributeRepository->update($request->validated(), $id);

            return success_route('colorattribute.index', 'ColorAttribute updated successfully.');

        } catch (\Exception $e) {
            return error_route('colorattribute.index', 'Failed to update colorattribute: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified colorattribute from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->colorattributeRepository->delete($id);

            return success_route('colorattribute.index', 'ColorAttribute deleted successfully.');
        } catch (\Exception $e) {
            return error_route('colorattribute.index', 'Failed to delete colorattribute: '.$e->getMessage());
        }
    }
}
