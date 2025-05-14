<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
	public function index()
	{
		$user = auth()->user();


		if ($user->role === 'admin') {
			return redirect()->route('admin.dashboard');
		}

		if ($user->role === 'employer') {
			//			return Inertia::render('frontend/custom/clientDashboard/clientDashboard');
			return redirect()->route('employer.dashboard');
		}

		if ($user->role === 'freelancer') {
			return Inertia::render('frontend/employeeDashboard/employeeDashboardIndex');

			//			return redirect()->route('freelancer.dashboard');
		}

		return Inertia::render('dashboard');
	}


	public function adminDashboard(): Response
	{
		return Inertia::render('dashboard');
	}
}
