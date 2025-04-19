<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeerController;
use App\Http\Controllers\FreelancerController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\MicroJobCategoryController;
use App\Http\Controllers\MicroTaskCategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//	return Inertia::render('welcome');
//})->name('home');

Route::controller(FrontendController::class)->group(function () {
	Route::get('/', 'index')->name('home');
	Route::get('/about', 'about')->name('about');

	Route::get('/how-it-works', 'howItWorks')->name('how-it-works');
	Route::get('/pricing', 'pricing')->name('pricing');


});

Route::resource('jobs', JobController::class);

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('dashboard', function () {
		return Inertia::render('dashboard');
	})->name('dashboard');

	Route::any('/posts', [PostController::class, 'index'])
		->name('posts.index');

	Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
	Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
	Route::post('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

// Edit , Delete , show route for posts

	Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');

	Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');

	Route::post('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
	Route::delete('posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');

	Route::resource('users', UserController::class);
	Route::resource('freelancers', FreelancerController::class);
	Route::resource('employers', EmployeerController::class);

	Route::resource('micro-task-categories', MicroTaskCategoryController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


Route::patch('/{model}/{id}', [AdminController::class, 'update'])
	->name('status.update');
