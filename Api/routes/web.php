<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/////////////////////// ----Authentication module---- ///////////////////////
//reset password form
Route::get('/reset-password/{token}', function (Request $request, $token) {
    return view('Auth.reset-password', ['token' => $token, 'email' => $request->email]);
})->middleware('guest')->name('password.reset');
//Admin panel auth
Route::middleware('auth.check')->group(function(){
    Route::get("admin/auth/login", function(){return view('Auth.login');})->name('login.view');
    Route::post("admin/auth/login", [AdminAuthController::class, 'login'])->name('login');
    Route::get("admin/auth/logout", [AdminAuthController::class, 'logout'])->name('logout.admin');
    Route::get("admin/auth/forgot-password", function(){return view('Auth.forget_password');})->name('forget_password.view');
    Route::post("admin/auth/forgot-password", [AdminAuthController::class, "sendResetLink"])->name('forget_password.send');
});
Route::middleware('auth:sanctum')->group(function(){
    Route::get("admin/dashboard", function(){
        $admin_id = Role::where('title', 'Admin')->first()->id;
        $user_id = Role::where('title', 'User')->first()->id;
        $admins = User::where('role_id', $admin_id)->get();
        $users = User::where('role_id', $user_id)->get();
        return view('dashboard', ['admins' => count($admins), 'users' => count($users)]);
    })->name('dashboard');
});