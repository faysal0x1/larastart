<?php

// app/Http/Controllers/Admin/SubjectController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubjectStoreRequest;
use App\Http\Requests\SubjectUpdateRequest;
use App\Repositories\SubjectRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    public function __construct(
        private readonly SubjectRepository $subjectRepository
    ) {}

    /**
     * Display a listing of subjects.
     */
    public function index(Request $request): Response
    {
        $subjects = $this->subjectRepository->paginate($request);

        return Inertia::render('subject/index', [
            'subjects' => $subjects,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new subject.
     */
    public function create(): Response
    {
        return Inertia::render('subject/create');
    }

    /**
     * Store a newly created subject in storage.
     */
    public function store(SubjectStoreRequest $request): RedirectResponse
    {
        try {
            $this->subjectRepository->create($request->validated());

            return success_route('subject.index', 'Subject created successfully.');
        } catch (\Exception $e) {
            return error_route('subject.index', 'Failed to create subject: '.$e->getMessage());
        }
    }

    /**
     * Display the specified subject.
     */
    public function show(int $id): Response
    {
        $subject = $this->subjectRepository->find($id);

        if (! $subject) {
            error_response('Subject not found', 404);
        }

        return Inertia::render('subject/show', [
            'subject' => $subject,
        ]);
    }

    /**
     * Show the form for editing the specified subject.
     */
    public function edit(int $id): Response
    {
        $subject = $this->subjectRepository->find($id);

        if (! $subject) {
            error_response('Subject not found', 404);
        }

        return Inertia::render('subject/edit', [
            'subject' => $subject,
        ]);
    }

    /**
     * Update the specified subject in storage.
     */
    public function update(SubjectUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->subjectRepository->update($request->validated(), $id);

            return success_route('subject.index', 'Subject updated successfully.');

        } catch (\Exception $e) {
            return error_route('subject.index', 'Failed to update subject: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified subject from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->subjectRepository->delete($id);

            return success_route('subject.index', 'Subject deleted successfully.');
        } catch (\Exception $e) {
            return error_route('subject.index', 'Failed to delete subject: '.$e->getMessage());
        }
    }
}
