<?php

// app/Http/Controllers/Admin/OrderController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Repositories\OrderRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderRepository $orderRepository
    ) {}

    /**
     * Display a listing of orders.
     */
    public function index(Request $request): Response
    {
        $orders = $this->orderRepository->paginate($request);

        return Inertia::render('order/index', [
            'orders' => $orders,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(): Response
    {
        return Inertia::render('order/create');
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(OrderStoreRequest $request): RedirectResponse
    {
        try {
            $this->orderRepository->create($request->validated());

            return success_route('order.index', 'Order created successfully.');
        } catch (\Exception $e) {
            return error_route('order.index', 'Failed to create order: '.$e->getMessage());
        }
    }

    /**
     * Display the specified order.
     */
    public function show(int $id): Response
    {
        $order = $this->orderRepository->find($id);

        if (! $order) {
            error_response('Order not found', 404);
        }

        return Inertia::render('order/show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified order.
     */
    public function edit(int $id): Response
    {
        $order = $this->orderRepository->find($id);

        if (! $order) {
            error_response('Order not found', 404);
        }

        return Inertia::render('order/edit', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified order in storage.
     */
    public function update(OrderUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->orderRepository->update($request->validated(), $id);

            return success_route('order.index', 'Order updated successfully.');

        } catch (\Exception $e) {
            return error_route('order.index', 'Failed to update order: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->orderRepository->delete($id);

            return success_route('order.index', 'Order deleted successfully.');
        } catch (\Exception $e) {
            return error_route('order.index', 'Failed to delete order: '.$e->getMessage());
        }
    }
}
