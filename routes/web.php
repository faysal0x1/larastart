<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeerController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\MicroTaskCategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//	return Inertia::render('welcome');
//})->name('home');

Route::controller(FrontendController::class)->group(function () {
	Route::get('/', 'index')->name('home');
	Route::get('/about', 'about')->name('about');

	Route::get('/how-it-works', 'howItWorks')->name('how-it-works');
	Route::get('/pricing', 'pricing')->name('pricing');

	// need to move later 
	Route::get('/employeeDashboard', 'employeeDashboard')->name('employeeDashoard');
	Route::get('/employeeJobsList', 'EmployeeJobsList')->name('jobList');
	Route::get('/JobDetails', 'EmployeeJobDetails')->name('details');
	// auth Route 
	Route::get('/loginEx', 'FreelancerLogin')->name('loginEx');
	Route::get('/SignUp', 'SignupPage')->name('page-signup');
	Route::get('/ForgotPassword', 'ForgotPasswordPage')->name('ForgotPassword');
	Route::get('/OTPVerification', 'OTPVerificationPage')->name('OTPVerification');

	// 
	Route::get('/postJobs', 'JobPostingForm')->name('postJobs');
	Route::get('/SearchPage', 'SearchPage')->name('SearchPage');
	Route::get('/categorySearch', 'categorySearch')->name('categorySearch');
	Route::get('/submit', 'SubmitTask')->name('submitTask');
	Route::get('/upload', 'upload')->name('upload');
	Route::get('/AccountSettings', 'AccountSettings')->name('setting');

	//  employee Dashboard

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
require __DIR__ . '/jayead.php';
require __DIR__ . '/faysal.php';
