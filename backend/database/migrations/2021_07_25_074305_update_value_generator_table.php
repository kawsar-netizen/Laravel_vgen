<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateValueGeneratorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('value_generators', function (Blueprint $table) {

            $table->string('provider_id')->nullable()->after('password');
            $table->string('avatar')->nullable()->after('provider_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('value_generators', function (Blueprint $table) {
            $table->dropColumn('provider_id');
            $table->dropColumn('avatar');
        });
    }
}
