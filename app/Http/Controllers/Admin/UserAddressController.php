<?php

// app/Http/Controllers/Admin/UserAddressController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserAddressStoreRequest;
use App\Http\Requests\UserAddressUpdateRequest;
use App\Repositories\UserAddressRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserAddressController extends Controller
{
    public function __construct(
        private readonly UserAddressRepository $useraddressRepository
    ) {}

    /**
     * Display a listing of useraddresss.
     */
    public function index(Request $request): Response
    {
        $useraddresss = $this->useraddressRepository->paginate($request);

        return Inertia::render('useraddress/index', [
            'useraddresss' => $useraddresss,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new useraddress.
     */
    public function create(): Response
    {
        return Inertia::render('useraddress/create');
    }

    /**
     * Store a newly created useraddress in storage.
     */
    public function store(UserAddressStoreRequest $request): RedirectResponse
    {
        try {
            $this->useraddressRepository->create($request->validated());

            return success_route('useraddress.index', 'UserAddress created successfully.');
        } catch (\Exception $e) {
            return error_route('useraddress.index', 'Failed to create useraddress: '.$e->getMessage());
        }
    }

    /**
     * Display the specified useraddress.
     */
    public function show(int $id): Response
    {
        $useraddress = $this->useraddressRepository->find($id);

        if (! $useraddress) {
            error_response('UserAddress not found', 404);
        }

        return Inertia::render('useraddress/show', [
            'useraddress' => $useraddress,
        ]);
    }

    /**
     * Show the form for editing the specified useraddress.
     */
    public function edit(int $id): Response
    {
        $useraddress = $this->useraddressRepository->find($id);

        if (! $useraddress) {
            error_response('UserAddress not found', 404);
        }

        return Inertia::render('useraddress/edit', [
            'useraddress' => $useraddress,
        ]);
    }

    /**
     * Update the specified useraddress in storage.
     */
    public function update(UserAddressUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->useraddressRepository->update($request->validated(), $id);

            return success_route('useraddress.index', 'UserAddress updated successfully.');

        } catch (\Exception $e) {
            return error_route('useraddress.index', 'Failed to update useraddress: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified useraddress from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->useraddressRepository->delete($id);

            return success_route('useraddress.index', 'UserAddress deleted successfully.');
        } catch (\Exception $e) {
            return error_route('useraddress.index', 'Failed to delete useraddress: '.$e->getMessage());
        }
    }
}
