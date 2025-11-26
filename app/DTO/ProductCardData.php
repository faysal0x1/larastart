<?php

declare(strict_types=1);

namespace App\DTO;

use App\Models\Product;
use Carbon\CarbonInterface;
use App\Support\ImageCacheBuster;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ProductCardData implements Arrayable
{
    public function __construct(
        private array $payload
    ) {
    }

    /**
     * @param  Product  $product
     * @param  array<string, mixed>  $extra
     */
    public static function fromProduct(Product $product, array $extra = []): self
    {
        $updatedAt = self::formatDateTime($product->updated_at);
        $imageUrl  = ImageCacheBuster::fromPath($product->image_url ?: $product->product_thumbnail, $updatedAt);

        $base = [
            'id'                    => $product->id,
            'name'                  => $product->name,
            'slug'                  => $product->slug,
            'unit_price'            => (float) ($product->unit_price ?? 0),
            'final_price'           => (float) ($product->final_price ?? 0),
            'discount_type'         => $product->discount_type,
            'discount_price'        => $product->discount_price ? (float) $product->discount_price : null,
            'call_for_price'        => $product->call_for_price,
            'call_for_price_number' => $product->call_for_price_number,
            'image_url'             => $imageUrl,
            'product_thumbnail'     => $product->product_thumbnail,
            'updated_at'            => $updatedAt,
        ];

        return new self(array_merge($base, $extra));
    }

    public function toArray(): array
    {
        return $this->payload;
    }

    /**
     * @param  iterable<Product>  $products
     * @param  array<string, mixed>|callable(Product):array  $extra
     */
    public static function collection(iterable $products, array|callable $extra = []): Collection
    {
        return collect($products)
            ->map(function (Product $product) use ($extra) {
                $payload = is_callable($extra) ? $extra($product) : $extra;
                return self::fromProduct($product, $payload)->toArray();
            })
            ->values();
    }

    private static function formatDateTime(mixed $value): ?string
    {
        if ($value instanceof CarbonInterface) {
            return $value->toDateTimeString();
        }

        if (is_string($value) && Str::length($value) > 0) {
            return $value;
        }

        return null;
    }
}
