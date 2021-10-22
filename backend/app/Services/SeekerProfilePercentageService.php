<?php

namespace App\Services;

use App\Models\Address;
use App\Models\BankDetail;
use App\Models\Language;
use App\Models\MobileBankDetail;
use App\Models\PersonalInfo;
use App\Models\Skill;
use App\Models\Social;
use App\Models\Certificate;
use App\Models\ValueGenerator;
use App\Models\ValueSeeker;

class SeekerProfilePercentageService{
    public static function percentage($id){

        $generator =empty(ValueSeeker::where('id',$id)->first()) ? 0:5;
        $personalDetails = empty(PersonalInfo::where('value_seeker_id',$id)->first()) ? 0:5;
        $language = empty(Language::where('value_seeker_id',$id)->first()) ? 0:5;
        $address = empty(Address::where('value_seeker_id',$id)->first()) ? 0:5;
        $Bank = BankDetail::where('value_seeker_id',$id)->first();
        $MobileBank = MobileBankDetail::where('value_seeker_id',$id)->first();
        if (!empty($Bank) || !empty($MobileBank)){
            $payment = 5;
        }else{
            $payment = 0;
        }
        $total = $generator + $personalDetails + $language + $address + $payment;
        $result = $total/5;
        $totalTable = 5;
        $count = 100/$totalTable;
        $percentage = $count * $result;
        return round($percentage,0);
    }
}
