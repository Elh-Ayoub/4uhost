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
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->integer("user_id");
            $table->text("message");
            $table->string("subject");
            $table->enum("status", ['pending', 'opened', 'closed'])->default('pending');
            $table->enum("department", ["Technical Support", "Sales support", "reseller Hosting", "Licensing Departement", "Compliances & Abuse Support"]);
            $table->enum("priority", ['low', 'medium', 'high']);
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
        Schema::dropIfExists('support_tickets');
    }
};
