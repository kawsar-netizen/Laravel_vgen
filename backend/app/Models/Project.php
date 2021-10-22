<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    public function valueGenerator()
    {
        return $this->belongsTo(ValueGenerator::class);
    }
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function valueSeeker()
    {
        return $this->belongsTo(ValueSeeker::class);
    }
    public function files()
    {
        return $this->hasMany(File::class)->select('file_name');
    }
}
