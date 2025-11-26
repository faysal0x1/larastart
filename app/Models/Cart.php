<?php
namespace App\Models;

use App\Modules\Cart\Models\Cart as ModuleCart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Cart extends ModuleCart
{
    public static function getOrCreateForUser($userId = null): self
    {
        $userId = $userId ?? Auth::id();

        return static::firstOrCreate(
            ['user_id' => $userId],
            [
                'currency'     => 'BDT',
                'subtotal'     => 0,
                'total_amount' => 0,
            ]
        );
    }

    public static function getOrCreateForGuest($sessionId = null, $guestIdentifier = null): self
    {
        $sessionId       = $sessionId ?? session()->getId();
        $guestIdentifier = $guestIdentifier ?? static::generateGuestIdentifier();

        return static::firstOrCreate(
            [
                'session_id'       => $sessionId,
                'guest_identifier' => $guestIdentifier,
            ],
            [
                'currency'     => 'BDT',
                'subtotal'     => 0,
                'total_amount' => 0,
                'expires_at'   => now()->addDays(7),
            ]
        );
    }

    public static function generateGuestIdentifier(): string
    {
        return 'guest_' . Str::random(32);
    }

    public function mergeIntoCart(Cart $targetCart): void
    {
        foreach ($this->items as $item) {
            $existingItem = $targetCart->items()
                ->where('product_id', $item->product_id)
                ->where('color', $item->color)
                ->where('size', $item->size)
                ->where('variation', $item->variation)
                ->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity'    => $existingItem->quantity + $item->quantity,
                    'total_price' => $existingItem->unit_price * ($existingItem->quantity + $item->quantity),
                ]);
            } else {
                $item->update(['cart_id' => $targetCart->id]);
            }
        }

        $targetCart->recalculateTotals();
    }

    public function addItem($productId, $quantity = 1, $options = []): CartItem
    {
        $product = Product::findOrFail($productId);

        $existingItem = $this->items()
            ->where('product_id', $productId)
            ->where('color', $options['color'] ?? null)
            ->where('size', $options['size'] ?? null)
            ->where('variation', $options['variation'] ?? null)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity'    => $existingItem->quantity + $quantity,
                'total_price' => $existingItem->unit_price * ($existingItem->quantity + $quantity),
            ]);
            return $existingItem;
        } else {
            $unitPrice  = $product->final_price ?? $product->unit_price;
            $totalPrice = $unitPrice * $quantity;

            return $this->items()->create([
                'product_id'      => $productId,
                'quantity'        => $quantity,
                'unit_price'      => $unitPrice,
                'total_price'     => $totalPrice,
                'color'           => $options['color'] ?? null,
                'size'            => $options['size'] ?? null,
                'variation'       => $options['variation'] ?? null,
                'product_options' => $options,
            ]);
        }
    }

    public function updateItemQuantity($itemId, $quantity): bool
    {
        $item = $this->items()->findOrFail($itemId);

        if ($quantity <= 0) {
            return $item->delete();
        }

        return $item->update([
            'quantity'    => $quantity,
            'total_price' => $item->unit_price * $quantity,
        ]);
    }

    public function removeItem($itemId): bool
    {
        return $this->items()->findOrFail($itemId)->delete();
    }

    public function clear(): void
    {
        $this->items()->delete();
        $this->update([
            'subtotal'        => 0,
            'tax_amount'      => 0,
            'shipping_amount' => 0,
            'discount_amount' => 0,
            'total_amount'    => 0,
        ]);
    }

    public function recalculateTotals(): void
    {
        $subtotal = $this->items()->sum('total_price');

        $this->update([
            'subtotal'     => $subtotal,
            'total_amount' => $subtotal + $this->tax_amount + $this->shipping_amount - $this->discount_amount,
        ]);
    }

    public function getTotalItemsAttribute(): int
    {
        return $this->items()->sum('quantity');
    }

    public function isEmpty(): bool
    {
        return $this->items()->count() === 0;
    }

    public function scopeForUser($query, $userId = null)
    {
        return $query->where('user_id', $userId ?? Auth::id());
    }

    public function scopeForGuest($query, $sessionId = null)
    {
        return $query->where('session_id', $sessionId ?? session()->getId());
    }

    public function scopeActive($query)
    {
        return $query->where(function ($q) {
            $q->whereNotNull('user_id')
                ->orWhere('expires_at', '>', now());
        });
    }
}
