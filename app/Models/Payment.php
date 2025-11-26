<?php
namespace App\Models;

use App\Modules\PaymentGateway\Models\Payment as ModulePayment;
use Illuminate\Support\Str;

class Payment extends ModulePayment
{
    /**
     * Generate unique payment reference
     */
    public static function generatePaymentReference(): string
    {
        do {
            $reference = 'PAY_' . strtoupper(Str::random(8)) . '_' . time();
        } while (static::where('payment_reference', $reference)->exists());

        return $reference;
    }

    /**
     * Create a new payment
     */
    public static function createPayment($orderId, $userId, $amount, $paymentMethod, $options = []): self
    {
        return static::create([
            'order_id'          => $orderId,
            'user_id'           => $userId,
            'payment_reference' => static::generatePaymentReference(),
            'amount'            => $amount,
            'currency'          => $options['currency'] ?? 'BDT',
            'payment_method'    => $paymentMethod,
            'payment_type'      => $options['payment_type'] ?? 'online',
            'status'            => 'pending',
            'initiated_at'      => now(),
            'expires_at'        => now()->addHours(24),
        ]);
    }

    /**
     * Update payment status
     */
    public function updateStatus($status, $data = []): bool
    {
        $updateData = ['status' => $status];

        switch ($status) {
            case 'completed':
                $updateData['completed_at']     = now();
                $updateData['ssl_tran_id']      = $data['ssl_tran_id'] ?? null;
                $updateData['ssl_bank_tran_id'] = $data['ssl_bank_tran_id'] ?? null;
                $updateData['ssl_card_type']    = $data['ssl_card_type'] ?? null;
                $updateData['ssl_card_no']      = $data['ssl_card_no'] ?? null;
                $updateData['ssl_card_issuer']  = $data['ssl_card_issuer'] ?? null;
                $updateData['ssl_card_brand']   = $data['ssl_card_brand'] ?? null;
                $updateData['ssl_risk_title']   = $data['ssl_risk_title'] ?? null;
                $updateData['ssl_risk_level']   = $data['ssl_risk_level'] ?? null;
                $updateData['ssl_response']     = $data['ssl_response'] ?? null;
                break;

            case 'failed':
                $updateData['failed_at']      = now();
                $updateData['failure_reason'] = $data['failure_reason'] ?? null;
                break;

            case 'cancelled':
                $updateData['failed_at']      = now();
                $updateData['failure_reason'] = 'Payment cancelled by user';
                break;

            case 'expired':
                $updateData['failed_at']      = now();
                $updateData['failure_reason'] = 'Payment expired';
                break;
        }

        return $this->update($updateData);
    }

    /**
     * Check if payment is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if payment is completed
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Check if payment is failed
     */
    public function isFailed(): bool
    {
        return in_array($this->status, ['failed', 'cancelled', 'expired']);
    }

    /**
     * Check if payment is expired
     */
    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    /**
     * Get formatted amount
     */
    public function getFormattedAmountAttribute(): string
    {
        return number_format($this->amount, 2) . ' ' . $this->currency;
    }

    /**
     * Get masked card number
     */
    public function getMaskedCardNumberAttribute(): ?string
    {
        if (! $this->ssl_card_no) {
            return null;
        }

        $cardNo = $this->ssl_card_no;
        if (strlen($cardNo) > 4) {
            return str_repeat('*', strlen($cardNo) - 4) . substr($cardNo, -4);
        }

        return $cardNo;
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeFailed($query)
    {
        return $query->whereIn('status', ['failed', 'cancelled', 'expired']);
    }

    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now());
    }

    public function scopeByMethod($query, $method)
    {
        return $query->where('payment_method', $method);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByOrder($query, $orderId)
    {
        return $query->where('order_id', $orderId);
    }
}