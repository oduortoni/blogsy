<?php

use App\Http\Controllers\SPAController;
use Illuminate\Support\Facades\Route;

/* will serve our SPA index.html file */
Route::get('/', [SPAController::class, 'index'])->name('index');
Route::fallback(function () {
    return view('index');
});
