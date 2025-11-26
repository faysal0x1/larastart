<?php

// app/Http/Controllers/Admin/ThemeController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ThemeStoreRequest;
use App\Http\Requests\ThemeUpdateRequest;
use App\Repositories\ThemeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ThemeController extends Controller
{
    public function __construct(
        private readonly ThemeRepository $themeRepository
    ) {}

    /**
     * Display a listing of themes.
     */
    public function index(Request $request): Response
    {
        $themes = $this->themeRepository->paginate($request);

        return Inertia::render('theme/index', [
            'themes' => $themes,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new theme.
     */
    public function create(): Response
    {
        return Inertia::render('theme/create');
    }

    /**
     * Store a newly created theme in storage.
     */
    public function store(ThemeStoreRequest $request): RedirectResponse
    {
        try {
            $this->themeRepository->create($request->validated());

            return success_route('theme.index', 'Theme created successfully.');
        } catch (\Exception $e) {
            return error_route('theme.index', 'Failed to create theme: '.$e->getMessage());
        }
    }

    /**
     * Display the specified theme.
     */
    public function show(int $id): Response
    {
        $theme = $this->themeRepository->find($id);

        if (! $theme) {
            error_response('Theme not found', 404);
        }

        return Inertia::render('theme/show', [
            'theme' => $theme,
        ]);
    }

    /**
     * Show the form for editing the specified theme.
     */
    public function edit(int $id): Response
    {
        $theme = $this->themeRepository->find($id);

        if (! $theme) {
            error_response('Theme not found', 404);
        }

        return Inertia::render('theme/edit', [
            'theme' => $theme,
        ]);
    }

    /**
     * Update the specified theme in storage.
     */
    public function update(ThemeUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->themeRepository->update($request->validated(), $id);

            return success_route('theme.index', 'Theme updated successfully.');

        } catch (\Exception $e) {
            return error_route('theme.index', 'Failed to update theme: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified theme from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->themeRepository->delete($id);

            return success_route('theme.index', 'Theme deleted successfully.');
        } catch (\Exception $e) {
            return error_route('theme.index', 'Failed to delete theme: '.$e->getMessage());
        }
    }
}
