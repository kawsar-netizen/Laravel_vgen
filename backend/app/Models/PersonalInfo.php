<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalInfo extends Model
{
    use HasFactory;
    public function valueSeeker()
    {
        return $this->belongsTo(ValueSeeker::class);
    }
    public function generator(){
        return $this->hasMany(ValueGenerator::class);
    }
}
