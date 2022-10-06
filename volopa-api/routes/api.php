<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CurrencyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/token/refresh', [AuthController::class, 'tokenRefresh'])->name('api.token.refresh');
    Route::get('/currency/list', [CurrencyController::class, 'currencyList'])->name('api.currency.list');
    Route::get('/currency/convert', [CurrencyController::class, 'currencyConverter'])->name('api.currency.convert');
});
