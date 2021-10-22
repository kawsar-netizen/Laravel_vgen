<?php

namespace App\Http\Controllers\Api\ValueGenerator;

use App\Models\Address;
use http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;

class ValueGeneratorAddressController extends Controller
{
    public function viewAddress(){
        try {
            $id = Auth::guard('vg-api')->user()->id;
            $address = Address:: where('value_generator_id',$id)->first();

            return response()->json([
                'success'=>true,
                'Address' => $address

            ],200);

        }catch (\Exception $exception){
            return response()->json([
                'success'=>false,
                'message' => $exception->getMessage()
            ],404);
        }
    }

    public function addAddress(Request  $request)
    {
         $id = Auth::guard('vg-api')->user()->id;

        $value_generator_address = Address::where('value_generator_id', $id)->first();

        if (empty($value_generator_address)) {
            $value_generator_address = new Address();
            $value_generator_address->value_generator_id = $id;
            $value_generator_address->save();
        }
        $address = Address::find($value_generator_address->id);
        $address->present_division = $request->present_division;
        $address->present_district = $request->present_district;
        $address->present_post_code = $request->present_post_code;
        $address->present_village = $request->present_village;
        $address->present_holding_no = $request->present_holding_no;
        $address->present_road_no = $request->present_road_no;
        $address->value_generator_id = $id;
        if ($request->has(['is_same']) && $request->input('is_same') == 1) {
            $address->permanent_division = $request->present_division;
            $address->permanent_disctict = $request->present_district;
            $address->permanent_post_code = $request->present_post_code;
            $address->permanent_village = $request->present_village;
            $address->permanent_holding_no = $request->present_holding_no;
            $address->permanent_road_no = $request->present_road_no;
        } else {
            $address->permanent_division = $request->permanent_division;
            $address->permanent_disctict = $request->permanent_disctict;
            $address->permanent_post_code = $request->permanent_post_code;
            $address->permanent_village = $request->permanent_village;
            $address->permanent_holding_no = $request->permanent_holding_no;
            $address->permanent_road_no = $request->permanent_road_no;
        }

        $address->save();
        $data = array(
            'success' => true,
            'message' => 'Address Update Successfully!',
            'data' => ['address' => $address],
        );
        return response()->json($data, 200);
    }
}
