<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->integer('value_generator_id')->nullable();
            $table->integer('value_seeker_id')->nullable();
            $table->string('present_division')->nullable();
            $table->string('present_district')->nullable();
            $table->string('present_post_code')->nullable();
            $table->string('present_village')->nullable();
            $table->string('present_holding_no')->nullable();
            $table->string('present_road_no')->nullable();
            $table->string('is_same')->default(0)->comment('0 = not same,1 = same');
            $table->string('permanent_division')->nullable();
            $table->string('permanent_disctict')->nullable();
            $table->string('permanent_post_code')->nullable();
            $table->string('permanent_village')->nullable();
            $table->string('permanent_holding_no')->nullable();
            $table->string('permanent_road_no')->nullable();
            $table->json('additional_data')->nullable();
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
        Schema::dropIfExists('addresses');
    }
}
