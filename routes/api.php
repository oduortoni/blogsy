<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ApiController::class, 'api']);

/* Auth */
Route::post('/v1/register', [AuthController::class, 'register']);
Route::post('/v1/login', [AuthController::class, 'login']);
Route::post('/v1/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

/* Posts - API v1 */
Route::prefix('v1')->group(function () {
    /* Public routes */
    Route::get('/posts', [PostController::class, 'index'])->name('v1.posts.index');
    Route::get('/posts/featured', [PostController::class, 'featured'])->name('v1.posts.featured');
    Route::get('/posts/{id}', [PostController::class, 'show'])->where('id', '[0-9]+')->name('v1.posts.show');
    
    /* Protected routes */
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/posts', [PostController::class, 'store'])->name('v1.posts.store');
        Route::put('/posts/{id}', [PostController::class, 'update'])->where('id', '[0-9]+')->name('v1.posts.update');
        Route::delete('/posts/{id}', [PostController::class, 'destroy'])->where('id', '[0-9]+')->name('v1.posts.destroy');
        Route::post('/posts/{id}/feature', [PostController::class, 'feature'])->where('id', '[0-9]+')->name('v1.posts.feature');
        Route::delete('/posts/{id}/feature', [PostController::class, 'unfeature'])->where('id', '[0-9]+')->name('v1.posts.unfeature');
        Route::post('/posts/{id}/like', [PostController::class, 'like'])->where('id', '[0-9]+')->name('v1.posts.like');
        Route::delete('/posts/{id}/like', [PostController::class, 'unlike'])->where('id', '[0-9]+')->name('v1.posts.unlike');
        Route::get('/posts/{id}/like', [PostController::class, 'checkLike'])->where('id', '[0-9]+')->name('v1.posts.checkLike');
        
        /* Images */
        Route::post('/images', [ImageController::class, 'upload'])->name('v1.images.upload');
        Route::delete('/images/{id}', [ImageController::class, 'destroy'])->name('v1.images.destroy');
    });
});
