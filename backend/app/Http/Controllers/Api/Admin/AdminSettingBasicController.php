<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddBankRequest;
use App\Http\Requests\editCommissionRequest;
use App\Http\Requests\MobileBankRequest;
use App\Models\Bank;
use App\Models\Commision;
use App\Models\MobileBank;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class AdminSettingBasicController extends Controller
{
    public function getAllBasicInformation()
    {

        $commission = Commision::all();
        $allBank = Bank::all();
        $allMobileBank = MobileBank::all();
        return response()->json([
            'success' => true,
            'commission' => $commission,
            'allBank' => $allBank,
            'allMobileBank' => $allMobileBank,
        ], 400);
    }
    public function editCommission(editCommissionRequest $request)
    {
        try {
            $commission = Commision::find(1);
            $commission->commision_rate = $request->commision_rate;
            $commission->save();
            return response()->json([
                'success' => true,
                'Message' => 'Commission Rate Updated Successfully',
                'commission' => $commission
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function addBank(AddBankRequest $request)
    {
        try {
            $bank = new Bank();
            $bank->bank_name = $request->bank_name;
            $bank->bank_account_no = $request->bank_account_no;
            $bank->bank_logo = $request->file('bank_logo')->store('images');
            $bank->save();
            return response()->json([
                'success' => true,
                'Message' => 'New Bank Added Successfully',
                'Bank' => $bank
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function bankStatus($id)
    {
        try {
            $bank = Bank::findOrFail($id);
            if ($bank->status == 1) {
                $bank->status = 0;
            } else {
                $bank->status = 1;
            }
            $bank->save();
            return response()->json([
                'success' => true,
                'Message' => 'Bank Status Updated Successfully',
                'Bank' => $bank
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function bankDelete($id)
    {
        try {
            Bank::findOrFail($id)->delete();
            return response()->json([
                'success' => true,
                'Message' => 'Bank  Removed Successfully',
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }

    public function addMobileBank(MobileBankRequest $request)
    {
        try {
            $bank = new MobileBank();
            $bank->wallet_name = $request->wallet_name;
            $bank->wallet_number = $request->wallet_number;
            $bank->wallet_type = $request->wallet_type;
            $bank->wallet_logo = $request->file('wallet_logo')->store('images');
            $bank->save();
            return response()->json([
                'success' => true,
                'Message' => 'New Mobile Bank Added Successfully',
                'Mobile Bank' => $bank
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function mobileBankStatus($id)
    {
        try {
            $bank = MobileBank::findOrFail($id);
            if ($bank->status == 1) {
                $bank->status = 0;
            } else {
                $bank->status = 1;
            }
            $bank->save();
            return response()->json([
                'success' => true,
                'Message' => ' Mobile Bank Status Updated Successfully',
                'Bank' => $bank
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
    public function mobileBankDelete($id)
    {
        try {
            MobileBank::findOrFail($id)->delete();
            return response()->json([
                'success' => true,
                'Message' => 'Mobile Bank  Removed Successfully',
            ], 400);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 404);
        }
    }
}
