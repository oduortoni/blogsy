<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ApiController::class, 'api']);
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::post('/posts/update/{id}', [PostController::class, 'update'])->name('posts.update');
Route::delete('/posts/delete/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
