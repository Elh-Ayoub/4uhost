<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminPaymentSettings;
use App\Http\Controllers\Admin\AdminPlanController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Models\Purchase;
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

Route::group([ 'middleware' => 'auth:sanctum','prefix' => 'admin',], function () {
    //dashboard
    Route::get("dashboard", function(){
        $admin_id = Role::where('title', 'Admin')->first()->id;
        $user_id = Role::where('title', 'User')->first()->id;
        $admins = User::where('role_id', $admin_id)->get();
        $users = User::where('role_id', $user_id)->get();
        return view('dashboard', ['admins' => count($admins), 'users' => count($users)]);
    })->name('dashboard');

    /////////////////////// ----User module---- ///////////////////////
    Route::get('users', [AdminUserController::class, 'index'])->name('users.admin');
    Route::post('users', [AdminUserController::class, 'store'])->name('users.admin.store');
    Route::get('users/{id}',[AdminUserController::class, 'show'])->name("users.show");
    Route::patch('users/{id}/password', [AdminUserController::class, 'updatePassword'])->name('users.password.update');
    Route::patch('users/{id}/avatar', [AdminUserController::class, 'UpdateAvatar'])->name('users.update.avatar');
    Route::delete('users/{id}/avatar', [AdminUserController::class, 'setDefaultAvatar'])->name('users.delete.avatar');
    Route::patch('users/{id}',[AdminUserController::class, 'update'])->name('users.update');
    Route::delete('users/{id}',[AdminUserController::class, 'destroy'])->name('users.delete');
    //wallet
    Route::post("/users/{id}/fill-wallet", [AdminUserController::class, 'fillWallet'])->name('add.balance');
    /////////////////////// ----Role module---- ///////////////////////
    Route::get('roles', [AdminRoleController::class, 'index'])->name('roles.admin');
    Route::post('roles', [AdminRoleController::class, 'store'])->name('roles.admin.create');
    Route::patch('roles/{id}', [AdminRoleController::class, 'update'])->name('roles.admin.update');
    Route::delete('roles/{id}', [AdminRoleController::class, 'destroy'])->name('roles.admin.delete');

    /////////////////////// ----Payment settings---- ///////////////////////
    Route::get('payment-settings', [AdminPaymentSettings::class, 'index'])->name('payment.settings');
    Route::patch('payment-settings/{id}', [AdminPaymentSettings::class, 'update'])->name('payment.settings.update');

    /////////////////////// ----Hosting plans module---- ///////////////////////
    Route::get('plans/storage', [AdminPlanController::class, 'storagePlans'])->name('storage.plans');
    Route::get('plans/web-hosting', [AdminPlanController::class, 'webHostingPlans'])->name('webHosting.plans');
    Route::get('plans/emails', [AdminPlanController::class, 'emailPlans'])->name('email.plans');
    Route::get('plans/domains', [AdminPlanController::class, 'domainsPlans'])->name('domains.plans');
    Route::get('plans/backup', [AdminPlanController::class, 'backupPlans'])->name('backup.plans');
    
    Route::post('plans', [AdminPlanController::class, 'store'])->name('plans.store');
    Route::patch('plans/{id}', [AdminPlanController::class, 'update'])->name('plans.update');
    Route::delete('plans/{id}', [AdminPlanController::class, 'destroy'])->name('plans.delete');

    /////////////////////// ----Purchase module---- ///////////////////////
    Route::get('purchases', function(){
        return view('Purchases.purchases', ['purchases' => Purchase::orderBy('created_at', 'desc')->simplePaginate(15)]);
    })->name('purchases');
});