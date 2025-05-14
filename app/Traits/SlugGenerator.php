<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait SlugGenerator
{
	/**
	 * Boot the trait.
	 */
	public static function bootSlugGenerator(): void {
		static::creating(function ($model) {
			$model->generateSlug();
		});

		static::updating(function ($model) {
			if ($model->isDirty($model->getSlugSourceColumn())) {
				$model->generateSlug();
			}
		});
	}

	/**
	 * Generate a unique slug.
	 */
	protected function generateSlug(): void
	{
		$sourceColumn = $this->getSlugSourceColumn();
		$slugColumn = $this->getSlugColumn();
		$slug = Str::slug($this->{$sourceColumn});
		$originalSlug = $slug;
		$count = 1;

		while (static::where($slugColumn, $slug)
			->where('id', '!=', $this->id ?? 0)
			->exists()) {
			$slug = $originalSlug.'-'.$count++;
		}

		$this->{$slugColumn} = $slug;
	}

	protected function getSlugSourceColumn(): string
	{
		return 'name';
	}

	protected function getSlugColumn(): string
	{
		return 'slug';
	}
}
