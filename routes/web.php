<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;

Route::controller(FrontendController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/about', 'about')->name('about');
    Route::get('/category', 'Category')->name('category.memory');
    Route::get('/details', 'ProductDetailsPage')->name('details');
    Route::get('/all-products', 'AllProducts')->name('products.index');
});


// Route::get('/product', [\App\Http\Controllers\FrontendController::class, 'product'])
//     ->name('frontend.product');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');

    Route::patch('/{model}/{id}', [AdminController::class, 'updateStatus'])
        ->name('status.update');

    // Cache management route
    Route::post('/cache/clear', [\App\Http\Controllers\Web\WebApiController::class, 'clearFullCache'])
        ->name('cache.clear');
});

// Payment Demo Page (Inertia)

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/jayead.php';
require __DIR__ . '/faysal.php';
require __DIR__ . '/emon.php';

require __DIR__ . '/admin_new.php';
require __DIR__ . '/pos.php';
require __DIR__ . '/web_api.php';
require __DIR__ . '/dashboard.php';

// Language switching routes
// Route::get('/language/switch/{locale}', [LanguageController::class, 'switchLanguage'])->name('language.switch');
// Route::get('/language', [LanguageController::class, 'getLanguages'])->name('language.list');
// Route::get('/language-test', [LanguageController::class, 'test'])->name('language.test');

Route::get('/payment/thank-you', function () {
    return view('payment.thank_you');
});

Route::get('/payment/failed', function () {
    return view('payment.failed');
});

Route::get('/payment/cancelled', function () {
    return view('payment.cancelled');
});

// Specs options for admin product create UI
Route::get('/admin/specs/options', [ProductController::class, 'specOptions'])
    ->name('admin.specs.options');

// Order matters: check nested categories first, then single slug
Route::controller(FrontendController::class)->group(function () {
    // Nested category routes: parent/sub/child (3 levels)
    Route::get('/{parentSlug}/{subSlug}/{childSlug}', 'categoryProductsPage')
        ->where('parentSlug', '^(?!admin|dashboard|payment|api|about|category|products|settings|login|register|password|cart|checkout|web_api|faysal|emon|admin_new|all-products|roles|permissions|user-role-assignments|users)[A-Za-z0-9-]+$')
        ->where('subSlug', '^[A-Za-z0-9-]+$')
        ->where('childSlug', '^[A-Za-z0-9-]+$')
        ->name('web.category.nested.child');

    // Nested category routes: parent/sub (2 levels)
    Route::get('/{parentSlug}/{subSlug}', 'categoryProductsPage')
        ->where('parentSlug', '^(?!admin|dashboard|payment|api|about|category|products|settings|login|register|password|cart|checkout|web_api|faysal|emon|admin_new|all-products|roles|permissions|user-role-assignments|users)[A-Za-z0-9-]+$')
        ->where('subSlug', '^[A-Za-z0-9-]+$')
        ->name('web.category.nested.sub');

    // Single slug route (products, brands, root categories)
    Route::get('/{slug}', 'slugRoute')
        ->where('slug', '^(?!admin|dashboard|payment|api|about|category|products|settings|login|register|password|cart|checkout|web_api|faysal|emon|admin_new|all-products|roles|permissions|user-role-assignments|users)[A-Za-z0-9-]+$')
        ->name('web.slug');
});