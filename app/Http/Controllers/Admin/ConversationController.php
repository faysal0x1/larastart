<?php

// app/Http/Controllers/Admin/ConversationController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ConversationStoreRequest;
use App\Http\Requests\ConversationUpdateRequest;
use App\Repositories\ConversationRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConversationController extends Controller
{
    public function __construct(
        private readonly ConversationRepository $conversationRepository
    ) {}

    /**
     * Display a listing of conversations.
     */
    public function index(Request $request): Response
    {
        $conversations = $this->conversationRepository->paginate($request);

        return Inertia::render('conversation/index', [
            'conversations' => $conversations,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new conversation.
     */
    public function create(): Response
    {
        return Inertia::render('conversation/create');
    }

    /**
     * Store a newly created conversation in storage.
     */
    public function store(ConversationStoreRequest $request): RedirectResponse
    {
        try {
            $this->conversationRepository->create($request->validated());

            return success_route('conversation.index', 'Conversation created successfully.');
        } catch (\Exception $e) {
            return error_route('conversation.index', 'Failed to create conversation: '.$e->getMessage());
        }
    }

    /**
     * Display the specified conversation.
     */
    public function show(int $id): Response
    {
        $conversation = $this->conversationRepository->find($id);

        if (! $conversation) {
            error_response('Conversation not found', 404);
        }

        return Inertia::render('conversation/show', [
            'conversation' => $conversation,
        ]);
    }

    /**
     * Show the form for editing the specified conversation.
     */
    public function edit(int $id): Response
    {
        $conversation = $this->conversationRepository->find($id);

        if (! $conversation) {
            error_response('Conversation not found', 404);
        }

        return Inertia::render('conversation/edit', [
            'conversation' => $conversation,
        ]);
    }

    /**
     * Update the specified conversation in storage.
     */
    public function update(ConversationUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->conversationRepository->update($request->validated(), $id);

            return success_route('conversation.index', 'Conversation updated successfully.');

        } catch (\Exception $e) {
            return error_route('conversation.index', 'Failed to update conversation: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified conversation from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->conversationRepository->delete($id);

            return success_route('conversation.index', 'Conversation deleted successfully.');
        } catch (\Exception $e) {
            return error_route('conversation.index', 'Failed to delete conversation: '.$e->getMessage());
        }
    }
}
