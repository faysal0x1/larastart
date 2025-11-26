<?php

// app/Http/Controllers/Admin/BannerController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BannerStoreRequest;
use App\Http\Requests\BannerUpdateRequest;
use App\Repositories\BannerRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function __construct(
        private readonly BannerRepository $bannerRepository
    ) {}

    /**
     * Display a listing of banners.
     */
    public function index(Request $request): Response
    {
        $banners = $this->bannerRepository->paginate($request);

        return Inertia::render('banner/index', [
            'banners' => $banners,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new banner.
     */
    public function create(): Response
    {
        return Inertia::render('banner/create');
    }

    /**
     * Store a newly created banner in storage.
     */
    public function store(BannerStoreRequest $request): RedirectResponse
    {
        try {
            $this->bannerRepository->create($request->validated());

            return success_route('banner.index', 'Banner created successfully.');
        } catch (\Exception $e) {
            return error_route('banner.index', 'Failed to create banner: '.$e->getMessage());
        }
    }

    /**
     * Display the specified banner.
     */
    public function show(int $id): Response
    {
        $banner = $this->bannerRepository->find($id);

        if (! $banner) {
            error_response('Banner not found', 404);
        }

        return Inertia::render('banner/show', [
            'banner' => $banner,
        ]);
    }

    /**
     * Show the form for editing the specified banner.
     */
    public function edit(int $id): Response
    {
        $banner = $this->bannerRepository->find($id);

        if (! $banner) {
            error_response('Banner not found', 404);
        }

        return Inertia::render('banner/edit', [
            'banner' => $banner,
        ]);
    }

    /**
     * Update the specified banner in storage.
     */
    public function update(BannerUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->bannerRepository->update($request->validated(), $id);

            return success_route('banner.index', 'Banner updated successfully.');

        } catch (\Exception $e) {
            return error_route('banner.index', 'Failed to update banner: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified banner from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->bannerRepository->delete($id);

            return success_route('banner.index', 'Banner deleted successfully.');
        } catch (\Exception $e) {
            return error_route('banner.index', 'Failed to delete banner: '.$e->getMessage());
        }
    }
}
