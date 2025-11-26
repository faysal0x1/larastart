<?php

use App\Http\Controllers\Web\WebApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('web')->group(function () {
    Route::get('/products', [WebApiController::class, 'paginatedProducts']);
    Route::get('/best-deals', [WebApiController::class, 'bestDeals']);
    Route::get('/productivity-products', [WebApiController::class, 'productivityProducts']);
    Route::get('/new-selected-products', [WebApiController::class, 'newSelectedProducts']);
    Route::get('/new-at-tbz-products', [WebApiController::class, 'newAtTbzProducts']);
    Route::get('/laptop-section-products', [WebApiController::class, 'laptopSectionProducts']);
    Route::get('/tbz-selected-products', [WebApiController::class, 'tbzSelectedProducts']);
    Route::get('/brands', [WebApiController::class, 'getBrands']);
    Route::get('/categories', [WebApiController::class, 'getCategoriesWithHierarchy'])->name('api.categories');
    Route::get('/category/{categoryId}/products', [WebApiController::class, 'getCategoryProducts']);
    Route::get('/search', [WebApiController::class, 'searchProducts'])->name('api.search');
    Route::get('/cache-version', [WebApiController::class, 'getCacheVersion']);
    Route::get('/products/bulk', [WebApiController::class, 'getProductsByIds'])->name('api.products.bulk');

    // Cache management route (requires token for security)
    Route::post('/cache/clear', [WebApiController::class, 'clearFullCache'])->name('api.cache.clear');
    Route::get('/cache/clear', [WebApiController::class, 'clearFullCache'])->name('api.cache.clear.get');
});
