<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use App\Http\Requests\ValueSeeker\ForgetPasswordRequest;
use App\Http\Requests\ValueSeeker\ResetPasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Message;
use Illuminate\Support\Facades\Mail;
use App\Models\ValueSeeker;

class ValueSeekerForgetPasswordController extends Controller
{
    public function forgotPassword(ForgetPasswordRequest $request)
    {

        $email = $request->input('email');
        if (ValueSeeker::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'Value Seeker Does\'t exists'
            ], 404);
        }
        $token = Str::random(10);

        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);
            //Send Email
            $data = array(

                'email' => $request->email,
                'token' => $token
            );
            Mail::send('mails.forgot', $data, function ($message) use ($data) {
                $message->from('saqlain@gmail.com', 'Vgen Job Portal');
                $message->to($data['email']);
                $message->subject('Reset Your Password');
            });

            return response([
                'message' => 'Check Your Email'
            ]);
        } catch (\Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $token = $request->input('token');
        $passwordResets = DB::table('password_resets')->where('token', $token)->first();
        if (!$passwordResets) {
            return response([
                'message' => 'Invalid Token'
            ], 404);
        }
        $valueGenerator = ValueSeeker::where('email', $passwordResets->email)->first();
        if (!$valueGenerator) {
            return response([
                'message' => 'Value Seeker Does\'t exists'
            ], 404);
        }

        //Update Password
        $valueGenerator->password = bcrypt($request->input('password'));
        $valueGenerator->save();
        return response([
            'success' => true,
            'message' => 'Password Successfully Updated',
        ]);
    }
}
