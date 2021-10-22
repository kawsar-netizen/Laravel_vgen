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

class GeneratorProfilePercentageService{
    public static function percentage($id){

        $generator =empty(ValueGenerator::where('id',$id)->first()) ? 0:5;
        $personalDetails = empty(PersonalInfo::where('value_generator_id',$id)->first()) ? 0:5;
        $language = empty(Language::where('value_generator_id',$id)->first()) ? 0:5;
        $social = empty(Social::where('value_generator_id',$id)->first()) ? 0:5;
        $certificate = empty(Certificate::where('value_generator_id',$id)->first()) ? 0:5;
        $skill = empty(Skill::where('value_generator_id',$id)->first()) ? 0:5;
        $address = empty(Address::where('value_generator_id',$id)->first()) ? 0:5;
        $Bank = BankDetail::where('value_generator_id',$id)->first();
        $MobileBank = MobileBankDetail::where('value_generator_id',$id)->first();
        if (!empty($Bank) || !empty($MobileBank)){
            $payment = 5;
        }else{
            $payment = 0;
        }
        $total = $generator + $personalDetails + $language + $social + $certificate + $skill + $address + $payment;
        $result = $total/5;
        $totalTable = 8;
        $count = 100/$totalTable;
        $percentage = $count * $result;
        return round($percentage,0);
    }
}
