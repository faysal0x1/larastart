<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FaqQuestion extends Model
{
    use HasFactory;

    protected $table = 'faq_questions';

    protected $fillable = [
        // Add your fillable fields here
    ];

    protected $casts = [
        // Add your casts here
    ];

    // Relationships
    public function faqs(): BelongsToMany
    {
        return $this->belongsToMany(Faq::class, 'faq_questions');
    }
}
