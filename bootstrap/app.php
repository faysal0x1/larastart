<?php

use App\Http\Middleware\CheckUserRole;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\ImageCacheMiddleware;
use App\Modules\MarketingService\Http\Middleware\InjectTrackingScripts;
use App\Http\Middleware\isBannedUser;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\VerifyActiveSession;
use App\Modules\Cart\Http\Middleware\CartSessionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            ImageCacheMiddleware::class,
            \App\Modules\Recommendation\Http\Middleware\TrackProductView::class,
            \App\Modules\MarketingService\Http\Middleware\InjectTrackingScripts::class,
        ]);

        $middleware->alias([
            'guest'                 => RedirectIfAuthenticated::class,
            'role'                  => RoleMiddleware::class,
            'permission'            => PermissionMiddleware::class,
            'role_or_permission'    => RoleOrPermissionMiddleware::class,
            'verify_active_session' => VerifyActiveSession::class,
            'check.user.role'       => CheckUserRole::class,
            'check.banned'          => isBannedUser::class,
            'cart.session'          => CartSessionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // if (app()->environment('production')) {

        //     $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
        //         $statusCode = $response->getStatusCode();

        //         // Define error page mappings
        //         $errorPages = [
        //             500 => 'Errors/ServerError',
        //             503 => 'Errors/ServiceUnavailable',
        //             404 => 'Errors/NotFound',
        //             403 => 'Errors/Forbidden',
        //         ];

        //         if (isset($errorPages[$statusCode])) {
        //             return Inertia::render($errorPages[$statusCode])
        //                 ->toResponse($request)
        //                 ->setStatusCode($statusCode);
        //         }

        //         if ($statusCode === 419) {
        //             return back()->with('message', 'The page expired, please try again.');
        //         }

        //         return $response;
        //     });
        // }
    })
    ->create();