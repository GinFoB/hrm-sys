<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('cli_id')->unsigned();
            $table->integer('con_id')->unsigned();

            $table->string('titre')->unique();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->float('tjm')->nullable();
            $table->float('prix_vente')->nullable();
            $table->float('assurance')->nullable();
            $table->float('charges_sociales')->nullable();
            $table->string('ref_contrat')->nullable();
            $table->integer('delai_paiement')->nullable();
            $table->string('type_contrat');
            $table->float('salaire')->nullable();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('cli_id')->references('id')->on('clients')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('con_id')->references('id')->on('consultants')
                ->onUpdate('cascade')->onDelete('cascade');

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
        Schema::drop('missions');
    }
}
