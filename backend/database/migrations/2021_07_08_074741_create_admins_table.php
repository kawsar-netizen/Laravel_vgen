<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('user_name')->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('dob')->nullable();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('secondary_email')->nullable();
            $table->string('country_code')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('division')->nullable();
            $table->string('district')->nullable();
            $table->string('post_code')->nullable();
            $table->string('holding_number')->nullable();
            $table->string('road_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
