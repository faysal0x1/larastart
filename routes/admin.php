<?php


use App\Http\Controllers\Admin\BlogCategoryController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserRoleAssignmentController;
use App\Http\Controllers\FreelancerController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
	Route::get('posts/{id}', [PostController::class, 'show'])->name('posts.show');

	Route::resource('roles', RoleController::class);
	Route::resource('permissions', PermissionController::class);
	Route::resource('user-role-assignments', UserRoleAssignmentController::class);


	Route::prefix('admin')->group(function () {
		Route::resource('country', CountryController::class);
		Route::resource('blog-category', BlogCategoryController::class);
		Route::resource('blogs', BlogController::class);
	});
});
