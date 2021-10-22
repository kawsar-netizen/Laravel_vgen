<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('job_id');
            $table->integer('project_id');
            $table->integer('value_generator_id');
            $table->integer('value_seeker_id');
            $table->float('amount');
            $table->float('tips');
            $table->text('comment');
            $table->string('payment_method');
            $table->boolean('payment_status')->comment("0 = Pending, 1 = Paid")->change();
            $table->boolean('partial_payment')->nullable();
            $table->string('currency')->nullable();
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
        Schema::dropIfExists('transactions');
    }
}