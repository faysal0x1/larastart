<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeerController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//	return Inertia::render('welcome');
//})->name('home');

Route::controller(FrontendController::class)->group(function () {
	Route::get('/', 'index')->name('home');
	Route::get('/client/dashboard', 'clientDashboard')->name('clientDashboa');
});


Route::resource('jobs', JobController::class);

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

	Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');

	Route::any('/posts', [PostController::class, 'index'])
		->name('posts.index');

	Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
	Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
	Route::post('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
	Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');

	Route::post('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
	Route::delete('posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');

	Route::resource('users', UserController::class);
	Route::resource('employers', EmployeerController::class);


	Route::patch('/{model}/{id}', [AdminController::class, 'updateStatus'])
		->name('status.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/faysal.php';
