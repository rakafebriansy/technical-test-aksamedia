<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DivisionController;
use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\AuthenticationException;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class,'login']);
Route::group(['middleware' => 'auth:sanctum'],function() {
    Route::get('/divisions', [DivisionController::class,'index']);
    Route::post('/employees', [EmployeeController::class,'store']);
    Route::get('/employees', [EmployeeController::class,'index']);
});