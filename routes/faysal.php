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
