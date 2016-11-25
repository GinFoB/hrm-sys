<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


/*
 * this route for autorization and autehentciate with jwt
 * */

Route::group(['domain' => 'api.jwt.dev'], function () {
    Route::get('/restricted', 'JwtAuthenticateController@restricted');
});

// Route to create a new role
Route::post('role', 'JwtAuthenticateController@createRole');
// Route to create a new permission
Route::post('permission', 'JwtAuthenticateController@createPermission');
// Route to assign role to user
Route::post('assign-role', 'JwtAuthenticateController@assignRole');
// Route to attache permission to a role
Route::post('attach-permission', 'JwtAuthenticateController@attachPermission');
Route::post('checkRole','JwtAuthenticateController@checkRole');
Route::post('hpers','JwtAuthenticateController@hasPermissions');
Route::post('perms','JwtAuthenticateController@createPers');


Route::get('nnHelp','PrestationController@nnHelp');

Route::get('roles','JwtAuthenticateController@getAllRole');

Route::post('saveUser','JwtAuthenticateController@saveUser');
Route::post('password/reset', 'JwtAuthenticateController@resetPassword');
Route::get('getUsers', 'JwtAuthenticateController@getUsers');

Route::post('createAdmin','JwtAuthenticateController@createAdmin');

// API route group that we need to protect
Route::group(['prefix' => 'api', 'middleware' => ['jwt.auth', 'jwt.refresh']], function()
{
    // Protected route
    Route::get('users', 'JwtAuthenticateController@index');
    Route::post('searchUser','JwtAuthenticateController@searchUser');

});
// Authentication route
Route::post('authenticate', 'JwtAuthenticateController@authenticate');

Route::group(['prefix' => 'api', 'middleware' => ['jwt.auth']], function()
{
    Route::get('raisons','ClientController@getRaisons');
    Route::post('searchClient','ClientController@searchClient');
    Route::resource('clients', 'ClientController');
});

Route::group(['prefix' => 'api','middleware' => ['jwt.auth']], function()
{
    Route::get('getConsultants','ConsultantController@getConsultants');
    Route::post('serachConsultant','ConsultantController@serachConsultant');
    Route::resource('consultants', 'ConsultantController');
});

Route::group(['prefix' => 'api','middleware' => ['jwt.auth']], function()
{
    Route::get('getAllMissions','MissionController@getAllMissions');
    Route::post('serachMission','MissionController@serachMission');
    Route::resource('missions', 'MissionController');
});

Route::group(['prefix' => 'api','middleware' => ['jwt.auth']], function()
{
    Route::post('serachCaisse','CaisseController@serachCaisse');
    Route::resource('caisses', 'CaisseController');
});

Route::group(['prefix' => 'api','middleware' => ['jwt.auth']], function()
{
    Route::post('editPermission/{id}', 'PrestationController@update');
    Route::resource('prestations', 'PrestationController');
    Route::post('serachPrestation', 'PrestationController@serachPrestation');
    Route::get('getMision', 'PrestationController@getMision');
});


