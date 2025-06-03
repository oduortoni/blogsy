<?php

use App\Http\Controllers\SPAController;
use Illuminate\Support\Facades\Route;

/* will serve our SPA index.html file */
Route::get('/{any}', [SPAController::class, 'index'])->where('any', '.*');
