<?php

// app/Http/Controllers/Admin/BusinessInfoController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessInfoStoreRequest;
use App\Http\Requests\BusinessInfoUpdateRequest;
use App\Repositories\BusinessInfoRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessInfoController extends Controller
{
    public function __construct(
        private readonly BusinessInfoRepository $businessinfoRepository
    ) {}

    /**
     * Display a listing of businessinfos.
     */
    public function index(Request $request): Response
    {
        $businessinfos = $this->businessinfoRepository->paginate($request);

        return Inertia::render('businessinfo/index', [
            'businessinfos' => $businessinfos,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new businessinfo.
     */
    public function create(): Response
    {
        return Inertia::render('businessinfo/create');
    }

    /**
     * Store a newly created businessinfo in storage.
     */
    public function store(BusinessInfoStoreRequest $request): RedirectResponse
    {
        try {
            $this->businessinfoRepository->create($request->validated());

            return success_route('businessinfo.index', 'BusinessInfo created successfully.');
        } catch (\Exception $e) {
            return error_route('businessinfo.index', 'Failed to create businessinfo: '.$e->getMessage());
        }
    }

    /**
     * Display the specified businessinfo.
     */
    public function show(int $id): Response
    {
        $businessinfo = $this->businessinfoRepository->find($id);

        if (! $businessinfo) {
            error_response('BusinessInfo not found', 404);
        }

        return Inertia::render('businessinfo/show', [
            'businessinfo' => $businessinfo,
        ]);
    }

    /**
     * Show the form for editing the specified businessinfo.
     */
    public function edit(int $id): Response
    {
        $businessinfo = $this->businessinfoRepository->find($id);

        if (! $businessinfo) {
            error_response('BusinessInfo not found', 404);
        }

        return Inertia::render('businessinfo/edit', [
            'businessinfo' => $businessinfo,
        ]);
    }

    /**
     * Update the specified businessinfo in storage.
     */
    public function update(BusinessInfoUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->businessinfoRepository->update($request->validated(), $id);

            return success_route('businessinfo.index', 'BusinessInfo updated successfully.');

        } catch (\Exception $e) {
            return error_route('businessinfo.index', 'Failed to update businessinfo: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified businessinfo from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->businessinfoRepository->delete($id);

            return success_route('businessinfo.index', 'BusinessInfo deleted successfully.');
        } catch (\Exception $e) {
            return error_route('businessinfo.index', 'Failed to delete businessinfo: '.$e->getMessage());
        }
    }
}
