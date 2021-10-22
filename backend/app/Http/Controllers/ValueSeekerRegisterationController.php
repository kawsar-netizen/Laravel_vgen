<?php

namespace App\Http\Controllers;

use App\Models\ValueSeeker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ValueSeekerVerifyEmail;
use App\Http\Requests\ValueSeeker\RegisterationRequest;

class ValueSeekerRegisterationController extends Controller
{
    public function registeration(RegisterationRequest $request){
        $user = new ValueSeeker();
        $user->first_name = $request->first_name;
        $user->last_name  = $request->last_name;
        $user->user_name  = $request->user_name;
        $user->email  = $request->email;
        $user->password   = Hash::make($request->password);
        $user->save();
//registration notification
         Notification::send($user, new ValueSeekerVerifyEmail($user));

        $data = array(
            'success' => true,
            'message' => 'Registration Successfully!',
            'data'    => ['user' => $user]
        );
        return response()->json($data,200);
    }
}
