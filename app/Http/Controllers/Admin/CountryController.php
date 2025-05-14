<?php
// app/Http/Controllers/Admin/CountryController.php

namespace App\Http\Controllers\Admin;

use App\Helpers\QueryBuilderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\CountryStoreRequest;
use App\Http\Requests\CountryUpdateRequest;
use App\Repositories\Interfaces\CountryRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
	public function __construct(
		private readonly CountryRepositoryInterface $countryRepository
	) {
	}

	/**
	 * Display a listing of countries.
	 */
	public function index(Request $request): Response {
		$countries = $this->countryRepository->paginate($request);

		return Inertia::render('country/index', [
			'country' => $countries,
			'filters' => QueryBuilderHelper::filters($request),
		]);
	}

	/**
	 * Show the form for creating a new country.
	 */
	public function create(): Response {
		return Inertia::render('country/create');
	}

	/**
	 * Store a newly created country in storage.
	 */
	public function store(CountryStoreRequest $request): RedirectResponse {
		try {
			$this->countryRepository->create($request->validated());
			return success_route('country.index', 'Country created successfully.');
		} catch (\Exception $e) {
			return error_route('countries.index', 'Failed to create country: ' . $e->getMessage());
		}
	}

	/**
	 * Display the specified country.
	 */
	public function show(int $id): Response {
		$country = $this->countryRepository->find($id);

		if (!$country) {
			error_response('Country not found', 404);
		}

		return Inertia::render('country/show', [
			'country' => $country,
		]);
	}

	/**
	 * Show the form for editing the specified country.
	 */
	public function edit(int $id): Response {
		$country = $this->countryRepository->find($id);

		if (!$country) {
			error_response('Country not found', 404);
		}
		return Inertia::render('country/edit', [
			'country' => $country,
		]);
	}

	/**
	 * Update the specified country in storage.
	 */
	public function update(CountryUpdateRequest $request, int $id): RedirectResponse {
		try {
			$this->countryRepository->update($request->validated(), $id);
			return success_route('country.index', 'Country updated successfully.');

		} catch (\Exception $e) {
			return error_route('countries.index', 'Failed to update country: ' . $e->getMessage());
		}
	}

	/**
	 * Remove the specified country from storage.
	 */
	public function destroy(int $id): RedirectResponse {
		try {
			$this->countryRepository->delete($id);

			return success_route('country.index', 'Country deleted successfully.');
		} catch (\Exception $e) {
			return error_route('countries.index', 'Failed to update country: ' . $e->getMessage());
		}
	}
}