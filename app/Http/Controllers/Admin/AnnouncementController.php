<?php

// app/Http/Controllers/Admin/AnnouncementController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\AnnouncementStoreRequest;
use App\Http\Requests\AnnouncementUpdateRequest;
use App\Repositories\AnnouncementRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function __construct(
        private readonly AnnouncementRepository $announcementRepository
    ) {}

    /**
     * Display a listing of announcements.
     */
    public function index(Request $request): Response
    {
        $announcements = $this->announcementRepository->paginate($request);

        return Inertia::render('announcement/index', [
            'announcements' => $announcements,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new announcement.
     */
    public function create(): Response
    {
        return Inertia::render('announcement/create');
    }

    /**
     * Store a newly created announcement in storage.
     */
    public function store(AnnouncementStoreRequest $request): RedirectResponse
    {
        try {
            $this->announcementRepository->create($request->validated());

            return success_route('announcement.index', 'Announcement created successfully.');
        } catch (\Exception $e) {
            return error_route('announcement.index', 'Failed to create announcement: '.$e->getMessage());
        }
    }

    /**
     * Display the specified announcement.
     */
    public function show(int $id): Response
    {
        $announcement = $this->announcementRepository->find($id);

        if (! $announcement) {
            error_response('Announcement not found', 404);
        }

        return Inertia::render('announcement/show', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Show the form for editing the specified announcement.
     */
    public function edit(int $id): Response
    {
        $announcement = $this->announcementRepository->find($id);

        if (! $announcement) {
            error_response('Announcement not found', 404);
        }

        return Inertia::render('announcement/edit', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Update the specified announcement in storage.
     */
    public function update(AnnouncementUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->announcementRepository->update($request->validated(), $id);

            return success_route('announcement.index', 'Announcement updated successfully.');

        } catch (\Exception $e) {
            return error_route('announcement.index', 'Failed to update announcement: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified announcement from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->announcementRepository->delete($id);

            return success_route('announcement.index', 'Announcement deleted successfully.');
        } catch (\Exception $e) {
            return error_route('announcement.index', 'Failed to delete announcement: '.$e->getMessage());
        }
    }
}
