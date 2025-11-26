<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'jobs';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships

}
