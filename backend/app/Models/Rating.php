<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    public function valueSeeker()
    {
        return $this->belongsTo(ValueSeeker::class);
    }
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

}
