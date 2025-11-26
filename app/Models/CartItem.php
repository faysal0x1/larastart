<?php
namespace App\Models;

use App\Modules\Cart\Models\CartItem as ModuleCartItem;

class CartItem extends ModuleCartItem
{
    public function updateQuantity($quantity): bool
    {
        $this->quantity    = $quantity;
        $this->total_price = $this->unit_price * $quantity;

        $saved = $this->save();

        if ($saved) {
            $this->cart->recalculateTotals();
        }

        return $saved;
    }

    public function getFormattedTotalPriceAttribute(): string
    {
        return number_format($this->total_price, 2);
    }

    public function getFormattedUnitPriceAttribute(): string
    {
        return number_format($this->unit_price, 2);
    }

    public function getDisplayNameAttribute(): string
    {
        $name = $this->product->name ?? 'Unknown Product';

        $options = [];
        if ($this->color) {
            $options[] = "Color: {$this->color}";
        }

        if ($this->size) {
            $options[] = "Size: {$this->size}";
        }

        if ($this->variation) {
            $options[] = "Variation: {$this->variation}";
        }

        if (! empty($options)) {
            $name .= ' (' . implode(', ', $options) . ')';
        }

        return $name;
    }

    public function isAvailable(): bool
    {
        if (! $this->product) {
            return false;
        }

        if ($this->product->status !== 'active' || $this->product->is_approved !== 1) {
            return false;
        }

        if ($this->product->stock !== null && $this->product->stock < $this->quantity) {
            return false;
        }

        return true;
    }

    public function getAvailabilityMessage(): string
    {
        if (! $this->product) {
            return 'Product not found';
        }

        if ($this->product->status !== 'active') {
            return 'Product is not available';
        }

        if ($this->product->is_approved !== 1) {
            return 'Product is not approved';
        }

        if ($this->product->stock !== null && $this->product->stock < $this->quantity) {
            $available = $this->product->stock;
            return "Only {$available} items available in stock";
        }

        return 'Available';
    }
}