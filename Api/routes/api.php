<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
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

/////////////////////// ----Authentication module---- ///////////////////////
Route::post("/auth/register", [AuthController::class, 'register']);
Route::post("/auth/login", [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::get("/auth/user", [AuthController::class, 'user']);
    Route::post("/auth/logout", [AuthController::class, 'logout']);
});
//Send reset password link
Route::post('auth/forgot-password',[AuthController::class, 'sendResetLink']);
//Reset password
Route::patch('auth/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');

/////////////////////// ----User module---- ///////////////////////

Route::get("/users", [UserController::class, 'index']);
Route::get("/users/{id}", [UserController::class, 'show']);
Route::patch("/users/{id}", [UserController::class, 'update'])->middleware('auth:sanctum');
Route::patch("/users/{id}/password", [UserController::class, 'updatePassword'])->middleware('auth:sanctum');
Route::delete("/users/{id}/avatar", [UserController::class, 'setDefaultAvatar'])->middleware('auth:sanctum');
Route::delete("/users/{id}", [UserController::class, 'destroy'])->middleware('auth:sanctum');

/////////////////////// ----Role module---- ///////////////////////
Route::get("/roles", [RoleController::class, 'index']);
Route::get("/roles/{id}", [RoleController::class, 'show']);
Route::get("/roles/{id}/users", [RoleController::class, 'getUsersByRoleId']);
