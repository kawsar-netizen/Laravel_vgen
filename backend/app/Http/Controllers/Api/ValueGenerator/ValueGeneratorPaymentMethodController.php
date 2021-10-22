<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Http\Requests\ValueGenerator\GeneratorAddBankRequest;
use App\Http\Requests\ValueGenerator\GeneratorAddMobileBankRequest;
use App\Models\BankDetail;
use App\Models\PaymentMethod;
use App\Models\MobileBankDetail;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ValueGenerator\PaymentProfileRequest;
use App\Models\Bank;
use App\Models\MobileBank;




class ValueGeneratorPaymentMethodController extends Controller
{
    public function showPayment(){
        try {
            $bank = Bank::select('bank_name')->get();
            $mobileBank = MobileBank::select('wallet_name')->get();
            return response()->json([
                'BankName' => $bank ,
                'mobileBankName' => $mobileBank,
            ],200);
        }catch (\Exception $exception){
            return response()->json([
                'Message' => $exception->getMessage(),
            ]);
        }
    }

    public function profilePayment(PaymentProfileRequest $request)
    {
        $id = Auth::guard('vg-api')->user()->id;
        $value_generator_payment_method = PaymentMethod::where('value_generator_id', $id)->first();

        if (empty($value_generator_payment_method)){
            $value_generator_payment_method = new PaymentMethod();
            $value_generator_payment_method -> value_generator_id = $id ;
            $value_generator_payment_method -> save();
        }

         $payment = PaymentMethod::find($value_generator_payment_method->id);


        if ($request->has(['bank_status']) && $request->input('bank_status') == true) {

            $payment->bank_status = true;
            $payment->save();

            $bank = new BankDetail();
            $bank->bank_name = $request->bank_name;
            $bank->account_no = $request->account_no;
            $bank->account_holder_name = $request->account_holder_name;
            $bank->branch_name = $request->branch_name;
            $bank->value_generator_id = $id;
            $bank->save();
        }

        if ($request->has(['mobile_banking_status']) && $request->input('mobile_banking_status') == true) {
            $payment->mobile_banking_status = true;
            $payment->save();

            $mobile_bank = new MobileBankDetail();
            $mobile_bank->mobile_bank_type = $request->mobile_bank_type;
            $mobile_bank->account_no = $request->mobile_account_no;
            $mobile_bank->value_generator_id = $id;
            $mobile_bank->save();
        }
        $data = array(
            'success' => true,
            'message' => 'Payment Method Updated',

        );
        return response()->json($data, 200);
    }

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
    public function addBank(GeneratorAddBankRequest $request){
        try {


            $id = Auth::guard('vg-api')->user()->id;
            $value_generator_payment_method = PaymentMethod::where('value_generator_id', $id)->first();

            if (empty($value_generator_payment_method)){
                $value_generator_payment_method = new PaymentMethod();
                $value_generator_payment_method -> value_generator_id = $id;
                $value_generator_payment_method -> save();
            }

            $payment = PaymentMethod::find($value_generator_payment_method->id);
            $payment->bank_status = true;
            $payment->save();

            $bank = new BankDetail();
            $bank->bank_name = $request->bank_name;
            $bank->account_no = $request->account_no;
            $bank->account_holder_name = $request->account_holder_name;
            $bank->branch_name = $request->branch_name;
            $bank->value_generator_id = $id;
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

    public function showGeneratorBankList(){
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
                'Message' => 'Bank Deleted Successfully & done '
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
    public function addMobileBank(GeneratorAddMobileBankRequest $request){
        try {

            $id = Auth::guard('vg-api')->user()->id;
            $value_generator_payment_method = PaymentMethod::where('value_generator_id', $id)->first();

            if (empty($value_generator_payment_method)){
                $value_generator_payment_method = new PaymentMethod();
                $value_generator_payment_method -> value_generator_id = $id;
                $value_generator_payment_method -> save();
            }

            $payment = PaymentMethod::find($value_generator_payment_method->id);
            $payment->bank_status = true;
            $payment->save();

            $bank = new MobileBankDetail();
            $bank->mobile_bank_type = $request->mobile_bank_type;
            $bank->account_no = $request->account_no;
            $bank->value_generator_id = $id;
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

    public function showGeneratorMobileBankList(){
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
