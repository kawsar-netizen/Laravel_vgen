<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobileBankDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_bank_details', function (Blueprint $table) {
            $table->id();
            $table->integer('value_generator_id')->nullable();
            $table->integer('value_seeker_id')->nullable();
            $table->string('mobile_bank_type');
            $table->string('account_no');
            $table->boolean('choosen')->default(false);
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
        Schema::dropIfExists('mobile_bank_details');
    }
}
