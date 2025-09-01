<?php
namespace App\Http\Middleware;

use App\Services\ReferralService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProcessReferral
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Check if this is a registration request and has a referral code
        if ($request->is('register') && $request->has('ref') && Auth::check()) {
            $referralCode = $request->get('ref');
            $user         = Auth::user();

            // Process the referral
            ReferralService::processReferral($referralCode, $user);
        }

        return $response;
    }
}
