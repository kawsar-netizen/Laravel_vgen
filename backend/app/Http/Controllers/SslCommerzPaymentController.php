<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Library\SslCommerz\SslCommerzNotification;

class SslCommerzPaymentController extends Controller
{

    public function exampleHostedCheckout()
    {
        return view('exampleHosted');
    }

    public function index(Request $request)
    {
        # Here you have to receive all the order data to initate the payment.
        # Let's say, your oder transaction informations are saving in a table called "orders"
        # In "orders" table, order unique identity is "transaction_id". "status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

        $post_data = array();
        $post_data['total_amount'] = $request->amount; # You cant not pay less than 10
        $post_data['currency'] = "BDT";
        $post_data['method'] = $request->payment_method;
        $post_data['tips'] = $request->tips;
        $post_data['comment'] = $request->comment;
        $post_data['partial_payment'] = $request->partial_payment;
        //$post_data['status'] = '0';
        $post_data['tran_id'] = uniqid(); // tran_id must be unique

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = 'Customer Name';
        $post_data['cus_email'] = 'customer@mail.com';
        $post_data['cus_add1'] = 'Customer Address';
        $post_data['cus_add2'] = "";
        $post_data['cus_city'] = "";
        $post_data['cus_state'] = "";
        $post_data['cus_postcode'] = "";
        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = '8801XXXXXXXXX';
        $post_data['cus_fax'] = "";

        # SHIPMENT INFORMATION
        $post_data['ship_name'] = "Store Test";
        $post_data['ship_add1'] = "Dhaka";
        $post_data['ship_add2'] = "Dhaka";
        $post_data['ship_city'] = "Dhaka";
        $post_data['ship_state'] = "Dhaka";
        $post_data['ship_postcode'] = "1000";
        $post_data['ship_phone'] = "";
        $post_data['ship_country'] = "Bangladesh";

        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = "Computer";
        $post_data['product_category'] = "Goods";
        $post_data['product_profile'] = "physical-goods";

        # OPTIONAL PARAMETERS
        $post_data['value_a'] = "ref001";
        $post_data['value_b'] = "ref002";
        $post_data['value_c'] = "ref003";
        $post_data['value_d'] = "ref004";

        #Before  going to initiate the payment order status need to insert or update as Pending.
        $update_product = DB::table('transactions')
            ->where('transaction_id', $post_data['tran_id'])
            ->updateOrInsert([
                'amount' => $post_data['total_amount'],
                'job_id' => 1,
                'project_id' => 1,
                'value_generator_id' => 1,
                'value_seeker_id' => 1,
                'status' => 0,
                'tips' => $post_data['tips'],
                'comment' => $post_data['comment'],
                'currency' => $post_data['currency'],
                'payment_method' => $post_data['method'],
                'partial_payment' => $post_data['partial_payment'],
                'transaction_id' => $post_data['tran_id'],
            ]);

        $sslc = new SslCommerzNotification();
        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->makePayment($post_data, 'hosted');

        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }
    }

    public function success(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Transaction is Successful!',
        ], 200);

        $tran_id = $request->input('tran_id');
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        $sslc = new SslCommerzNotification();

        #Check order status in order tabel against the transaction id or order id.
        $order_detials = DB::table('transactions')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_detials->status == '0') {
            $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

            if ($validation == TRUE) {
                /*
                That means IPN did not work or IPN URL was not set in your merchant panel. Here you need to update order status
                in order table as Processing or Complete.
                Here you can also sent sms or email for successfull transaction to customer
                */
                $update_product = DB::table('transactions')
                    ->where('transaction_id', $tran_id)
                    ->update(['status' => '1']);

                return response()->json([
                    'success' => true,
                    'message' => 'Transaction is successfully Completed!',
                ], 200);

                //echo "<br >Transaction is successfully Completed";
            } else {
                /*
                That means IPN did not work or IPN URL was not set in your merchant panel and Transation validation failed.
                Here you need to update order status as Failed in order table.
                */
                $update_product = DB::table('transactions')
                    ->where('transaction_id', $tran_id)
                    ->update(['status' => 'Failed']);

                return response()->json([
                    'success' => false,
                    'message' => 'validation Fail',
                ], 403);
                //echo "validation Fail";
            }
        } else if ($order_detials->status == 'Processing' || $order_detials->status == 'Complete') {
            /*
             That means through IPN Order status already updated. Now you can just show the customer that transaction is completed. No need to udate database.
             */
            return response()->json([
                'success' => true,
                'message' => 'Transaction is successfully Completed!',
            ], 200);
            //echo "Transaction is successfully Completed";
        } else {
            #That means something wrong happened. You can redirect customer to your product page.
            return response()->json([
                'success' => false,
                'message' => 'Invalid Transaction!',
            ]);

            //echo "Invalid Transaction";
        }
    }

    public function fail(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_detials = DB::table('transactions')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_detials->status == '0') {
            $update_product = DB::table('transactions')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Failed']);

            return response()->json([
                'success' => false,
                'message' => 'Transaction is Falied!',
            ]);
            //echo "Transaction is Falied";
        } else if ($order_detials->status == 'Processing' || $order_detials->status == 'Complete') {
            return response()->json([
                'success' => true,
                'message' => 'Transaction is already Successful!',
            ], 200);
            //echo "Transaction is already Successful";
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Transaction is Invalid!',
            ]);
            //echo "Transaction is Invalid";
        }
    }

    public function cancel(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_detials = DB::table('transactions')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_detials->status == '0') {
            $update_product = DB::table('transactions')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Canceled']);

            return response()->json([
                'success' => true,
                'message' => 'Transaction is Cancel!',
            ], 200);
            //echo "Transaction is Cancel";
        } else if ($order_detials->status == 'Processing' || $order_detials->status == 'Complete') {
            return response()->json([
                'success' => true,
                'message' => 'Transaction is already Successful!',
            ], 200);
            //echo "Transaction is already Successful";
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Transaction is Invalid!',
            ]);
            //echo "Transaction is Invalid";
        }
    }

    public function ipn(Request $request)
    {
        #Received all the payement information from the gateway
        if ($request->input('tran_id')) #Check transation id is posted or not.
        {

            $tran_id = $request->input('tran_id');

            #Check order status in order tabel against the transaction id or order id.
            $order_details = DB::table('transactions')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'status', 'currency', 'amount')->first();

            if ($order_details->status == '0') {
                $sslc = new SslCommerzNotification();
                $validation = $sslc->orderValidate($request->all(), $tran_id, $order_details->amount, $order_details->currency);
                if ($validation == TRUE) {
                    /*
                    That means IPN worked. Here you need to update order status
                    in order table as Processing or Complete.
                    Here you can also sent sms or email for successful transaction to customer
                    */
                    $update_product = DB::table('transactions')
                        ->where('transaction_id', $tran_id)
                        ->update(['status' => '1']);

                    return response()->json([
                        'success' => true,
                        'message' => 'Transaction is successfully Completed!',
                    ], 200);

                    //echo "Transaction is successfully Completed";
                } else {
                    /*
                    That means IPN worked, but Transation validation failed.
                    Here you need to update order status as Failed in order table.
                    */
                    $update_product = DB::table('transactions')
                        ->where('transaction_id', $tran_id)
                        ->update(['status' => 'Failed']);

                    return response()->json([
                        'success' => false,
                        'message' => 'validation Fail',
                    ], 403);

                    //echo "validation Fail";
                }
            } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {

                #That means Order status already updated. No need to udate database.

                return response()->json([
                    'success' => true,
                    'message' => 'Transaction is successfully Completed!',
                ], 200);

                //echo "Transaction is already successfully Completed";
            } else {
                #That means something wrong happened. You can redirect customer to your product page.

                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Transaction!',
                ]);

                //echo "Invalid Transaction";
            }
        } else {

            return response()->json([
                'success' => false,
                'message' => 'Invalid Data!',
            ]);

            //echo "Invalid Data";
        }
    }
}