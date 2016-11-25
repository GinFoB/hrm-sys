<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrestationsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prestations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('mis_id')->unsigned()->nullable();
            $table->integer('cli_id')->unsigned()->nullable();
            $table->integer('con_id')->unsigned()->nullable();

            $table->date('date_effet')->nullable();
            $table->integer('nombre_jours')->nullable();
            $table->string('compte_rendu')->nullable();
            $table->string('facture_consultant')->nullable();
            $table->string('mode_paiement_consultant')->nullable();
            $table->date('date_paiement_consultant')->nullable();
            $table->string('ref_paiement_consultant')->nullable();
            $table->boolean('prestation_payee')->nullable();
            $table->string('ref_facture_client')->nullable();
            $table->string('mode_paiement_client')->nullable();
            $table->date('date_paiement_client')->nullable();
            $table->string('ref_paiement_client')->nullable();
            $table->boolean('facture_reglee')->nullable();
            $table->float('montant_a_payer')->nullable();
            $table->float('montant_facture')->nullable();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('mis_id')->references('id')->on('missions')
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
        Schema::drop('prestations');

    }
}
