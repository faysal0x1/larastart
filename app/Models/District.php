<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    protected $table = 'districts';

    protected $fillable = [
        'division_id',
        'district_name',
        'slug',
        'status',
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function division(): BelongsTo {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function orders(): HasMany {
        return $this->hasMany(Order::class, 'district_id');
    }

    public function userAddresses(): HasMany {
        return $this->hasMany(UserAddress::class, 'district_id');
    }
}
