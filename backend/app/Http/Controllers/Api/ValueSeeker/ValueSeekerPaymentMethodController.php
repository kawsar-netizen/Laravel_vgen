<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Requests\ValueSeeker\SeekerAddBankRequest;
use App\Http\Requests\ValueSeeker\SeekerAddMobileBankRequest;
use App\Models\BankDetail;
use App\Models\PaymentMethod;
use App\Models\MobileBankDetail;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ValueSeeker\PaymentProfileRequest;
use App\Models\Bank;
use App\Models\MobileBank;




class ValueSeekerPaymentMethodController extends Controller
{

    public function showAdminBankList(){
        try {

            $bank = Bank::select('bank_name')->get();
            return response()->json([
                'BankName' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage(),
            ]);
        }
    }
    public function addBank(SeekerAddBankRequest $request){
        try {


            $id = Auth::guard('vs-api')->user()->id;
            $value_seeker_payment_method = PaymentMethod::where('value_seeker_id', $id)->first();

            if (empty($value_seeker_payment_method)){
                $value_seeker_payment_method = new PaymentMethod();
                $value_seeker_payment_method ->value_seeker_id = $id;
                $value_seeker_payment_method -> save();
            }

            $payment = PaymentMethod::find($value_seeker_payment_method->id);
            $payment->bank_status = true;
            $payment->save();

            $bank = new BankDetail();
            $bank->bank_name = $request->bank_name;
            $bank->account_no = $request->account_no;
            $bank->account_holder_name = $request->account_holder_name;
            $bank->branch_name = $request->branch_name;
            $bank->value_seeker_id = $id;
            $bank->save();

            return response()->json([
                'Message' => "Bank Added Successfully",
                'Bank' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage(),
            ],404);
        }
    }

    public function showValueSeekerBankList(){
        try {

            $bank = BankDetail::all();
            return response()->json([
                'BankName' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage()
            ]);
        }
    }
    public function removeBank($id){
        try {
            $bank = BankDetail::find($id)->delete();
            return response()->json([
                'Message' => 'Bank Deleted Successfully'
            ],200);
        }catch(Exception $exception){
            response()->json([
                'Message' => $exception->getMessage(),
            ],404);
        }
    }


    public function showAdminMobileBankList(){
        try {

            $bank = MobileBank::select('wallet_name')->get();
            return response()->json([
                'BankName' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage(),
            ]);
        }
    }
    public function addMobileBank(SeekerAddMobileBankRequest $request){
        try {

            $id = Auth::guard('vs-api')->user()->id;
            $value_seeker_payment_method = PaymentMethod::where('value_seeker_id', $id)->first();

            if (empty($value_seeker_payment_method)){
                $value_seeker_payment_method = new PaymentMethod();
                $value_seeker_payment_method -> value_seeker_id = $id;
                $value_seeker_payment_method -> save();
            }

            $payment = PaymentMethod::find($value_seeker_payment_method->id);
            $payment->bank_status = true;
            $payment->save();

            $bank = new MobileBankDetail();
            $bank->mobile_bank_type = $request->mobile_bank_type;
            $bank->account_no = $request->account_no;
            $bank->value_seeker_id = $id;
            $bank->save();

            return response()->json([
                'Message' => "Bank Added Successfully",
                'Bank' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage(),
            ],404);
        }
    }

    public function showSeekerMobileBankList(){
        try {

            $bank = MobileBankDetail::select('id','mobile_bank_type','account_no')->get();
            return response()->json([
                'BankName' => $bank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage()
            ]);
        }
    }

    public function removeMobileBank($id){
        try {
            $bank = MobileBankDetail::find($id)->delete();
            return response()->json([
                'Message' => 'Bank Deleted Successfully'
            ],200);
        }catch(Exception $exception){
            response()->json([
                'Message' => $exception->getMessage(),
            ],404);
        }
    }
}