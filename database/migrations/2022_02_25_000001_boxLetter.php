<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('city', function (Blueprint $table) {
            $table->id('idCity');
            $table->string('city');
            $table->string('population');
        });

        Schema::create('boxLetter', function (Blueprint $table) {
            $table->id('idBoxLetter');
            $table->string('typeOfBoxLetter');
            $table->string('street');
            $table->string('pickUpTime');
            $table->string('coordinates');
            $table->unsignedBigInteger('fkCity');
            $table->foreign('fkCity')->references('idCity')->on('city');
        });

        Schema::create('boxLetterAllData', function (Blueprint $table) {
            $table->id('idBoxLetter');
            $table->string('typeOfBoxLetter');
            $table->string('street');
            $table->string('pickUpTime');
            $table->String('city');
            $table->string('coordinatesx');
            $table->string('coordinatesy');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boxLetter');
        Schema::dropIfExists('boxLetterAllData');
        Schema::dropIfExists('city');
    }
};
