<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Admin\LoginRequest;
use Laravel\Passport\RefreshToken;
use Laravel\Passport\Token;

class AdminAuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        $type = filter_var($request->user_name, FILTER_VALIDATE_EMAIL) ? 'email' : 'user_name';
        $user = Admin::where($type, $request->user_name)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $access_token = $user->createToken('accessToken')->accessToken;
                $data = array(
                    'success' => true,
                    'message' =>  'Logged in Successfully',
                    'data' => ['user' => $user],
                    'token' => $access_token
                );
                return response()->json($data, 200);
            } else {
                $data = array(
                    'success' => false,
                    'message' =>  'Password mismatch',
                );
                return response($data, 422);
            }
        } else {
            $data = array(
                'success' => false,
                'message' =>  'User does not exist',
            );
            return response($data, 422);
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::user()->token();
        $user->revoke();

        $data = array(
            'success' => true,
            'message' => 'Successfully logged out!'
        );
        return response()->json($data, 200);
    }
}
