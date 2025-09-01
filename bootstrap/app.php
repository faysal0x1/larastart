<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role'                  => RoleMiddleware::class,
            'permission'            => PermissionMiddleware::class,
            'role_or_permission'    => RoleOrPermissionMiddleware::class,
            'verify_active_session' => VerifyActiveSession::class,
            'check.user.role'       => \App\Http\Middleware\CheckUserRole::class,
            'check.banned'        => \App\Http\Middleware\isBannedUser::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
//            $statusCode = $response->getStatusCode();
//
//            // Define error page mappings
//            $errorPages = [
//                500 => 'Errors/ServerError',
//                503 => 'Errors/ServiceUnavailable',
//                404 => 'Errors/NotFound',
//                403 => 'Errors/Forbidden',
//            ];
//
//            if (isset($errorPages[$statusCode])) {
//                return Inertia::render($errorPages[$statusCode])
//                    ->toResponse($request)
//                    ->setStatusCode($statusCode);
//            }
//
//            if ($statusCode === 419) {
//                return back()->with('message', 'The page expired, please try again.');
//            }
//
//            return $response;
//        });
    })->create();
