<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopStaff extends Model
{
    use HasFactory;

    protected $table = 'shop_staff';

    protected $fillable = [
        'shop_id',
        'user_id',
        'role',
        'permissions',
        'is_active',
        'joined_at',
        'left_at',
    ];

    protected $casts = [
        'permissions' => 'array',
        'is_active'   => 'boolean',
        'joined_at'   => 'datetime',
        'left_at'     => 'datetime',
    ];

    // Relationships
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }
}
