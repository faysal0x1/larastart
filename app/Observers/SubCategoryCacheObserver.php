<?php
namespace App\Observers;

use App\Models\SubCategory;
use App\Services\SmartCacheService;

class SubCategoryCacheObserver
{
    public function created(SubCategory $subCategory): void
    {
        $this->flushCaches();
    }

    public function updated(SubCategory $subCategory): void
    {
        $this->flushCaches();
    }

    public function deleted(SubCategory $subCategory): void
    {
        $this->flushCaches();
    }

    private function flushCaches(): void
    {
        SmartCacheService::flush('categories');
        SmartCacheService::flush('products'); // Products might be affected by subcategory changes
    }
}
