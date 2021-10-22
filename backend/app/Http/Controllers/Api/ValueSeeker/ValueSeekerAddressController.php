<?php

namespace App\Http\Controllers\Api\ValueSeeker;

use App\Models\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ValueSeekerAddressController extends Controller
{
    public function storeAddress(Request $request)
    {
         $id = Auth::guard('vs-api')->user()->id;

        $value_seeker_address = Address::where('value_seeker_id', $id)->first();

        if (empty($value_seeker_address)) {
            $value_seeker_address = new Address();
            $value_seeker_address->value_seeker_id = $id;
            $value_seeker_address->save();
        }
        $address = Address::find($value_seeker_address->id);
        $address->present_division = $request->present_division;
        $address->present_district = $request->present_district;
        $address->present_post_code = $request->present_post_code;
        $address->present_village = $request->present_village;
        $address->present_holding_no = $request->present_holding_no;
        $address->present_road_no = $request->present_road_no;
        $address->value_seeker_id = $id;
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
