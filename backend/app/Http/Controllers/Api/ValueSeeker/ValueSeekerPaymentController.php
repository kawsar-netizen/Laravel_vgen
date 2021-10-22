<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Models\BankDetail;
use App\Models\PaymentMethod;
use App\Models\MobileBankDetail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ValueSeeker\PaymentProfileRequest;

class ValueSeekerPaymentController extends Controller
{
    public function updatePaymentProfile(PaymentProfileRequest $request)
    {
        $id = Auth::guard('vs-api')->user()->id;
        $Value_seeker_payment = PaymentMethod::where('value_seeker_id', $id)->first();
        $payment = PaymentMethod::find($Value_seeker_payment->id);
        if ($request->has(['bank_status']) && $request->input('bank_status') == true) {
            $payment->bank_status = true;
            $payment->save();

            $bank = new BankDetail();
            $bank->bank_name = $request->bank_name;
            $bank->account_no = $request->account_no;
            $bank->account_holder_name = $request->account_holder_name;
            $bank->branch_name = $request->branch_name;
            $bank->value_seeker_id = $id;
            $bank->save();
        }

        if ($request->has(['mobile_banking_status']) && $request->input('mobile_banking_status') == true) {
            $payment->mobile_banking_status = true;
            $payment->save();

            $mobile_bank = new MobileBankDetail();
            $mobile_bank->mobile_bank_type = $request->mobile_bank_type;
            $mobile_bank->account_no = $request->mobile_account_no;
            $mobile_bank->value_seeker_id = $id;
            $mobile_bank->save();
        }

        $data = array(
            'success' => true,
            'message' => 'Payment Method Updated',
            'data' => ['bank_details' => $bank, 'mobile_banking_details' => $mobile_bank],
        );

        return response()->json($data, 200);
    }
}
