<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apply extends Model
{
    use HasFactory;
    protected $fillable=[
        'job_id',
        'value_generator_id',
        'message',
        'budget',
        'duration'
    ];
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function valueGenerator()
    {
        return $this->belongsTo(ValueGenerator::class);
    }
}
