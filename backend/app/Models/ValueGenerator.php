<?php

namespace App\Models;

use App\Models\PersonalInfo;
use Illuminate\Support\Carbon;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ValueGenerator extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    //protected $guarded=['api-vg'];

    protected $fillable = [
        'user_name',
        'first_name',
        'last_name',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => "datetime:d-m-Y",
    ];
    /**
     * @var mixed|string
     */
    private $created_at;

    public function  personal()
    {
        return $this->hasOne(PersonalInfo::class)->select(['description','face_img','nationality']);
    }
    public function certificates()
    {
        return $this->hasMany(Certificate::class)->select(['certification_title','certified_by']);
    }
    public function languages()
    {
        return $this->hasMany(Language::class)->select(['language']);
    }
    public function educationInstitute()
    {
        return $this->hasMany(Education::class)->select('institute_type');
    }
    public function country()
    {
        return $this->hasMany(Education::class)->select('country');
    }
    public function certificationTitle()
    {
        return $this->hasMany(Certificate::class)->select('certification_title');
    }
    public function certifiedBy()
    {
        return $this->hasMany(Certificate::class)->select('certified_by');
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
