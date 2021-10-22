<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Models\ValueSeeker;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Notifications\ValueSeekerVerifyEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use App\Http\Requests\ValueSeeker\LoginRequest;
use App\Http\Requests\ValueSeeker\RegistrationRequest;


class ValueSeekerAuthController extends Controller
{

    /**
     * Registration
     */

    public function register(RegistrationRequest $request)
    {
        $user = new ValueSeeker();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->user_name = $request->user_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->active_status = 0;
        $user->save();

        //registration notification
        $user->notify(new ValueSeekerVerifyEmail($user));

        $data = array(
            'success' => true,
            'message' =>  'Registration Successful!',
            'data' => ['user' => $user],
        );
        return response()->json($data, 201);
    }

    /**
     * Login
     */

    public function login(LoginRequest $request)
    {
        $type = filter_var($request->user_name, FILTER_VALIDATE_EMAIL) ? 'email' : 'user_name';
        $user = ValueSeeker::where($type, $request->user_name)->first();

        if (!$user->hasVerifiedEmail()) {
            $data = array(
                'success' => false,
                'message' => 'Email not verfied',
            );
            return response()->json($data, 422);
        } elseif ($user) {

            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('accessToken')->accessToken;
                $data = array(
                    'success' => true,
                    'message' => 'Login Successful!',
                    'data' => ['user' => $user],
                    'token' => $token,
                );
                return response()->json($data, 200);
            } else {
                $data = array(
                    'success' => false,
                    'message' => 'Password mismatch!',
                );
                return response()->json($data, 422);
            }
        } else {
            $data = array(
                'success' => false,
                'message' => 'User does not exist!',
            );
            return response()->json($data, 422);
        }
    }


    /**
     * Logout
     */

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->tokens()->revoke();
            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out!'
            ], 200);
        }
    }


    public function socialUser(Request $request, $provider)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'username' => 'required|string',
                'email' => 'required|string',
                'id' => 'required|numeric',
                'avatar' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => false,
                    'errors' => $validator->errors(),
                ],
                400
            );
        }

        $user = ValueSeeker::where('email', '=', $request->email)->first();
        if (!$user) {
            $user = new ValueSeeker();
            $user->user_name = $request->username;
            $user->email = $request->email;
            $user->provider_id = $request->id;
            $user->avatar = $request->avatar;
            $user->email_verified_at = now();
            $user->password = bcrypt(Str::random(6));
            $user->save();
        }
        if ($user) {
            // assign access token to user
            $token = $user->createToken('token')->accessToken;

            // return access token & user data
            $data = array(
                'success' => true,
                'message' =>  ' Login Successfully',
                'data' => ['user' => $user],
                'token' => $token,
                'provider' => $provider,
            );
            return response()->json($data, 200);
        } else {
            // return access token & user data
            $data = array(
                'success' => false,
                'message' =>  'No Linked Account Found',
            );
            return response()->json($data, 400);
        }
    }
}
