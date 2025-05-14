<?php

use App\Services\ResponseService;
use Illuminate\Http\RedirectResponse;

if (!function_exists('success_response')) {
	/**
	 * Return a success response with flash message
	 *
	 * @param string $message    Success message
	 * @param int    $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	function success_response(string $message, int $statusCode = 200): RedirectResponse {
		return ResponseService::success($message, $statusCode);
	}
}

if (!function_exists('error_response')) {
	/**
	 * Return an error response with flash message
	 *
	 * @param string $message    Error message
	 * @param int    $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	function error_response(string $message, int $statusCode = 422): RedirectResponse {
		return ResponseService::error($message, $statusCode);
	}
}

if (!function_exists('success_route')) {
	function success_route(string $route, string $message, int $statusCode = 200): RedirectResponse {
		return ResponseService::success_route($route, $message, $statusCode);
	}
}

if (!function_exists('error_route')) {
	function error_route(string $route, string $message, int $statusCode = 422): RedirectResponse {
		return ResponseService::error_route($route, $message, $statusCode);
	}
}


