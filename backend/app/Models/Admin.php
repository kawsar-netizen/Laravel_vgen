<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{

    use HasApiTokens, HasFactory;

    protected $fillable = [
        'user_name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
