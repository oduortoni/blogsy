<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PostController;

Route::get('/', [ApiController::class, 'api']);
Route::post('/posts/store', [PostController::class, 'store'])->name('posts.store');
