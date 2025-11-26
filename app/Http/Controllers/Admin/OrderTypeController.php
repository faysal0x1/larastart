<?php

// app/Http/Controllers/Admin/OrderTypeController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderTypeStoreRequest;
use App\Http\Requests\OrderTypeUpdateRequest;
use App\Repositories\OrderTypeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderTypeController extends Controller
{
    public function __construct(
        private readonly OrderTypeRepository $ordertypeRepository
    ) {}

    /**
     * Display a listing of ordertypes.
     */
    public function index(Request $request): Response
    {
        $ordertypes = $this->ordertypeRepository->paginate($request);

        return Inertia::render('ordertype/index', [
            'ordertypes' => $ordertypes,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new ordertype.
     */
    public function create(): Response
    {
        return Inertia::render('ordertype/create');
    }

    /**
     * Store a newly created ordertype in storage.
     */
    public function store(OrderTypeStoreRequest $request): RedirectResponse
    {
        try {
            $this->ordertypeRepository->create($request->validated());

            return success_route('ordertype.index', 'OrderType created successfully.');
        } catch (\Exception $e) {
            return error_route('ordertype.index', 'Failed to create ordertype: '.$e->getMessage());
        }
    }

    /**
     * Display the specified ordertype.
     */
    public function show(int $id): Response
    {
        $ordertype = $this->ordertypeRepository->find($id);

        if (! $ordertype) {
            error_response('OrderType not found', 404);
        }

        return Inertia::render('ordertype/show', [
            'ordertype' => $ordertype,
        ]);
    }

    /**
     * Show the form for editing the specified ordertype.
     */
    public function edit(int $id): Response
    {
        $ordertype = $this->ordertypeRepository->find($id);

        if (! $ordertype) {
            error_response('OrderType not found', 404);
        }

        return Inertia::render('ordertype/edit', [
            'ordertype' => $ordertype,
        ]);
    }

    /**
     * Update the specified ordertype in storage.
     */
    public function update(OrderTypeUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->ordertypeRepository->update($request->validated(), $id);

            return success_route('ordertype.index', 'OrderType updated successfully.');

        } catch (\Exception $e) {
            return error_route('ordertype.index', 'Failed to update ordertype: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified ordertype from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->ordertypeRepository->delete($id);

            return success_route('ordertype.index', 'OrderType deleted successfully.');
        } catch (\Exception $e) {
            return error_route('ordertype.index', 'Failed to delete ordertype: '.$e->getMessage());
        }
    }
}
