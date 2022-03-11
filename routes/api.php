<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CityController;
use App\Http\Controllers\BoxletterController;
use App\Http\Controllers\Cors;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('example', [ExampleController::class, 'dummy'])->middleware('cors');
   
Route::get('/cities', [CityController::class, 'index']);

Route::get('/cities/{cityName}', [CityController::class, 'checkOutId']);

Route::get('/boxletter', [BoxletterController::class, 'index']);

Route::get('/boxletter/{town}', [BoxletterController::class, 'checkOutTowns']);