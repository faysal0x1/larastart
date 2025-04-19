<?php

namespace App\Http\Controllers;

use App\Models\MicroTaskCategory;
use App\Models\User;
use Inertia\Inertia;

class FrontendController extends Controller
{
	public function index() {
		$category = MicroTaskCategory::whereStatus(1)->get();
		$users = User::whereStatus(1)->get();

		return Inertia::render('frontend/home',
			[
				'categories' => $category
				, 'users' => $users
			]);
	}
}
