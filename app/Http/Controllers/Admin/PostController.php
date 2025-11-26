<?php

// app/Http/Controllers/Admin/PostController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Repositories\PostRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        private readonly PostRepository $postRepository
    ) {}

    /**
     * Display a listing of posts.
     */
    public function index(Request $request): Response
    {
        $posts = $this->postRepository->paginate($request);

        return Inertia::render('post/index', [
            'posts' => $posts,
            'filters' => QueryBuilderHelper::filters($request),
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create(): Response
    {
        return Inertia::render('post/create');
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(PostStoreRequest $request): RedirectResponse
    {
        try {
            $this->postRepository->create($request->validated());

            return success_route('post.index', 'Post created successfully.');
        } catch (\Exception $e) {
            return error_route('post.index', 'Failed to create post: '.$e->getMessage());
        }
    }

    /**
     * Display the specified post.
     */
    public function show(int $id): Response
    {
        $post = $this->postRepository->find($id);

        if (! $post) {
            error_response('Post not found', 404);
        }

        return Inertia::render('post/show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(int $id): Response
    {
        $post = $this->postRepository->find($id);

        if (! $post) {
            error_response('Post not found', 404);
        }

        return Inertia::render('post/edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(PostUpdateRequest $request, int $id): RedirectResponse
    {
        try {
            $this->postRepository->update($request->validated(), $id);

            return success_route('post.index', 'Post updated successfully.');

        } catch (\Exception $e) {
            return error_route('post.index', 'Failed to update post: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $this->postRepository->delete($id);

            return success_route('post.index', 'Post deleted successfully.');
        } catch (\Exception $e) {
            return error_route('post.index', 'Failed to delete post: '.$e->getMessage());
        }
    }
}
