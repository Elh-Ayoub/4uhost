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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('quantity')->nullable();
            $table->double('price');
            $table->double('discount')->nullable();
            $table->enum('duration', ['month', 'year']);
            $table->enum('type', ['limited', 'unlimited'])->default('limited');
            $table->enum('backup_rate', ['yearly', 'monthly', 'weekly', 'daily'])->nullable();
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
        Schema::dropIfExists('plans');
    }
};
