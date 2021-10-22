<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_fields', function (Blueprint $table) {
            $table->id();
            $table->string('field_title');
            $table->integer('row_count');
            $table->string('drop_down');
            $table->string('row_one_title');
            $table->string('row_two_title');
            $table->string('field_type');
            $table->boolean('field_status');
            $table->string('field_for');
            $table->string('level');
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
        Schema::dropIfExists('new_fields');
    }
}
