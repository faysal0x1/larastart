<?php
// app/Http/Controllers/Admin/BlogController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\BlogStoreRequest;
use App\Http\Requests\BlogUpdateRequest;
use App\Repositories\Interfaces\BlogRepositoryInterface;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
       private readonly BlogRepositoryInterface $blogRepository
    ) {
    }

    /**
     * Display a listing of blogs.
     */
    public function index(Request $request): Response {
       $blogs = $this->blogRepository->paginate($request);

       return Inertia::render('blog/index', [
          'blog' => $blogs,
          'filters' => QueryBuilderHelper::filters($request),
       ]);
    }

    /**
     * Show the form for creating a new blog.
     */
    public function create(): Response {
       return Inertia::render('blog/create');
    }

    /**
     * Store a newly created blog in storage.
     */
    public function store(BlogStoreRequest $request): RedirectResponse {
       try {
          $this->blogRepository->create($request->validated());
          return success_route('blog.index', 'Blog created successfully.');
       } catch (Exception $e) {
          return error_route('blog.index', 'Failed to create blog: ' . $e->getMessage());
       }
    }

    /**
     * Display the specified blog.
     */
    public function show(int $id): Response {
       $blog = $this->blogRepository->find($id);

       if (!$blog) {
          error_response('Blog not found', 404);
       }

       return Inertia::render('blog/show', [
          'blog' => $blog,
       ]);
    }

    /**
     * Show the form for editing the specified blog.
     */
    public function edit(int $id): Response {
       $blog = $this->blogRepository->find($id);

       if (!$blog) {
          error_response('Blog not found', 404);
       }
       return Inertia::render('blog/edit', [
          'blog' => $blog,
       ]);
    }

    /**
     * Update the specified blog in storage.
     */
    public function update(BlogUpdateRequest $request, int $id): RedirectResponse {
       try {
          $this->blogRepository->update($request->validated(), $id);
          return success_route('blog.index', 'Blog updated successfully.');

       } catch (Exception $e) {
          return error_route('blog.index', 'Failed to update blog: ' . $e->getMessage());
       }
    }

    /**
     * Remove the specified blog from storage.
     */
    public function destroy(int $id): RedirectResponse {
       try {
          $this->blogRepository->delete($id);

          return success_route('blog.index', 'Blog deleted successfully.');
       } catch (Exception $e) {
          return error_route('blog.index', 'Failed to delete blog: ' . $e->getMessage());
       }
    }
}