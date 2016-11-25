<?php

namespace App;

use Zizaco\Entrust\EntrustRole;


class Role extends EntrustRole
{
    //
    protected $fillable = [
        'name'
    ];

   /* public function roles()
    {
        return $this->belongsToMany('Role','assigned_roles');
    }*/

}
