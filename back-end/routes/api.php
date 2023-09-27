<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post("/signup",[UserController::class,"store"]);
Route::post("/login",[UserController::class,"login"]);
Route::post("/profile/image",[UserController::class,"uploadImage"]);
Route::get("/posts",[PostController::class,"index"]);
Route::get("/posts/{id}",[PostController::class,"details"]);
Route::post("/post",[PostController::class,"store"]);