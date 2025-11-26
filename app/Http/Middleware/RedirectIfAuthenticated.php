<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     * For guest-only routes: if the user is authenticated, redirect them away.
     */
    public function handle(Request $request, Closure $next): Response {
        $user = $request->user();

        if ($user) {
            // For API/JSON requests, avoid redirect loops; respond with 204 No Content
            if ($request->expectsJson() || $request->is('api/*') || $request->is('*/*/api/*')) {
                return response()->noContent(204);
            }

            if (method_exists($user, 'hasRole')) {
                if ($user->hasRole('admin') || $user->hasRole('super-admin')) {
                    return redirect()->route('admin.dashboard');
                }
                if ($user->hasRole('user')) {
                    return redirect()->route('client.dashboard');
                }
            }

            return redirect()->route('client.dashboard');
        }

        return $next($request);
    }
}
