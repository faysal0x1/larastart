<?php
namespace App\Observers;

use App\Models\Product;
use App\Services\SmartCacheService;

class ProductCacheObserver
{
    public function created(Product $product): void
    {
        $this->flushCaches();
    }

    public function updated(Product $product): void
    {
        $this->flushCaches();
    }

    public function deleted(Product $product): void
    {
        $this->flushCaches();
    }

    private function flushCaches(): void
    {
        SmartCacheService::flush('home');
        SmartCacheService::flush('products');
        SmartCacheService::flush('deals');
    }
}