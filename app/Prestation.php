<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prestation extends Model
{

    protected $fillable = ['id','con_id','mis_id','cli_id','date_effet','nombre_jours','compte_rendu','facture_consultant',
        'mode_paiement_consultant','date_paiement_consultant','ref_paiement_consultant','prestation_payee','ref_facture_client',
        'mode_paiement_client','date_paiement_client','ref_paiement_client','facture_reglee','montant_a_payer','montant_facture'];

    protected $table = 'prestations';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

  /*  public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function consultant()
    {
        return $this->belongsTo('App\Consultant');
    }*/

    public function missions()
    {
        return $this->hasMany('App\Mission');
    }
}
