<?php

namespace App\Http\Controllers;


use JWTAuth;
use App\Mission;
use App\Client;
use App\Consultant;
use App\User;
use Log;
use Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;



class MissionController extends Controller
{
    private $jwtauth;

    public function __construct(JWTAuth $jwtauth)
    {
        $this->jwtauth = $jwtauth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Mission::all());

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $client = new Client();
        $consultant = new Consultant();

        if($user->can('add-mission')){
            $mission = new Mission();

            $mission->titre =  $request->input('titre');
            $dateStart =  $request->input('date_debut');
            if ($dateStart != " "){
                $mission->date_debut =  Carbon::parse($dateStart)->format('Y-m-d');
            }
            $dateFin =  $request->input('date_fin');
            if($dateFin != " "){
                $mission->date_fin = Carbon::parse($dateFin)->format('Y-m-d');
            }
            $mission->tjm =  $request->input('tjm');
            $mission->prix_vente =  $request->input('prix_vente');
            $mission->assurance =  $request->input('assurance');
            $mission->charges_sociales =  $request->input('charges_sociales');
            $mission->ref_contrat =  $request->input('ref_contrat');
            $mission->delai_paiement =  $request->input('delai_paiement');
            $mission->ref_contrat =  $request->input('ref_contrat');
            $mission->type_contrat =  $request->input('type_contrat');
            $mission->salaire =  $request->input('salaire');

            $client  = Client::where('raisonSoc', $request->input('cli_id'))->first();
            $consultant  = Consultant::where('nom', '=', $request->input('nom'))->first();

            $mission->cli_id = $client->id;
            $mission->con_id = $consultant->id;

            $user->missions()->save($mission);


            return response()->json('user can add consultant');
        }
        else{
            return response()->json('user can not add consultant');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $user = Auth::user();
        if($user->can('read-cons')){

        $mission = Mission::find($id);

        $consultant = Consultant::where('id', $mission->con_id)->get()->pluck('nom');

        $client = Client::where('id', $mission->cli_id)->get()->pluck('raisonSoc');

        $post_data = array('mission' => $mission,"consultant"=>$consultant,"client"=>$client);


        return response()->json($post_data);

        }
        else{
            return response()->json('user not can not see Mission');
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $client = new Client();
        $consultant = new Consultant();

        if($user->can('edit-mission')){
            $mission = Mission::find($id);

            if ($request->input('titre')) {
                $mission->titre =  $request->input('titre');
            }
            if ($request->input('date_debut')) {
                $mission->date_debut = $request->input('date_debut');
            }
            if ($request->input('date_fin')) {
                $mission->date_fin = $request->input('date_fin');
            }
            if ($request->input('tjm')) {
                $mission->tjm = $request->input('tjm');
            }
            if ($request->input('prix_vente')) {
                $mission->prix_vente =  $request->input('prix_vente');
            }
            if ($request->input('assurance')) {
                $mission->assurance = $request->input('assurance');
            }
            if ($request->input('charges_sociales')) {
                $mission->charges_sociales =  $request->input('charges_sociales');
            }
            if ($request->input('ref_contrat')) {
                $mission->ref_contrat =  $request->input('ref_contrat');
            }
            if ($request->input('delai_paiement')) {
                $mission->delai_paiement = $request->input('delai_paiement');
            }
            if ($request->input('type_contrat')) {
                $mission->type_contrat = $request->input('type_contrat');
            }
            if ($request->input('salaire')) {
                $mission->salaire =  $request->input('salaire');
            }
            if ($request->input('cli_id')) {
                $client = Client::where('raisonSoc', $request->input('cli_id'))->first();
                $mission->cli_id = $client->id;
            }
            if ($request->input('nom')) {
                $consultant = Consultant::where('nom', '=', $request->input('nom'))->first();
                $mission->con_id = $consultant->id;
            }

            $user->missions()->save($mission);

            return response()->json("mission has edited");
        }
        else{
            return response()->json('user not can edit mission');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if($user->can('delete-mission')){
            $mission = Mission::find($id);
            $mission->delete();
            return response()->json('Has deleted');
        }
        else{
            return response()->json('user not can delete mission');
        }
    }

    public function getAllMissions(){
        return response()->json(Mission::all()->pluck("titre"));
    }

    public function serachMission(Request $request){

    //    $builder = Mission::query();
        /*  if($dateDebut != null){
              $builder->where('date_debut','=',$currentDate);
          }
          if($dateFin != null){
              $builder->where('date_fin','=',$finDate);
          }
          if($request->input('raisonSoc') != null){
              $builder->where('raisonSoc','=',$finDate);
          }*/

        $client = new Client();
        $consultant = new Consultant();

        $dateDebut =  $request->input('date_debut');
        $currentDate = Carbon::parse($dateDebut)->addDay()->format('Y-m-d');
        $dateFin =  $request->input('date_fin');
        $finDate = Carbon::parse($dateFin)->addDay()->format('Y-m-d');
        if($request->input('cli_id') != null){
            $client  = Client::where('raisonSoc', $request->input('cli_id'))->first();
        }
        if($request->input('nom') != null){
            $consultant  = Consultant::where('nom', '=', $request->input('nom'))->first();
        }

         $mission = Mission::where('date_debut','=',$currentDate)->orWhere('date_fin','=',$finDate)->orWhere('cli_id',$client->id)->orWhere('con_id',$consultant->id)->first();
         if($mission != null){
             return response()->json($mission);
         }
         else{
             return response()->json('Mission Not Found');
         }
    }
}
