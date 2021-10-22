<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Models\ValueSeeker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;

class ValueSeekerVerifyEmailController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $user = ValueSeeker::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            //return redirect(env('FRONT_URL') . '/email/verify/already-success?type=seeker');
            return redirect()->to('http://localhost:3000/valueseeker/login');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        //return redirect(env('FRONT_URL') . '/email/verify/success?type=seeker');
        return redirect()->to('http://localhost:3000/valueseeker/login');
    }
}
