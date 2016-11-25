<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use App\User;
//use Request;
use Illuminate\Http\Request;

use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Log;
use Hash;
class JwtAuthenticateController extends Controller
{

    private $jwtauth;

    public function __construct(JWTAuth $jwtauth)
    {
        $this->jwtauth = $jwtauth;
    }


    public function index(){
      return response()->json(['auth'=>Auth::user()]);

    }

    public function getUsers(){
        $users = User::all();
        foreach ($users as $user){
            $userProfile[] = array('email'=>$user->email,'profile'=>$user->roles()->get()->pluck('name'));
        }

        return response()->json($userProfile);
    }

    public function checkRole(Request $request){
        $user = User::where('email', '=', $request->input('email'))->first();
        $roles = $user->roles()->get();
        foreach ($roles as $role){
            $perms[] = array('role'=>$role->name,'perm'=>$role->perms()->get()->pluck('name'));
        }
        return response()->json($perms);
    }


    public function hasPermissions(Request $request){
        $role = Role::where('name', '=', $request->input('name'))->first();
        $perms = $role->perms()->get();
        return response()->json($perms->pluck('name'));
    }
    public function restricted(){
        try {
            JWTAuth::parseToken()->toUser();
        } catch (Exception $e) {
            return Response::json(['error' => $e->getMessage()], HttpResponse::HTTP_UNAUTHORIZED);
        }

        return ['data' => 'This has come from a dedicated API subdomain with restricted access.'];
    }

    public function authenticate(Request $request){
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // all good so return the token
        return response()->json(compact('token'));
    }

    public function createRole(Request $request){
        $role = new Role();
        $role->name = $request->input('name');
        $role->save();

        return response()->json($role->name);
    }
    public function createPermission(Request $request){
        $viewUsers = new Permission();
        $viewUsers->name = $request->input('name');
        $viewUsers->save();

        return response()->json("created");
    }

    public function assignRole(Request $request){
        $user = User::where('email', '=', $request->input('email'))->first();

        $role = Role::where('name', '=', $request->input('name'))->first();

        $user->attachRole($role);
        // $user->roles()->attach($role->id);

        return response()->json("created");
    }

    public function attachPermission(Request $request){

        $role = Role::where('name', '=', $request->input('role'))->first();

        $permissionNames = $request->input('name');

        $permissions = Permission::whereIn('name', $permissionNames)->get();

        $role->attachPermissions($permissions);

        return response()->json("done");
    }

    public function getAllRole(){
        $roles = Role::all()->pluck('name');
        return response()->json($roles);
    }

    public function resetPassword(Request $request){
        $user = User::where('email', '=', $request->input('email'))->first();
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json("done");
    }

    public function saveUser(Request $request){
        $user = new User();
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json("created");
    }

    public function searchUserByEmail(Request $request){
        $email = $request->input('email');
        $user = User::where('email',$email)->first();
        return response()->json($user);
    }
}
