<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Modules\StaticPage\Repositories\StaticPageRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    public function __construct(
        private readonly StaticPageRepository $pages
    ) {
    }

    public function show(Request $request, string $slug): Response
    {
        $page = $this->pages->findBySlug($slug);

        if (! $page) {
            abort(404);
        }

        return Inertia::render('frontend/static/Page', [
            'page' => $page,
        ]);
    }
}
