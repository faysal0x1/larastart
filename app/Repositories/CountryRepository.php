<?php
// app/Repositories/Eloquent/CountryRepository.php

namespace App\Repositories;

use App\Models\Country;
use App\Repositories\Interfaces\CountryRepositoryInterface;

class CountryRepository extends BaseRepository implements CountryRepositoryInterface
{
	public function __construct(Country $model)
	{
		parent::__construct($model);
	}

	protected function getSearchableFields(): array
	{
		return ['name', 'code', 'created_at'];
	}

	protected function getSortableFields(): array
	{
		return ['name', 'created_at', 'code'];
	}
}