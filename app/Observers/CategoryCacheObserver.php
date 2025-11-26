<?php
namespace App\Observers;

use App\Models\Category;
use App\Services\SmartCacheService;

class CategoryCacheObserver
{
    public function created(Category $category): void
    {
        $this->flushCaches();
    }

    public function updated(Category $category): void
    {
        $this->flushCaches();
    }

    public function deleted(Category $category): void
    {
        $this->flushCaches();
    }

    private function flushCaches(): void
    {
        SmartCacheService::flush('categories');
        SmartCacheService::flush('products'); // Products might be affected by category changes
    }
}
