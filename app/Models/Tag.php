<?php

namespace App\Models;

use App\Traits\SlugGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
	use SlugGenerator;

	protected $fillable = [
		'name',
		'slug',
		'status'
	];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_tag');
    }


}
