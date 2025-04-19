<?php

namespace App\Http\Controllers;

use App\Helpers\QueryBuilderHelper;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
	public function index(Request $request) {
		// Combine request methods to handle both GET and POST
		$query = Post::with('tags');

		$params = $request->isMethod('post') ? $request->all() : $request->query();

		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $query, ['title', 'body'], ['title', 'created_at']);
		$posts = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('posts/index', [
			'posts' => $posts,
			'filters' => QueryBuilderHelper::filters($combinedRequest),
		]);
	}

	public function create() {
		return Inertia::render('posts/create', [
			'tags' => Tag::select('id', 'name')->get(),
		]);
	}

	public function store(Request $request) {
		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'body' => 'required|string',
			'tags' => 'array', // optional: tag IDs
		]);

		$post = Post::create([
			'title' => $validated['title'],
			'body' => $validated['body'],
		]);

		if (!empty($validated['tags'])) {
			$post->tags()->attach($validated['tags']);
		}

		return redirect()->route('posts.index')->with('success', 'Post created!');
	}
}
