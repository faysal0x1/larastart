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



Route::controller(FrontendController::class)->group(function () {

	Route::get('/blogs', 'Blog')->name('blogs');
	Route::get('/blogDetail', 'BlogDetail')->name('blogDetail');
	Route::get('/Faq', 'FAQ')->name('Faq');


	// client Section 
	Route::get('/client/dashboard', 'clientDashboard')->name('clientDashboa');


});
