<?php

// app/Http/Controllers/Admin/WishlistController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\WishlistStoreRequest;
use App\Http\Requests\WishlistUpdateRequest;
use App\Repositories\WishlistRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function __construct(
        private readonly WishlistRepository $wishlistRepository
    ) {}

    /**
     * Display a listing of wishlists.
     */
    public function index(Request $request): Response
    {
        $wishlists = $this->wishlistRepository->paginate($request);

        return Inertia::render('wishlist/index', [
            'wishlists' => $wishlists,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new wishlist.
     */
    public function create(): Response
    {
        return Inertia::render('wishlist/create');
    }

    /**
     * Store a newly created wishlist in storage.
     */
    public function store(WishlistStoreRequest $request): RedirectResponse
    {
        try {
            $this->wishlistRepository->create($request->validated());

            return success_route('wishlist.index', 'Wishlist created successfully.');
        } catch (\Exception $e) {
            return error_route('wishlist.index', 'Failed to create wishlist: '.$e->getMessage());
        }
    }

    /**
     * Display the specified wishlist.
     */
    public function show(int $id): Response
    {
        $wishlist = $this->wishlistRepository->find($id);

        if (! $wishlist) {
            error_response('Wishlist not found', 404);
        }

        return Inertia::render('wishlist/show', [
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Show the form for editing the specified wishlist.
     */
    public function edit(int $id): Response
    {
        $wishlist = $this->wishlistRepository->find($id);

        if (! $wishlist) {
            error_response('Wishlist not found', 404);
        }

        return Inertia::render('wishlist/edit', [
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Update the specified wishlist in storage.
     */
    public function update(WishlistUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->wishlistRepository->update($request->validated(), $id);

            return success_route('wishlist.index', 'Wishlist updated successfully.');

        } catch (\Exception $e) {
            return error_route('wishlist.index', 'Failed to update wishlist: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified wishlist from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->wishlistRepository->delete($id);

            return success_route('wishlist.index', 'Wishlist deleted successfully.');
        } catch (\Exception $e) {
            return error_route('wishlist.index', 'Failed to delete wishlist: '.$e->getMessage());
        }
    }
}
