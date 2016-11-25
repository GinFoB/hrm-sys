<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    protected $fillable = ['cli_id','con_id','titre','date_debut','date_fin','tjm','prix_vente','assurance','charges_sociales','ref_contrat','delai_paiement','type_contrat','salaire'];


    protected $table = 'missions';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function consultant()
    {
        return $this->belongsTo('App\Consultant');
    }

    public function prestation()
    {
        return $this->belongsTo('App\Prestation');
    }

}
