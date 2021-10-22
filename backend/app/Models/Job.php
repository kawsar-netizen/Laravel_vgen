<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'value_seeker_id',
        'title',
        'description',
        'work_from',
        'job_type',
        'experience_level',
        'min_budget',
        'max_budget',
        'duration',
        'deadline'
    ];

    public function valueSeeker()
    {
        return $this->belongsTo(ValueSeeker::class);
    }
    public function skills()
    {
        return $this->hasMany(Skill::class)->select(['id','skill']);    
    }
    public function applies()
    {
        return $this->hasMany(Apply::class);
    }

    
}
