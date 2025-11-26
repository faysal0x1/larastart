<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository extends BaseRepository
{
    public function __construct(Order $model)
    {
        parent::__construct($model);
    }

    protected function getSearchableFields(): array
    {
        return ['address', 'notes', 'discount'];
    }

    protected function getSortableFields(): array
    {
        return ['user_id', 'division_id', 'district_id', 'upazilla_id', 'name', 'email', 'phone', 'address', 'post_code', 'notes', 'payment_type', 'payment_method', 'transaction_id', 'discount', 'amount', 'currency', 'order_number', 'invoice_no', 'order_date', 'confirmed_date', 'processing_date', 'picked_date', 'shipped_date', 'delivered_date', 'cancel_date', 'out_of_delivery_date', 'return_date', 'return_reason', 'status', 'payment_status', 'order_type'];
    }
}
