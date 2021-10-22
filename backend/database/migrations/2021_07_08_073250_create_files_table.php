<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id')->nullable();
            $table->integer('job_id')->nullable();
            $table->integer('value_generator_id');
            $table->integer('value_seeker_id');
            $table->string('file');
            $table->string('file_name'); 
            $table->integer('initiator')->comment("1 = value seeker, 2 = value generetor");
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
        Schema::dropIfExists('files');
    }
}
