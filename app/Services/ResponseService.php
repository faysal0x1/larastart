<?php

namespace App\Services;

use Illuminate\Http\RedirectResponse;

class ResponseService
{
	/**
	 * Return a success response with flash message
	 *
	 * @param string $message    Success message
	 * @param int    $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	public static function success(string $message, int $statusCode = 200): RedirectResponse {
		return back()->with([
			'success' => true,
			'message' => $message
		])->withStatus($statusCode);
	}

	/**
	 * Return an error response with flash message
	 *
	 * @param string $message    Error message
	 * @param int    $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	public static function error(string $message, int $statusCode = 422): RedirectResponse {
		return back()->with([
			'success' => false,
			'message' => $message
		])->withStatus($statusCode);
	}

	public static function success_route(string $route, string $message, int $statusCode = 200): RedirectResponse {
		return redirect()->route($route)->with([
			'success' => true,
			'message' => $message
		])->withStatus($statusCode);
	}

	public static function error_route(string $route, string $message, int $statusCode = 422): RedirectResponse {
		return redirect()->route($route)->with([
			'success' => false,
			'message' => $message
		])->withStatus($statusCode);
	}

	public static function message(string $message, int $statusCode = 200): RedirectResponse {
		return back()->with([
			'message' => $message
		])->withStatus($statusCode);
	}
}
