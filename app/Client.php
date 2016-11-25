<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['id','raisonSoc','add','ville','email','tel','nomResp'];


    protected $table = 'clients';


    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
