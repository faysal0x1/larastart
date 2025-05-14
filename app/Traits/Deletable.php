<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\SoftDeletes;

trait Deletable
{
	/**
	 * Boot the trait.
	 */
	protected static function bootDeletable()
	{
		// You can add global scopes or additional behavior here
	}

	/**
	 * Permanently delete the model.
	 *
	 * @return bool|null
	 */
	public function permanentDelete()
	{
		if (in_array(SoftDeletes::class, class_uses_recursive($this))) {
			return $this->forceDelete();
		}

		return $this->delete();
	}

	/**
	 * Restore the model if it's soft deletable.
	 *
	 * @return bool|null
	 */
	public function restoreDeleted()
	{
		if (in_array(SoftDeletes::class, class_uses_recursive($this))) {
			return $this->restore();
		}

		return false;
	}

	/**
	 * Check if model is deleted.
	 *
	 * @return bool
	 */
	public function isDeleted()
	{
		if (in_array(SoftDeletes::class, class_uses_recursive($this), true)) {
			return $this->trashed();
		}

		return false;
	}
}