<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SPAController;

/* will serve our SPA index.html file */
Route::get('/', [SPAController::class, 'index']);
