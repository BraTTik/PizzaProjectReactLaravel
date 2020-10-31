<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('pizza', 'App\Http\Controllers\PizzaController');

Route::get('/pizza', 'App\Http\Controllers\PizzaController@index');
Route::post('/pizza', 'App\Http\Controllers\PizzaController@store');
Route::put('/pizza', 'App\Http\Controllers\PizzaController@update');
Route::delete('/pizza', 'App\Http\Controllers\PizzaController@destroy');

Route::post('/user/register', 'App\Http\Controllers\UserController@store');
Route::post('/user/login', 'App\Http\Controllers\UserController@show');
Route::post('/user/contacts', 'App\Http\Controllers\UserController@update');
Route::get('/user/contacts/{id}', 'App\Http\Controllers\UserController@contacts');

Route::post('/order', 'App\Http\Controllers\OrderController@store');