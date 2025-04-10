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
		$query = Post::with('tags');

		$query = QueryBuilderHelper::apply($request, $query, ['title', 'body'], ['title', 'created_at']);
		$posts = QueryBuilderHelper::paginate($request, $query);

		return Inertia::render('Posts/Index', [
			'posts' => $posts,
			'filters' => QueryBuilderHelper::filters($request),
		]);
	}

	public function create() {
		return Inertia::render('Posts/Create', [
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
