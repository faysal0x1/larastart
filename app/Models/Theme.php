<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    protected $table = 'themes';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships

}
