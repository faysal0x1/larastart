<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'key',
        'value',
        'type',
        'description',
    ];

    protected $casts = [
        'value' => 'json',
    ];

    // Relationships
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    // Helper methods
    public function getValueAttribute($value)
    {
        if ($this->type === 'json') {
            return json_decode($value, true);
        }

        if ($this->type === 'boolean') {
            return (bool) $value;
        }

        if ($this->type === 'integer') {
            return (int) $value;
        }

        return $value;
    }

    public function setValueAttribute($value)
    {
        if ($this->type === 'json') {
            $this->attributes['value'] = json_encode($value);
        } else {
            $this->attributes['value'] = $value;
        }
    }
}
