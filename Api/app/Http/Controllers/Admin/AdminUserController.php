<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Controller;
use App\Models\PaymentSettings;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Str;
use Stripe;
use Razorpay\Api\Api;

class AdminUserController extends Controller
{
    public function index(){
        $admin_id = Role::where('title', 'Admin')->first()->id;
        $user_id = Role::where('title', 'User')->first()->id;
        $admins = User::where('role_id', $admin_id)->get();
        $users = User::where('role_id', $user_id)->get();

        return view('Users.users', ['admins' => $admins, 'users' => $users, 'roles' => Role::all()]);
    }

    public function show($id){
        $user = User::find($id);
        if(!$user){
            return back()->with('fail', 'User not found!');
        }
        $settings = PaymentSettings::where('title', 'value_of_referral_points')->first();
        
        $value_of_referral_points = ($settings) ? PaymentSettings::where('title', 'value_of_referral_points')->first()->value : (config('payment.value_of_referral_points'));
        return view('Users.profile', ['user' => $user, 'value_of_referral_points' => $value_of_referral_points]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|between:5,20',
            'full_name' => 'required|string|between:5,30',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);
        if($validator->fails()){
            return back()->with('fail-arr', $validator->errors()->toArray());
        }

        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => ($request->role_id) ? ($request->role_id) : (Role::where('title', 'User')->first()->id),
            'profile_picture' => config('app.default_profile_picture.path').substr($request->username, 0, 2).config('app.default_profile_picture.background'),
            'referral_code' => Str::upper(Str::random(10)),
        ]);

        if($user){
            return back()->with('success', 'New user created successfully!');
        }
        return back()->with('fail', 'Something went wrong! Try again.');
    }

    public function update(Request $request, $id){
        $userController = new UserController;
        $response = $userController->update($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function UpdateAvatar(Request $request, $id){
        $userController = new UserController;
        $response = $userController->update($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', 'User avatar updated!');
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function updatePassword(Request $request, $id){
        $userController = new UserController;
        $response = $userController->updatePassword($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            if($id == Auth::id()){
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                $cookie = Cookie::forget('jwt');
                return redirect()->route('login.view')->withCookie($cookie)->with('success', $res->message);
            }
            // return back()->with();
        }else if($res->status == "fail-arr"){
            return back()->with('fail-arr', $res->message);
        }else{
            return back()->with('fail', $res->message);
        }
    }
    public function setDefaultAvatar(Request $request, $id){
        $userController = new UserController;
        $response = $userController->setDefaultAvatar($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function destroy($id){
        $userController = new UserController;
        $response = $userController->destroy($id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else{
            return back()->with('fail-arr', $res->message);
        }
    }

    public function fillWallet(Request $request, $id){
        $userController = new UserController;
        $response = $userController->fillWallet($request, $id);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else if($res->status == "fail-arr"){
            return back()->with('fail-arr', $res->message);
        }else{
            return back()->with('fail', $res->message);
        }
    }

    public function razorPayment(Request $request)
    {        
        $userController = new UserController;
        $response = $userController->razorPayment($request);
        $res = json_decode($response->content());

        if($res->status == "success"){
            return back()->with('success', $res->message);
        }else if($res->status == "fail-arr"){
            return back()->with('fail-arr', $res->message);
        }else{
            return back()->with('fail', $res->message);
        }
    }
}
