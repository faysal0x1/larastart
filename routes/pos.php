<?php

declare(strict_types=1);

use App\Http\Controllers\Pos\PosController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin/pos')->as('admin.')->group(function () {
        Route::get('/', [PosController::class, 'index'])
			->name('pos.index');
        Route::get('/cart', [PosController::class, 'cart'])->name('pos.cart');
        Route::get('/reports', [PosController::class, 'reports'])->name('pos.reports');
        Route::get('/hold-list', [PosController::class, 'holdList'])->name('pos.hold-list');
        Route::get('/recent-transactions', [PosController::class, 'recentTransactions'])->name('pos.recent-transactions');
    });
});
