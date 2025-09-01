<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SeoMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Add SEO headers for HTML responses
        if ($response->headers->get('content-type') &&
            str_contains($response->headers->get('content-type'), 'text/html')) {

            // Add meta robots tag for better SEO
            $response->headers->set('X-Robots-Tag', 'index, follow');

            // Add canonical URL header
            $canonicalUrl = $request->url();
            $response->headers->set('Link', "<{$canonicalUrl}>; rel=\"canonical\"");

            // Add structured data headers
            $response->headers->set('X-Structured-Data', 'enabled');
        }

        return $response;
    }
}
