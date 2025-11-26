<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BusinessInfo extends Model
{
    use HasFactory;

    protected $table = 'business_infos';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function businesses(): BelongsToMany
    {
        return $this->belongsToMany(Business::class, 'business_infos');
    }
}
