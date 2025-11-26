<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\Web\WebController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Chat routes
    Route::prefix('chat')->group(function () {
        Route::get('/', [ChatController::class, 'index'])->name('chat.index');
        Route::post('/start', [ChatController::class, 'startConversation'])->name('chat.start');
        Route::post('/group', [ChatController::class, 'createGroup'])->name('chat.group.create');
        Route::get('/{conversation}', [ChatController::class, 'show'])->name('chat.show');
        Route::post('/{conversation}/message', [ChatController::class, 'storeMessage'])->name('chat.message.store');
    });
});

Route::prefix('web')->group(function () {
    Route::get('/web/get-products', [WebController::class, 'getProducts']);
    Route::get('/web/deal-of-the-day', [WebController::class, 'dealOfTheDay']);
    Route::post('web/add-to-cart', [WebController::class, 'addToCart']);
    Route::get('/web/brand-product', [WebController::class, 'getBrandProduct']);
    Route::get('/web/category-product', [WebController::class, 'getCategoryProduct']);
});

Route::middleware(['auth', 'verified'])->get('/payment/demo', [WebController::class, 'paymentDemo'])->name('payment.demo');