<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValueGeneratorWalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('value_generator_wallets', function (Blueprint $table) {
            $table->id();
            $table->integer('value_generator_id');
            $table->float('balance', 10, 2)->nullable();
            $table->float('pending_balance')->nullable();
            $table->float('working_on')->nullable();
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
        Schema::dropIfExists('value_generator_wallets');
    }
}
