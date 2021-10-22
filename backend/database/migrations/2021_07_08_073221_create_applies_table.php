<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applies', function (Blueprint $table) {
            $table->id();
            $table->integer('job_id');
            $table->integer('value_generator_id');
            $table->longText('message');
            $table->string('budget')->nullable();
            $table->string('duration')->nullable();
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
        Schema::dropIfExists('applies');
    }
}
