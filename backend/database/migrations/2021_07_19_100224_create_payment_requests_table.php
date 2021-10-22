<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('value_seeker_id');
            $table->integer('payment_method')->comment('1=bank, 2= mobile');
            $table->timestamp('request_date');
            $table->float('amount');
            $table->float('service_charge');
            $table->float('topup_amount');
            $table->string('transfer_info');
            $table->string('ref');
            $table->integer('request_status')->default(0)->comment('0 = pending, 1 = approve');
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
        Schema::dropIfExists('payment_requests');
    }
}