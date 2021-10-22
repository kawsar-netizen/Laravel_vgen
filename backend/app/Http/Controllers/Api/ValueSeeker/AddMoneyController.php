<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Http\Controllers\Controller;
use App\Models\Payment_Request;
use App\Models\PaymentRequest;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AddMoneyController extends Controller
{
    protected function transferInfo($file)
    {
        $transferFile = $file;
        if ($transferFile) {
            $file_name = time();
            $ext = strtolower($transferFile->getClientOriginalExtension());
            $file_full_name = rand() . $file_name . '.' . $ext;
            $upload_path = 'files/';
            $file_url = $upload_path . $file_full_name;
            $success = $transferFile->move($upload_path, $file_full_name);
            if ($success) {
                return $file_url;
            }
        }
    }

    public function payment_request_list()
    {
        $all_request = PaymentRequest::select('request_date', 'timestamps', 'amount', 'payment_method', 'ref', 'request_status')->latest()->take(10)->get();

        return response()->json(
            [
                'success' => true,
                'message' => 'All Payment Request Fetched Successfully!',
                'all payment' => ['all payment' => $all_request],
            ],
            200
        );
    }

    public function payment_request(Request $request, $id)
    {
        $validation = Validator::make(
            $request->all(),
            [
                'request_date' => 'required',
                'amount' => 'required',
                'service_charge' => 'required',
                'topup_amount' => 'required',
                'transfer_info' => 'required',
                'ref' => 'required',

            ]
        );

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'Message' => $validation->errors(),
            ], 202);
        }

        $add_money = new PaymentRequest();
        $add_money->value_seeker_id = $id;
        $add_money->request_date = $request->request_date;
        $add_money->amount = $request->amount;
        $add_money->service_charge = $request->service_charge;
        $add_money->topup_amount = $request->topup_amount;
        $add_money->transfer_info = $this->transferInfo($request->file('transfer_info'));
        $add_money->ref = $request->ref;
        $add_money->timestamps = Carbon::now()->timestamp;

        if ($request->has(['payment_method']) && $request->input('payment_method') == 1) {

            $validation = Validator::make(
                $request->all(),
                [
                    'payment_method' => 'required',
                ]
            );

            if ($validation->fails()) {
                return response()->json([
                    'success' => false,
                    'Message' => $validation->errors(),
                ], 202);
            }

            $add_money->payment_method = 1;
            $add_money->save();
        }
        if ($request->has(['payment_method']) && $request->input('payment_method') == 2) {
            $add_money->payment_method = 2;
            $add_money->save();
        }

        $add_money->save();


        return response()->json([
            'success' => true,
            'message' => 'Payment Request Added Successfully!',
            'payment' => ['payment' => $add_money],
        ], 200);
    }
}