<?php
// app/Http/Controllers/Admin/TagController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\TagStoreRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Repositories\Interfaces\TagRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct(
       private readonly TagRepositoryInterface $tagRepository
    ) {
    }

    /**
     * Display a listing of tags.
     */
    public function index(Request $request): Response {
       $tags = $this->tagRepository->paginate($request);

       return Inertia::render('tag/index', [
          'tags' => $tags,
          'filters' => QueryBuilderHelper::filters($request),
       ]);
    }

    /**
     * Show the form for creating a new tag.
     */
    public function create(): Response {
       return Inertia::render('tag/create');
    }

    /**
     * Store a newly created tag in storage.
     */
    public function store(TagStoreRequest $request): RedirectResponse {
       try {
          $this->tagRepository->create($request->validated());
          return success_route('tag.index', 'Tag created successfully.');
       } catch (\Exception $e) {
          return error_route('tag.index', 'Failed to create tag: ' . $e->getMessage());
       }
    }

    /**
     * Display the specified tag.
     */
    public function show(int $id): Response {
       $tag = $this->tagRepository->find($id);

       if (!$tag) {
          error_response('Tag not found', 404);
       }

       return Inertia::render('tag/show', [
          'tag' => $tag,
       ]);
    }

    /**
     * Show the form for editing the specified tag.
     */
    public function edit(int $id): Response {
       $tag = $this->tagRepository->find($id);

       if (!$tag) {
          error_response('Tag not found', 404);
       }
       return Inertia::render('tag/edit', [
          'tag' => $tag,
       ]);
    }

    /**
     * Update the specified tag in storage.
     */
    public function update(TagUpdateRequest $request, int $id): RedirectResponse {
       try {
          $this->tagRepository->update($request->validated(), $id);
          return success_route('tag.index', 'Tag updated successfully.');

       } catch (\Exception $e) {
          return error_route('tag.index', 'Failed to update tag: ' . $e->getMessage());
       }
    }

    /**
     * Remove the specified tag from storage.
     */
    public function destroy(int $id): RedirectResponse {
       try {
          $this->tagRepository->delete($id);

          return success_route('tag.index', 'Tag deleted successfully.');
       } catch (\Exception $e) {
          return error_route('tag.index', 'Failed to delete tag: ' . $e->getMessage());
       }
    }
}