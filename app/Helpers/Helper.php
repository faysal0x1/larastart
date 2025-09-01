<?php

use App\Services\ResponseService;
use Illuminate\Http\RedirectResponse;

if (! function_exists('success_response')) {
    /**
     * Return a success response with flash message
     *
     * @param string $message    Success message
     * @param int    $statusCode HTTP status code
     * @return RedirectResponse
     */
    function success_response(string $message, int $statusCode = 200): RedirectResponse
    {
        return ResponseService::success($message, $statusCode);
    }
}

if (! function_exists('error_response')) {
    /**
     * Return an error response with flash message
     *
     * @param string $message    Error message
     * @param int    $statusCode HTTP status code
     * @return RedirectResponse
     */
    function error_response(string $message, int $statusCode = 422): RedirectResponse
    {
        return ResponseService::error($message, $statusCode);
    }
}

if (! function_exists('success_route')) {
    function success_route(string $route, string $message, int $statusCode = 200): RedirectResponse
    {
        return ResponseService::success_route($route, $message, $statusCode);
    }
}

if (! function_exists('error_route')) {
    function error_route(string $route, string $message, int $statusCode = 422): RedirectResponse
    {
        return ResponseService::error_route($route, $message, $statusCode);
    }
}

/**
 * Get user balance based on their role
 */
function getUserBalance($user): float
{
    if (! $user) {
        return 0.00;
    }

    switch ($user->role) {
        case 'freelancer':
            return $user->freelancer?->balance ?? 0.00;
        case 'employer':
            return $user->employer?->balance ?? 0.00;
        case 'admin':
        case 'superadmin':
        case 'moderator':
        case 'supermoderator':
            return $user->balance ?? 0.00;
        default:
            return $user->balance ?? 0.00;
    }
}

/**
 * Get user balances (both employer and freelancer if available)
 */
function getUserBalances($user): array
{
    if (! $user) {
        return [
            'employer_balance'   => 0.00,
            'freelancer_balance' => 0.00,
            'total_balance'      => 0.00,
        ];
    }

    $employerBalance   = $user->employer?->balanceFloatNum ?? 0.000;
    $freelancerBalance = $user->freelancer?->balanceFloatNum ?? 0.000;
    $totalBalance      = $employerBalance + $freelancerBalance;

    return [
        'employer_balance'   => $employerBalance,
        'freelancer_balance' => $freelancerBalance,
        'total_balance'      => $totalBalance,
    ];
}


if (!function_exists('format_money')) {
    /**
     * Format amount from float to 2 decimal places as string
     *
     * @param float|int $amount
     * @param int $decimals
     * @return string
     */
    function format_money($amount, $decimals = 3)
    {
        return number_format($amount, $decimals);
    }
}
