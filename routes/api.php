<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ApiController::class, 'api']);

/* Posts - API v1 */
Route::prefix('v1')->group(function () {
    /* Posts */
    Route::get('/posts', [PostController::class, 'index'])->name('v1.posts.index');
    Route::get('/posts/featured', [PostController::class, 'featured'])->name('v1.posts.featured');
    Route::post('/posts', [PostController::class, 'store'])->name('v1.posts.store');
    Route::get('/posts/{id}', [PostController::class, 'show'])->where('id', '[0-9]+')->name('v1.posts.show');
    Route::put('/posts/{id}', [PostController::class, 'update'])->where('id', '[0-9]+')->name('v1.posts.update');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->where('id', '[0-9]+')->name('v1.posts.destroy');
    Route::post('/posts/{id}/feature', [PostController::class, 'feature'])->where('id', '[0-9]+')->name('v1.posts.feature');
    Route::delete('/posts/{id}/feature', [PostController::class, 'unfeature'])->where('id', '[0-9]+')->name('v1.posts.unfeature');
    
    /* Images */
    Route::post('/images', [ImageController::class, 'upload'])->name('v1.images.upload');
    Route::delete('/images/{id}', [ImageController::class, 'destroy'])->name('v1.images.destroy');
});
