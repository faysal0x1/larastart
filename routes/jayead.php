<?php

// use App\Http\Controllers\FrontendController;

use App\Http\Controllers\EmonController;
use App\Http\Controllers\JayeadController;
use App\Http\Controllers\UserLocationController;
use Illuminate\Support\Facades\Route;

Route::controller(JayeadController::class)->group(function () {



    Route::get('/productDetails', 'ProductDetails')->name('product.details');
    Route::get('/pc-builder', 'pcBuilder')->name('pc.builder');

    Route::get('/cart', 'cart')->name('shop.cart');
    Route::get('/checkout', 'checkout')->name('checkout'); //Need to delete Page 
    Route::get('/order/success', 'orderSuccess')->name('order.success');
    Route::get('/order/failure', 'orderFailure')->name('order.failure');
    Route::get('/test-success', 'testOrderSuccess')->name('test.success');
    Route::get('/deal', 'DealPage')->name('deal.page');
    Route::get('/trending-deals', 'TrendingDealsPage')->name('trending.deals');
    Route::get('/best-sellers', 'BestSellersPage')->name('best.sellers');
    Route::get('/clearance', 'ClearancePage')->name('clearance.page');
    Route::get('/intel-gamer-days', 'IntelGamerDaysPage')->name('intel.gamer.days');
    Route::get('/free-gift-amd', 'FreeGiftAmdPage')->name('free.gift.amd');
    // Something is Coming Page
    Route::get('/something-is-coming', 'SomethingComing')->name('something.coming');
    Route::get('/gamer-community', 'GamerCommunityPage')->name('gamer.community');
    Route::get('/clearance-deals', 'ClearanceDealsPage')->name('clearance.deals');
    Route::get('/refreshed-like-new', 'RefreshedLikeNewPage')->name('refreshed.like.new');
    Route::get('/store-credit-card', 'StoreCreditCardPage')->name('store.credit.card');
    Route::get('/pc-upgrader', 'PcUpgraderPage')->name('pc.upgrader');
    Route::get('/gaming-pc-finder', 'GamingPcFinderPage')->name('gaming.pc.finder');
    Route::get('/network-builder', 'NetworkBuilderPage')->name('network.builder');
    // Addresses and Locations handled by UserLocationController
    Route::middleware(['auth'])->group(function () {
        Route::get('/user/addresses', [UserLocationController::class, 'listUserAddresses'])->name('user.addresses.index');
        Route::post('/user/addresses', [UserLocationController::class, 'storeUserAddress'])->name('user.addresses.store');
        Route::put('/user/addresses/{id}', [UserLocationController::class, 'updateUserAddress'])->name('user.addresses.update');
        Route::delete('/user/addresses/{id}', [UserLocationController::class, 'deleteUserAddress'])->name('user.addresses.delete');
        Route::patch('/user/addresses/{id}/set-default', [UserLocationController::class, 'setDefaultUserAddress'])->name('user.addresses.set-default');
        Route::patch('/user/addresses/{id}/activate', [UserLocationController::class, 'activateUserAddress'])->name('user.addresses.activate');
    });
    Route::get('/brands', 'BrandsPage')->name('brands.page');
    Route::get('/category/responce', 'getCategories')->name('responce.category');
    // Public location lookups
    Route::get('/locations/divisions', [UserLocationController::class, 'listDivisions'])->name('locations.divisions');
    Route::get('/locations/districts', [UserLocationController::class, 'listDistricts'])->name('locations.districts');
    Route::get('/locations/upazillas', [UserLocationController::class, 'listUpazillas'])->name('locations.upazillas');
    // Brands
    Route::get('/brands/featured', 'getFeaturedBrands')->name('brands.featured');
    Route::get('/brands/all', 'getAllBrands')->name('brands.all');
    Route::get('/brands/by-letter', 'getBrandsByLetter')->name('brands.by-letter');
    // Newsletter
    Route::post('/newsletter/subscribe', 'subscribeNewsletter')->name('newsletter.subscribe');
    // Product Reviews (require authentication)
    Route::middleware(['auth'])->group(function () {
        Route::post('/product/{id}/review', 'storeProductReview')->name('product.review.store');
    });

    // ===================== Jayead Controller =====================
    Route::get('/products/category/{slug}', 'categoryProducts')->name('jayead.products.category');
    Route::get('/products/brand/{slug}', 'brandProducts')->name('jayead.products.brand');

    // =====User Dashboard Page====
    Route::get('/user/dashboard', 'userDashboard')->name('client.dashboard');

    // =====User API Endpoints====
    Route::middleware(['auth'])->group(function () {
        Route::get('/api/user/data', 'getUserData')->name('api.user.data');
        Route::put('/api/user/update', 'updateUserData')->name('api.user.update');
        Route::post('/api/user/upload-avatar', 'uploadProfilePicture')->name('api.user.upload-avatar');
        Route::post('/api/user/change-password', 'changePassword')->name('api.user.change-password');

        // Order API endpoints
        Route::get('/api/user/orders', 'getUserOrders')->name('api.user.orders');
        Route::get('/api/user/orders/statistics', 'getOrderStatistics')->name('api.user.orders.statistics');
        Route::get('/api/user/orders/{orderId}', 'getOrderDetails')->name('api.user.orders.details');
        Route::post('/api/user/orders/{orderId}/cancel', 'cancelOrder')->name('api.user.orders.cancel');
    });
});

Route::get('/web/random-products', [JayeadController::class, 'getRandomProducts']);

// ===================== Emon Controller =====================
Route::controller(EmonController::class)->group(function () {
    Route::get('/shop/cart', 'shopcart')->name('shopcart');
    Route::get('/checkout', 'checkout')->name('checkoutt');
});
