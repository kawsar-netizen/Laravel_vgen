<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use Illuminate\Http\Request;
use App\Models\ValueGenerator;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;

class ValueGeneratorVerifyEmailController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $user = ValueGenerator::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            //return redirect(env('FRONT_URL') . '/email/verify/already-success?type=generator');
            return redirect()->to('http://localhost:3000/valuegenerator/login');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        //return redirect(env('FRONT_URL') . '/email/verify/success?type=generator');
        return redirect()->to('http://localhost:3000/valuegenerator/login');
    }
}
