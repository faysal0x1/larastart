<?php

// app/Http/Controllers/Admin/SliderController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\SliderStoreRequest;
use App\Http\Requests\SliderUpdateRequest;
use App\Repositories\SliderRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SliderController extends Controller
{
    public function __construct(
        private readonly SliderRepository $sliderRepository
    ) {}

    /**
     * Display a listing of sliders.
     */
    public function index(Request $request): Response
    {
        $sliders = $this->sliderRepository->paginate($request);

        return Inertia::render('slider/index', [
            'sliders' => $sliders,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new slider.
     */
    public function create(): Response
    {
        return Inertia::render('slider/create');
    }

    /**
     * Store a newly created slider in storage.
     */
    public function store(SliderStoreRequest $request): RedirectResponse
    {
        try {
            $this->sliderRepository->create($request->validated());

            return success_route('slider.index', 'Slider created successfully.');
        } catch (\Exception $e) {
            return error_route('slider.index', 'Failed to create slider: '.$e->getMessage());
        }
    }

    /**
     * Display the specified slider.
     */
    public function show(int $id): Response
    {
        $slider = $this->sliderRepository->find($id);

        if (! $slider) {
            error_response('Slider not found', 404);
        }

        return Inertia::render('slider/show', [
            'slider' => $slider,
        ]);
    }

    /**
     * Show the form for editing the specified slider.
     */
    public function edit(int $id): Response
    {
        $slider = $this->sliderRepository->find($id);

        if (! $slider) {
            error_response('Slider not found', 404);
        }

        return Inertia::render('slider/edit', [
            'slider' => $slider,
        ]);
    }

    /**
     * Update the specified slider in storage.
     */
    public function update(SliderUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->sliderRepository->update($request->validated(), $id);

            return success_route('slider.index', 'Slider updated successfully.');

        } catch (\Exception $e) {
            return error_route('slider.index', 'Failed to update slider: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified slider from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->sliderRepository->delete($id);

            return success_route('slider.index', 'Slider deleted successfully.');
        } catch (\Exception $e) {
            return error_route('slider.index', 'Failed to delete slider: '.$e->getMessage());
        }
    }
}
