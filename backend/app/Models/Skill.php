<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function generator(){
        return $this->hasMany(ValueGenerator::class);
    }

}
