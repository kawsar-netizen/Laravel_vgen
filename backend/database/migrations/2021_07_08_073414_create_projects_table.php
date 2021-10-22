<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->integer('job_id');
            $table->integer('value_generator_id');
            $table->integer('value_seeker_id');
            $table->integer('progress');
            $table->timestamp('deadline');
           // $table->integer('status')->comment("0 = Ongoing, 1 = Review, 2 = Completed")->change();
            $table->float('amount');
            $table->integer('total_revision');
            $table->integer('Revision_completed');
           // $table->boolean('payment_status')->comment("0 = Pending, 1 = Paid")->change();
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
        Schema::dropIfExists('projects');
    }
}
