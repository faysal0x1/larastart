<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ImageCacheMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only apply cache headers to image requests
        if ($this->isImageRequest($request)) {
            $this->setImageCacheHeaders($response);
        }

        return $response;
    }

    /**
     * Check if the request is for an image
     */
    private function isImageRequest(Request $request): bool
    {
        $path   = $request->path();
        $accept = $request->header('Accept', '');

        return preg_match('/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i', $path) ||
        str_contains($accept, 'image/');
    }

    /**
     * Set cache headers for images
     */
    private function setImageCacheHeaders(Response $response): void
    {
                                                                                         // Set aggressive caching for images
        $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
        $response->headers->set('Expires', gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s', time()) . ' GMT');
        $response->headers->set('ETag', '"' . md5(time()) . '"');

        // Enable compression
        $response->headers->set('Vary', 'Accept-Encoding');

        // Set content type if not already set
        if (! $response->headers->has('Content-Type')) {
            $response->headers->set('Content-Type', 'image/jpeg');
        }
    }
}
