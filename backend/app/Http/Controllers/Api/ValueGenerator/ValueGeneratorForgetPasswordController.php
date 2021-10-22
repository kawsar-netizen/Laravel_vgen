<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Models\Message;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ValueGenerator;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\ValueGenerator\ResetPasswordRequest;
use App\Http\Requests\ValueGenerator\ForgetPasswordRequest;



class ValueGeneratorForgetPasswordController extends Controller
{
    protected function broker()
    {
        return Password::broker('ValueGenerator');
    }
    public function forgotPassword(ForgetPasswordRequest $request)
    {

        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

              'email' => $request->email,
              'token' => $token
          );
          Mail::send('mails.forgot',$data,function ($message) use($data){
              $message->from('nasimredoy@outlook.com','Vgen Job Portal');
              $message->to($data['email']);
              $message->subject('Reset Your Password');
          });

    public function resetPassword(ResetPasswordRequest $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
