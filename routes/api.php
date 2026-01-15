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
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('v1.posts.show');
    Route::post('/posts', [PostController::class, 'store'])->name('v1.posts.store');
    Route::put('/posts/{id}', [PostController::class, 'update'])->name('v1.posts.update');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('v1.posts.destroy');
    
    /* Images */
    Route::post('/images', [ImageController::class, 'upload'])->name('v1.images.upload');
    Route::delete('/images/{id}', [ImageController::class, 'destroy'])->name('v1.images.destroy');
});
