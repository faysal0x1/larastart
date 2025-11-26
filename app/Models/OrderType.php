<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class OrderType extends Model
{
    use HasFactory;

    protected $table = 'order_types';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_types');
    }
}
