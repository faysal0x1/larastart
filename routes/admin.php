<?php

use App\Http\Controllers\Admin\ImageUpdateController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');

    // Roles, Permissions, and User Role Assignments routes are now in AccessControl module
    // See: Modules/AccessControl/routes/admin.php

    // Users routes are now in User module
    // See: Modules/User/routes/admin.php

    Route::prefix('admin')->group(function () {
        // Variation types endpoints
        Route::get('variation-types', [ProductController::class, 'variationTypes'])->name('admin.variation.types');
        Route::get('variation-type-values', [ProductController::class, 'variationTypeValues'])->name('admin.variation.type.values');
        Route::post('variation-types', [ProductController::class, 'storeVariationType'])->name('admin.variation.types.store');
        Route::get('variation-types/store', [ProductController::class, 'storeVariationType'])->name('admin.variation.types.store.get');
        Route::get('variation-type-values/store', [ProductController::class, 'storeVariationTypeValue'])->name('admin.variation.type.values.store.get');
    });

    Route::patch('/{model}/{id}/image', [ImageUpdateController::class, 'update'])
        ->name('admin.generic.image.update');
});
