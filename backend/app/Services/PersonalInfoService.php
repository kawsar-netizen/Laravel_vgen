<?php
namespace app\Services;

use App\Models\Address;
use App\Models\PaymentMethod;
use App\Models\PersonalInfo;
use App\Models\ValueGeneratorWallet;

class PersonalInfoService
{
    public static function personalInfo($id){
        $info = new PersonalInfo();
        $info->value_generator_id = $id;
        $info->save();

        $address = new Address();
        $address->value_generator_id = $id;
        $address->save();

        $paymentMethod = new PaymentMethod();
        $paymentMethod->value_generator_id = $id;
        $paymentMethod->save();

        $walllet = new ValueGeneratorWallet();
        $walllet->value_generator_id = $id;
        $walllet->save();
    }
}
