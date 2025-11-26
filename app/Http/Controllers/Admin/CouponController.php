<?php

// app/Http/Controllers/Admin/CouponController.php

namespace App\Http\Controllers\Admin;

use App\Enums\CouponType;
use App\Enums\DiscountType;
use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\CouponStoreRequest;
use App\Http\Requests\CouponUpdateRequest;
use App\Models\User;
use App\Repositories\CouponRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function __construct(
        private readonly CouponRepository $couponRepository
    ) {
    }

    /**
     * Display a listing of coupons.
     */
    public function index(Request $request): Response {
        $coupons = $this->couponRepository->paginate($request);

        return Inertia::render('coupon/index', [
            'coupons' => $coupons,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new coupon.
     */
    public function create(): Response {
        $user = User::whereStatus(1)->get();

        $discountType = DiscountType::options();
        $couponType = CouponType::options();

        return Inertia::render('coupon/create', [
            'users' => $user,
            'discountType' => $discountType,
            'couponType' => $couponType,
        ]);
    }

    /**
     * Store a newly created coupon in storage.
     */
    public function store(CouponStoreRequest $request): RedirectResponse {
        try {
            $this->couponRepository->create($request->validated());

            return success_route('coupon.index', 'Coupon created successfully.');
        } catch (\Exception $e) {
            return error_route('coupon.index', 'Failed to create coupon: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified coupon.
     */
    public function show(int $id): Response {
        $coupon = $this->couponRepository->find($id);

        if (!$coupon) {
            error_response('Coupon not found', 404);
        }

        return Inertia::render('coupon/show', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Show the form for editing the specified coupon.
     */
    public function edit(int $id): Response {
        $coupon = $this->couponRepository->find($id);

        if (!$coupon) {
            error_response('Coupon not found', 404);
        }

        return Inertia::render('coupon/edit', [
            'coupon' => $coupon,
        ]);
    }

    /**
     * Update the specified coupon in storage.
     */
    public function update(CouponUpdateRequest $request, int $id): RedirectResponse {
        try {
            $this->couponRepository->update($request->validated(), $id);

            return success_route('coupon.index', 'Coupon updated successfully.');

        } catch (\Exception $e) {
            return error_route('coupon.index', 'Failed to update coupon: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified coupon from storage.
     */
    public function destroy(int $id): RedirectResponse {
        try {
            $this->couponRepository->delete($id);

            return success_route('coupon.index', 'Coupon deleted successfully.');
        } catch (\Exception $e) {
            return error_route('coupon.index', 'Failed to delete coupon: ' . $e->getMessage());
        }
    }
}
