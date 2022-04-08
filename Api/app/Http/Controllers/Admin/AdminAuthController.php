<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $authcontroller = new AuthController;
        $response = $authcontroller->login($request);
        $res = json_decode($response->content());

        if($res->status == "success"){
            if(!$this->isAdmin()){
                return back()->with('fail', "Access is forbidden!");
            }
            return redirect()->route('dashboard');
        }else{
            return back()->with('fail', "Credentail not matching");
        }
        
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $cookie = Cookie::forget('jwt');
        return redirect()->route('login.view')->withCookie($cookie);
    }

    public function isAdmin($user = null){
        if(!$user){
            $user = Auth::user();
        }
        return Auth::user()->role_id == Role::where('title', 'Admin')->first()->id;
    }

    public function sendResetLink(Request $request){
        $authcontroller = new AuthController;
        $response = $authcontroller->sendResetLink($request);
        $res = json_decode($response->content());
        
        if($res->status){
            return back()->with('success', $res->status);
        }else{
            return back()->with('fail', $res->email);
        }
    }
}
