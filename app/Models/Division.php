<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model
{
    protected $table = 'divisions';

    protected $fillable = [
        'name',
        'slug',
        'image',
        'status',
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function districts(): HasMany
    {
        return $this->hasMany(District::class, 'division_id');
    }

    public function userAddresses(): HasMany
    {
        return $this->hasMany(UserAddress::class, 'division_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'division_id');
    }
}
