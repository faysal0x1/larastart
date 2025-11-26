<?php
namespace App\Observers;

use App\Models\Brand;
use App\Services\SmartCacheService;

class BrandCacheObserver
{
    public function created(Brand $brand): void
    {
        $this->flushCaches();
    }

    public function updated(Brand $brand): void
    {
        $this->flushCaches();
    }

    public function deleted(Brand $brand): void
    {
        $this->flushCaches();
    }

    private function flushCaches(): void
    {
        SmartCacheService::flush('brands');
        SmartCacheService::flush('products'); // Products might be affected by brand changes
    }
}
