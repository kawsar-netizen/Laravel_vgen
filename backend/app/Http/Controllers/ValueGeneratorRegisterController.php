<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ValueGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ValueGeneratorVerifyEmail;
use App\Http\Requests\ValueGenerator\RegisterRequest;

class ValueGeneratorRegisterController extends Controller
{
    public function register(RegisterRequest $request){
        $user = new ValueGenerator();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->user_name = $request->user_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
//registration notification
        Notification::send($user, new ValueGeneratorVerifyEmail($user));

        $data = array(
            'success' => true,
            'message' => 'Registration Successfully!',
            'data'    => ['user' => $user]
        );
        return response()->json($data,200);

    }
}
