<?php

namespace App\Http\Controllers;

use App\Helpers\QueryBuilderHelper;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

	public function index(Request $request) {
		// Combine request methods to handle both GET and POST
		$query = User::query();

		$params = $request->isMethod('post') ? $request->all() : $request->query();

		$combinedRequest = new Request($params);

		$query = QueryBuilderHelper::apply($combinedRequest, $query, ['name', 'email','created_at','role'], ['name', 'created_at','role']);
		$users  = QueryBuilderHelper::paginate($combinedRequest, $query);

		return Inertia::render('user/Index', [
			'users' => $users,
			'filters' => QueryBuilderHelper::filters($combinedRequest),
		]);
	}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
