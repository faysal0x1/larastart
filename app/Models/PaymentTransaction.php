<?php
namespace App\Models;

use App\Modules\PaymentGateway\Models\PaymentTransaction as ModulePaymentTransaction;
use Illuminate\Support\Str;

class PaymentTransaction extends ModulePaymentTransaction
{
    /**
     * Generate unique transaction reference
     */
    public static function generateTransactionReference(): string
    {
        do {
            $reference = 'TXN_' . strtoupper(Str::random(8)) . '_' . time();
        } while (static::where('transaction_reference', $reference)->exists());

        return $reference;
    }

    /**
     * Create a new transaction
     */
    public static function createTransaction($paymentId, $orderId, $userId, $amount, $transactionType, $paymentMethod, $options = []): self
    {
        return static::create([
            'payment_id'            => $paymentId,
            'order_id'              => $orderId,
            'user_id'               => $userId,
            'transaction_reference' => static::generateTransactionReference(),
            'amount'                => $amount,
            'currency'              => $options['currency'] ?? 'BDT',
            'transaction_type'      => $transactionType,
            'payment_method'        => $paymentMethod,
            'status'                => 'initiated',
            'initiated_at'          => now(),
        ]);
    }

    /**
     * Update transaction status
     */
    public function updateStatus($status, $data = []): bool
    {
        $updateData = ['status' => $status];

        switch ($status) {
            case 'completed':
                $updateData['completed_at']             = now();
                $updateData['ssl_tran_id']              = $data['ssl_tran_id'] ?? null;
                $updateData['ssl_bank_tran_id']         = $data['ssl_bank_tran_id'] ?? null;
                $updateData['ssl_card_type']            = $data['ssl_card_type'] ?? null;
                $updateData['ssl_card_no']              = $data['ssl_card_no'] ?? null;
                $updateData['ssl_card_issuer']          = $data['ssl_card_issuer'] ?? null;
                $updateData['ssl_card_brand']           = $data['ssl_card_brand'] ?? null;
                $updateData['ssl_risk_title']           = $data['ssl_risk_title'] ?? null;
                $updateData['ssl_risk_level']           = $data['ssl_risk_level'] ?? null;
                $updateData['ssl_response']             = $data['ssl_response'] ?? null;
                $updateData['gateway_response_code']    = $data['gateway_response_code'] ?? null;
                $updateData['gateway_response_message'] = $data['gateway_response_message'] ?? null;
                break;

            case 'failed':
                $updateData['failed_at']                = now();
                $updateData['failure_reason']           = $data['failure_reason'] ?? null;
                $updateData['gateway_response_code']    = $data['gateway_response_code'] ?? null;
                $updateData['gateway_response_message'] = $data['gateway_response_message'] ?? null;
                break;

            case 'cancelled':
                $updateData['failed_at']      = now();
                $updateData['failure_reason'] = 'Transaction cancelled by user';
                break;
        }

        return $this->update($updateData);
    }

    public function isPending(): bool
    {
        return $this->status === 'initiated';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isFailed(): bool
    {
        return in_array($this->status, ['failed', 'cancelled']);
    }

    public function getFormattedAmountAttribute(): string
    {
        return number_format($this->amount, 2) . ' ' . $this->currency;
    }

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
        return $query->where('status', 'initiated');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeFailed($query)
    {
        return $query->whereIn('status', ['failed', 'cancelled']);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('transaction_type', $type);
    }

    public function scopeByMethod($query, $method)
    {
        return $query->where('payment_method', $method);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPayment($query, $paymentId)
    {
        return $query->where('payment_id', $paymentId);
    }
}