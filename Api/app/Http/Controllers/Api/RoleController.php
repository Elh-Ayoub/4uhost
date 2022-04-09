<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class RoleController extends Controller
{
    public function index(){
        return Role::all();
    }

    public function show($id){
        $role = Role::find($id);
        if(!$role){
            return response(['status' => 'fail', 'message' => "Role not found!"], 404);
        }
        return $role;
    }

    public function getUsersByRoleId($id){
        return User::where('role_id', $id)->get();
    }
}
