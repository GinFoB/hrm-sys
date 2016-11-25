<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caisse extends Model
{
    protected $fillable = ['designat','date_paiement','mode_paiement','montant','ref_paiement','type_opr','observations'];


    protected $table = 'caisses';


    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
