<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PaymentSettings;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Str;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users|between:5,20',
            'full_name' => 'required|string|between:5,30',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);
        if($validator->fails()){
            return response(['status' => "fail-arr", 'message' => $validator->errors()->toArray()], 400);
        }
        if($request->referral_code){
            $referral = User::where('referral_code', $request->referral_code)->first();
            if($referral){
                $points = PaymentSettings::where('title', 'number_of_points_for_referral')->first()->value;
                $points += $referral->referral_points; 
                $referral->update(['referral_points' => $points]);
            }
        }
        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => Role::where('title', 'User')->first()->id,
            'profile_picture' => config('app.default_profile_picture.path').substr($request->username, 0, 2).config('app.default_profile_picture.background'),
            'referral_code' => Str::upper(Str::random(10)),
        ]);

        if($user){
            // event(new Registered($user));
            return response(['status' => "success", "message" => "Registration successfully!"], Response::HTTP_OK);
        }
        return response(['status' => 'fail', "message" => "Something went wrong! Try again."], Response::HTTP_EXPECTATION_FAILED);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'identifier' => 'required|string',
            'password' => 'required|string',
        ]);
        if($validator->fails()){
            return response(["status" => "fail-arr", "message" => $validator->errors()->toArray()], 400);
        }
        $credentials = null;
        if(filter_var($request->identifier, FILTER_VALIDATE_EMAIL)) {
            $credentials = ['email' => $request->identifier, 'password' => $request->password];
        }
        else {
            $credentials = ['username' => $request->identifier, 'password' => $request->password];
        }
        if(!Auth::attempt($credentials)){
            return response(['status' => 'fail', 'message' => "No such credentials."], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();
        $token = $user->createToken('Auth-T')->plainTextToken;
        $cookie = cookie('jwt', $token, 60*24);
        
        return response(['status' => 'success', 'message' => "logged in successfully!"])->withCookie($cookie); 
    }

    public function user(){
        return (Auth::user()) ? (Auth::user()) : (response(['status' => 'fail'], Response::HTTP_UNAUTHORIZED));
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');
        return response(['status' => 'success'], 200)->withCookie($cookie);
    }

    function sendResetLink(Request $request){
        $request->validate(['email' => 'required|email']);
 
        $status = Password::sendResetLink(
            $request->only('email')
        );
     
        return $status === Password::RESET_LINK_SENT
                    ? response(['status' => __($status)])
                    : response(['email' => __($status)], Response::HTTP_BAD_REQUEST);
    }

    function resetPassword(Request $request){
        $request->validate([
            'token' => 'required',
            'email' => 'email',
            'password' => 'required|min:8|confirmed',
        ]);
        
        $status = Password::reset(
            array_merge($request->only('email', 'password', 'password_confirmation'), ['token' => $request->token]),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );
        return $status === Password::PASSWORD_RESET
                    ? (view('Auth.reset-success'))
                    : (['fail' => __($status)]);
    }
}
