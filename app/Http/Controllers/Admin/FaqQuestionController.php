<?php

// app/Http/Controllers/Admin/FaqQuestionController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\FaqQuestionStoreRequest;
use App\Http\Requests\FaqQuestionUpdateRequest;
use App\Repositories\FaqQuestionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqQuestionController extends Controller
{
    public function __construct(
        private readonly FaqQuestionRepository $faqquestionRepository
    ) {}

    /**
     * Display a listing of faqquestions.
     */
    public function index(Request $request): Response
    {
        $faqquestions = $this->faqquestionRepository->paginate($request);

        return Inertia::render('faqquestion/index', [
            'faqquestions' => $faqquestions,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new faqquestion.
     */
    public function create(): Response
    {
        return Inertia::render('faqquestion/create');
    }

    /**
     * Store a newly created faqquestion in storage.
     */
    public function store(FaqQuestionStoreRequest $request): RedirectResponse
    {
        try {
            $this->faqquestionRepository->create($request->validated());

            return success_route('faqquestion.index', 'FaqQuestion created successfully.');
        } catch (\Exception $e) {
            return error_route('faqquestion.index', 'Failed to create faqquestion: '.$e->getMessage());
        }
    }

    /**
     * Display the specified faqquestion.
     */
    public function show(int $id): Response
    {
        $faqquestion = $this->faqquestionRepository->find($id);

        if (! $faqquestion) {
            error_response('FaqQuestion not found', 404);
        }

        return Inertia::render('faqquestion/show', [
            'faqquestion' => $faqquestion,
        ]);
    }

    /**
     * Show the form for editing the specified faqquestion.
     */
    public function edit(int $id): Response
    {
        $faqquestion = $this->faqquestionRepository->find($id);

        if (! $faqquestion) {
            error_response('FaqQuestion not found', 404);
        }

        return Inertia::render('faqquestion/edit', [
            'faqquestion' => $faqquestion,
        ]);
    }

    /**
     * Update the specified faqquestion in storage.
     */
    public function update(FaqQuestionUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->faqquestionRepository->update($request->validated(), $id);

            return success_route('faqquestion.index', 'FaqQuestion updated successfully.');

        } catch (\Exception $e) {
            return error_route('faqquestion.index', 'Failed to update faqquestion: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified faqquestion from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->faqquestionRepository->delete($id);

            return success_route('faqquestion.index', 'FaqQuestion deleted successfully.');
        } catch (\Exception $e) {
            return error_route('faqquestion.index', 'Failed to delete faqquestion: '.$e->getMessage());
        }
    }
}
