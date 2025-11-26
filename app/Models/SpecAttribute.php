<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SpecAttribute extends Model
{
    use HasFactory;

    protected $fillable = ['spec_group_id', 'name', 'input_type'];

    public function group(): BelongsTo
    {
        return $this->belongsTo(SpecGroup::class, 'spec_group_id');
    }

    public function values(): HasMany
    {
        return $this->hasMany(ProductSpecValue::class);
    }
}
