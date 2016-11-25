<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{
    protected $fillable = ['id','nom','prenom','date_naissance','adresse','ville','email','indicatif','telephone','type','rib','banque','observations'];


    protected $table = 'consultants';

    public function user()
    {
        return $this->belongsTo('App\User');
    }


}
