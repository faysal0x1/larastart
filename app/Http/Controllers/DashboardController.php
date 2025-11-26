<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index() {
        $user = auth()->user();


        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($user->role == 'user') {
            return redirect()->route('client.dashboard');
        }


        return back();

//		return Inertia::render('dashboard');
    }


    public function adminDashboard(): Response {
        return Inertia::render('dashboard');
    }


    // User Dashboard page
    public function userDashboard(): Response {
        $user = Auth::user();
        return Inertia::render('frontend/userDashboard/ProfilePageIndex', [
            'user' => $user,
        ]);
    }
}
