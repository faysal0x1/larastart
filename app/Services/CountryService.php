<?php

namespace App\Services;

use App\Modules\Location\Repositories\CountryRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use App\Models\Country;

class CountryService
{
	/**
	 * @var CountryRepository
	 */
	protected CountryRepository $countryRepository;

	/**
	 * CountryService constructor.
	 *
	 * @param CountryRepository $countryRepository
	 */
	public function __construct(CountryRepository $countryRepository)
	{
		$this->countryRepository = $countryRepository;
	}

	/**
	 * Get paginated countries with filters and sorting.
	 *
	 * @param Request $request
	 * @return LengthAwarePaginator
	 */
	public function getPaginatedCountries(Request $request): LengthAwarePaginator
	{
		return $this->countryRepository->getPaginatedWithFilters(
			$request,
			['name', 'code', 'created_at'],
			['name', 'created_at']
		);
	}

	/**
	 * Create a new country.
	 *
	 * @param array $data
	 * @return Model
	 */
	public function createCountry(array $data): Model
	{
		return $this->countryRepository->create($data);
	}

	/**
	 * Get country by ID.
	 *
	 * @param int $id
	 * @return Country|null
	 */
	public function getCountry(int $id): ?Country
	{
		return $this->countryRepository->find($id);
	}

	/**
	 * Update country.
	 *
	 * @param int $id
	 * @param array $data
	 * @return Country|null
	 */
	public function updateCountry(int $id, array $data): ?Country
	{
		return $this->countryRepository->update($id, $data);
	}

	/**
	 * Delete country.
	 *
	 * @param int $id
	 * @return bool
	 */
	public function deleteCountry(int $id): bool
	{
		return $this->countryRepository->delete($id);
	}
}