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

		// Make sure we have a value to create a slug from
		if (empty($this->{$sourceColumn})) {
			return;
		}

		$slug = Str::slug($this->{$sourceColumn});
		$originalSlug = $slug;
		$count = 1;

		// Query to find existing slugs
		$query = static::where($slugColumn, $slug);

		// Only exclude current model when it already has an ID (updating)
		if ($this->exists && $this->id) {
			$query->where('id', '!=', $this->id);
		}

		// Check for slug uniqueness
		while ($query->exists()) {
			$slug = $originalSlug.'-'.$count++;
			$query = static::where($slugColumn, $slug);
			if ($this->exists && $this->id) {
				$query->where('id', '!=', $this->id);
			}
		}

		$this->{$slugColumn} = $slug;
	}

	/**
	 * Get the column to be used as the source for the slug.
	 * Override this method in your model if needed.
	 */
	protected function getSlugSourceColumn(): string
	{
		// Check if the model has a 'name' attribute
		if (isset($this->attributes['name']) ||
			in_array('name', $this->fillable ?? []) ||
			array_key_exists('name', $this->attributes ?? [])) {
			return 'name';
		}

		// Check if the model has a 'title' attribute
		if (isset($this->attributes['title']) ||
			in_array('title', $this->fillable ?? []) ||
			array_key_exists('title', $this->attributes ?? [])) {
			return 'title';
		}

		return 'name'; // Default fallback
	}

	/**
	 * Get the column where the slug will be stored.
	 * Override this method in your model if needed.
	 */
	protected function getSlugColumn(): string
	{
		return 'slug';
	}
}