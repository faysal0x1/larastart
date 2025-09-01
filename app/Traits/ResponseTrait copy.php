<?php

namespace App\Traits;

use Illuminate\Http\RedirectResponse;

trait ResponseTrait
{
	/**
	 * Return a success response with flash message
	 *
	 * @param string $message Success message
	 * @param int $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	protected function successResponse(string $message, int $statusCode = 200): RedirectResponse
	{
		return back()->with([
			'success' => true,
			'message' => $message
		])->withStatus($statusCode);
	}

	/**
	 * Return an error response with flash message
	 *
	 * @param string $message Error message
	 * @param int $statusCode HTTP status code
	 * @return RedirectResponse
	 */
	protected function errorResponse(string $message, int $statusCode = 422): RedirectResponse
	{
		return back()->with([
			'success' => false,
			'message' => $message
		])->withStatus($statusCode);
	}
}
