<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
	public function index()
	{
		$conversations = auth()->user()->conversations()
			->with(['latestMessage', 'participants' => function($query) {
				$query->where('user_id', '!=', auth()->id());
			}])
			->orderByDesc(
				Message::select('created_at')
					->whereColumn('conversation_id', 'conversations.id')
					->latest()
					->take(1)
			)
			->get();

		$users = User::where('id', '!=', auth()->id())->get();

		return Inertia::render('Chat/Index', [
			'conversations' => $conversations,
			'users' => $users
		]);
	}

	public function show(Conversation $conversation)
	{
//      $this->authorize('view', $conversation);

		$conversation->load(['messages.user', 'participants']);

		// Mark messages as read
		$conversation->markAsReadForUser(auth()->id());

		$allConversations = auth()->user()->conversations()
			->with(['latestMessage', 'participants' => function($query) {
				$query->where('user_id', '!=', auth()->id());
			}])
			->orderByDesc(
				Message::select('created_at')
					->whereColumn('conversation_id', 'conversations.id')
					->take(1)
			)
			->get();
		$users = User::where('id', '!=', auth()->id())->get();
		return Inertia::render('Chat/Show', [
			'conversation' => $conversation,
			'allConversations' => $allConversations,
			'users' => $users,
			'messages' => $conversation->messages()->with('user')->latest()->paginate(20)
		]);
	}

	public function storeMessage(Conversation $conversation, Request $request)
	{
//      $this->authorize('view', $conversation);

		$request->validate([
			'body' => 'required|string'
		]);

		$message = $conversation->messages()->create([
			'user_id' => auth()->id(),
			'body' => $request->body
		]);

		// Load the user relationship for the broadcast
		$message->load('user');

		// Broadcast the message
		broadcast(new NewMessage($message))->toOthers();

		// Return the created message for immediate UI update

		return back();
//		return response()->json(['message' => $message]);
	}

	public function startConversation(Request $request)
	{
		$request->validate([
			'user_id' => 'required|exists:users,id'
		]);

		$user = User::find($request->user_id);
		$authUser = auth()->user();

		// Check if conversation already exists
		$existingConversation = $authUser->conversations()
			->whereHas('participants', function($query) use ($user) {
				$query->where('user_id', $user->id);
			})
			->where('is_group', false)
			->first();

		if ($existingConversation) {
			return redirect()->route('chat.show', $existingConversation);
		}

		// Create new conversation
		$conversation = Conversation::create([
			'is_group' => false,
			'creator_id' => $authUser->id
		]);

		$conversation->participants()->attach([$authUser->id, $user->id]);

		return redirect()->route('chat.show', $conversation);
	}

	public function createGroup(Request $request)
	{
		$request->validate([
			'title' => 'required|string|max:255',
			'user_ids' => 'required|array',
			'user_ids.*' => 'exists:users,id'
		]);

		$conversation = Conversation::create([
			'title' => $request->title,
			'is_group' => true,
			'creator_id' => auth()->id()
		]);

		$participants = array_merge($request->user_ids, [auth()->id()]);
		$conversation->participants()->attach($participants);

		return redirect()->route('chat.show', $conversation);
	}
}