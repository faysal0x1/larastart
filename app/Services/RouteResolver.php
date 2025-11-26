<?php

declare(strict_types=1);

namespace App\Services;

use App\Helpers\SeoHelper;
use App\Modules\StaticPage\Repositories\StaticPageRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route as RouteFacade;
use Inertia\Inertia;
use Inertia\Response;

class RouteResolver
{
    public function __construct(
        private readonly StaticPageRepository $staticPages
    ) {
    }

    public function resolveSlug(Request $request, string $slug): Response|RedirectResponse|null
    {
        if ($staticPage = $this->staticPages->findBySlug($slug)) {
            return Inertia::render('frontend/static/Page', [
                'page' => $staticPage,
                'seo'  => SeoHelper::forStaticPage($staticPage),
            ]);
        }

        $aliases = config('route-resolver.aliases', []);
        $routeName = $aliases[$slug] ?? $this->getRouteNameByUri($slug);
        if ($routeName) {
            return Redirect::route($routeName);
        }

        return null;
    }

    public function renderStaticPage(string $slug, ?string $fallbackComponent = null, array $fallbackProps = []): ?Response
    {
        if ($page = $this->staticPages->findBySlug($slug)) {
            return Inertia::render('frontend/static/Page', [
                'page' => $page,
                'seo'  => SeoHelper::forStaticPage($page),
            ]);
        }

        if ($fallbackComponent) {
            return Inertia::render($fallbackComponent, $fallbackProps);
        }

        return null;
    }

    protected function getRouteNameByUri(string $slug): ?string
    {
        static $uriMap = null;

        if ($uriMap === null) {
            $uriMap = [];
            foreach (RouteFacade::getRoutes() as $route) {
                $uri = ltrim($route->uri(), '/');
                if ($uri && $route->getName() && ! isset($uriMap[$uri])) {
                    $uriMap[$uri] = $route->getName();
                }
            }
        }

        return $uriMap[$slug] ?? null;
    }
}