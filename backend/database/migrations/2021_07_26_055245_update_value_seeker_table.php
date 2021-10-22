<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateValueSeekerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('value_seekers', function (Blueprint $table) {
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
        Schema::table('value__seekers', function (Blueprint $table) {
            $table->dropColumn('provider_id');
            $table->dropColumn('avatar');
        });
    }
}
