<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'division_id',
        'district_id',
        'upazilla_id',
        'post_code',
        'notes',
        'payment_type',
        'payment_method',
        'transaction_id',
        'discount',
        'amount',
        'currency',
        'order_number',
        'invoice_no',
        'order_date',
        'confirmed_date',
        'processing_date',
        'picked_date',
        'shipped_date',
        'delivered_date',
        'cancel_date',
        'out_of_delivery_date',
        'return_date',
        'return_reason',
        'status',
        'payment_status',
        'order_type',
        // SSL Commerz fields
        'ssl_session_key',
        'ssl_tran_id',
        'ssl_bank_tran_id',
        'ssl_card_type',
        'ssl_card_no',
        'ssl_card_issuer',
        'ssl_card_brand',
        'ssl_risk_title',
        'ssl_risk_level',
        'ssl_payment_details',
        'payment_completed_at',
        'payment_failed_at',
        'payment_failure_reason',
    ];

    protected $casts = [
        'amount'               => 'decimal:2',
        'ssl_payment_details'  => 'array',
        'order_date'           => 'date',
        'confirmed_date'       => 'datetime',
        'processing_date'      => 'datetime',
        'picked_date'          => 'datetime',
        'shipped_date'         => 'datetime',
        'delivered_date'       => 'datetime',
        'cancel_date'          => 'datetime',
        'out_of_delivery_date' => 'datetime',
        'return_date'          => 'datetime',
        'payment_completed_at' => 'datetime',
        'payment_failed_at'    => 'datetime',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function upazilla()
    {
        return $this->belongsTo(Upazilla::class, 'upazilla_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class, 'shop_id', 'user_id');
    }

    /**
     * Get the payments for the order.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Get the latest payment for the order.
     */
    public function latestPayment()
    {
        return $this->hasOne(Payment::class)->latest();
    }
}