<?php

namespace App\Http\Controllers\Api\ValueGenerator;


use App\Models\Address;
use Illuminate\Support\Str;
use App\Models\PersonalInfo;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;
use App\Models\ValueGenerator;
use App\Http\Controllers\Controller;
use App\Models\ValueGeneratorWallet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;
use Laravel\Passport\RefreshTokenRepository;
use App\Notifications\ValueGeneratorVerifyEmail;
use App\Http\Requests\ValueGenerator\LoginRequest;
use App\Http\Requests\ValueGenerator\RegistrationRequest;
use Laravel\Passport\RefreshToken;
use Laravel\Passport\Token;


class ValueGeneratorAuthController extends Controller
{
    public function registration(RegistrationRequest $request)
    {
        $user = new ValueGenerator();
        $user->user_name = $request->user_name;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->input('password'));
        // $user->password = Hash::make($request->password);
        $user->save();

        //registration notification
        // $user->notify(new ValueGeneratorVerifyEmail($user));
        Notification::send($user, new ValueGeneratorVerifyEmail($user));


        $info = new PersonalInfo();
        $info->value_generator_id = $user->id;
        $info->save();

        $address = new Address();
        $address->value_generator_id = $user->id;
        $address->save();

        $paymentMethod = new PaymentMethod();
        $paymentMethod->value_generator_id = $user->id;
        $paymentMethod->save();

        $walllet = new ValueGeneratorWallet();
        $walllet->value_generator_id = $user->id;
        $walllet->save();

        $data = array(
            'success' => true,
            'message' =>  'Registration Successful!',
            'data' => ['user' => $user],
        );
        return response()->json($data, 201);
    }
    public function login(LoginRequest $request)
    {
        $type = filter_var($request->user_name, FILTER_VALIDATE_EMAIL) ? 'email' : 'user_name';

        $user = ValueGenerator::where($type, $request->user_name)->first();


        if ($user) {
            if (!$user->hasVerifiedEmail()) {
                $data = array(
                    'success' => false,
                    'message' => 'Email not verfied please check your mail and verify email',
                );
                return response()->json($data, 422);
            } elseif (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('accessToken')->accessToken;
                $data = array(
                    'success' => true,
                    'message' => 'Logged in Successfully',
                    'data' => ['user' => $user],
                    'token' => $token
                );
                return response()->json($data, 200);
            } else {
                $data = array(
                    'success' => false,
                    'message' => 'Password mismatch',
                );
                return response($data, 422);
            }
        } else {
            $data = array(
                'success' => false,
                'message' => 'User does not exist',
            );
            return response($data, 422);
        }

    }


    public function socialLogin(Request $request, $provider)
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

        $user = ValueGenerator::where('email', '=', $request->email)->first();
        if (!$user) {
            $user = new ValueGenerator();
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


    public function logout(Request $request)
    {
        // $request->user()->token()->revoke();

        // $refreshTokenRepository = app(RefreshTokenRepository::class);
        // // Revoke all of the token's refresh tokens...
        // $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($request->user()->token()->id);
        $user = Auth::user()->token();
        $user->revoke();
        $data = array(
            'success' => true,
            'message' => 'Successfully logged out!'
        );
        return response()->json($data, 200);
    }
}
