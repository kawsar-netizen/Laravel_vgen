<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->integer('value_seeker_id');
            $table->string('title');
            $table->longText('description');
            //$table->boolean('work_from')->comment("0 = remote work, 1 = in house ");
            $table->string('job_type');
            $table->integer('min_budget');
            $table->integer('max_budget');
            $table->timestamp('duration')->nullable();
            $table->date('deadline');
            //$table->integer('budget');
            $table->integer('active_status')->default('0')->comment("0 = Pending, 1 = Active, 2 = Completed, 4 = Ban");
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
        Schema::dropIfExists('jobs');
    }
}
