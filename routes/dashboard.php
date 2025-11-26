<?php

// =====User Dashboard Page====
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::controller(DashboardController::class)->group(function () {
    Route::get('/user/dashboard', 'userDashboard')->name('client.dashboard');

});
