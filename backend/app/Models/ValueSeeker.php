<?php

namespace App\Models;
use App\Models\PersonalInfo;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ValueSeeker extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'first_name',
        'last_name',
        'user_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => "datetime:d-m-Y",
    ];

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'value_seeker_id')->select(['rating']);
    }
    public function personalInfo()
    {
        return $this->hasOne(PersonalInfo::class,'value_seeker_id');
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    /**
     * Send a password reset notification to the user.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $url = 'https://example.com/reset-password?token=' . $token;

        $this->notify(new ResetPasswordNotification($url));
    }
}
