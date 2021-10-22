<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('value_generator_id')->nullable();
            $table->integer('value_seeker_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('dob')->nullable();
            $table->string('nationality')->nullable();
            $table->string('nid_number')->nullable();
            $table->string('nid_front_img')->nullable();
            $table->string('nid_back_img')->nullable();
            $table->string('face_img')->nullable();
            $table->string('country_code')->nullable();
            $table->string('mobile_no')->nullable();
            $table->string('secondary_email')->nullable();
            $table->longText('description')->nullable();
            $table->json('additional_fields')->nullable();
            $table->boolean('is_organization')->nullable();
            $table->string('company_name')->nullable();
            $table->string('tin_number')->nullable();
            $table->string('website')->nullable();
            $table->date('founding_date')->nullable();
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
        Schema::dropIfExists('personal_infos');
    }
}
