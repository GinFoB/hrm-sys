<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Prestation;
use App\User;
use App\Consultant;
use App\Client;
use App\Mission;
use Log;
use DB;
use Hash;
use Illuminate\Support\Facades\Input;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PrestationController extends Controller
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
        return response()->json(Prestation::all());
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
        $mission = new Mission();

        if($user->can('add-pert')) {
            $prestation = new Prestation();
            $file = $request->file('compte_rendu');
            $file2 = $request->file('facture_consultant');
            $destinationPath = 'uploads';
            $mission = Mission::where('titre', $request->input('mis_id'))->first();
            if($file != null){
                $file->move($destinationPath, $file->getClientOriginalName());
                $prestation->compte_rendu =  $file->getClientOriginalName();

            }
            if ($file2 != null){
                $file2->move($destinationPath, $file2->getClientOriginalName());
                $prestation->facture_consultant = $file2->getClientOriginalName();
            }
            $prestation->nombre_jours = $request->input('nombre_jours');
            $prestation->mode_paiement_consultant = $request->input('mode_paiement_consultant');
            $prestation->date_paiement_consultant = $request->input('date_paiement_consultant');
            $prestation->ref_paiement_consultant = $request->input('ref_paiement_consultant');
          //  $prestation->prestation_payee = $request->input('prestation_payee');
            if($request->input('prestation_payee') == "true"){
                $prestation->prestation_payee = 1 ;
            }
            else{
                $prestation->prestation_payee = 0 ;
            }
            $prestation->ref_facture_client = $request->input('ref_facture_client');
            $prestation->mode_paiement_client = $request->input('mode_paiement_client');
            $prestation->date_paiement_client = $request->input('date_paiement_client');
            $prestation->ref_paiement_client = $request->input('ref_paiement_client');
           // $prestation->facture_reglee = $request->input('facture_reglee');

            if($request->input('facture_reglee') == "true"){
                $prestation->facture_reglee = 1 ;
            }
            else{
                $prestation->facture_reglee = 0;
            }
            $prestation->montant_a_payer = $request->input('montant_a_payer');
            $prestation->montant_facture = $request->input('montant_facture');
            $prestation->mis_id = $mission->id;

            $prestation->con_id = $mission->con_id;
            $prestation->cli_id = $mission->cli_id;
            $user->prestations()->save($prestation);
            return response()->json("prestation added");
        }
        else{
            return response()->json("pas de previlige prestation added");
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
        if($user->can('read-pert')){
            $prestation = Prestation::find($id);
            $mission = Mission::where('id', $prestation->mis_id)->get()->pluck('titre');
            $post_data = array('prestation' => $prestation,"mission"=>$mission);
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
        $mission = new Mission();

        if($user->can('edit-pert')){
            $file = $request->file('compte_rendu');
            $file2 = $request->file('facture_consultant');
            $destinationPath = 'uploads';
            $prestation = Prestation::find($id);
            if($request->input('titre')){
                $mission  = Mission::where('titre', $request->input('titre'))->first();
                $prestation->mis_id = $mission->id;
                $prestation->con_id = $mission->con_id;
                $prestation->cli_id = $mission->cli_id;
            }
            if($file){
                $file->move($destinationPath, $file->getClientOriginalName());
                $prestation->compte_rendu =  $file->getClientOriginalName();
            }
            if($file2){
                $file2->move($destinationPath, $file2->getClientOriginalName());
                $prestation->facture_consultant = $file2->getClientOriginalName();
            }
            if($request->input('date_effet')){
                $prestation->date_effet =  $request->input('date_effet');
            }
            if($request->input('nombre_jours')){
                $prestation->nombre_jours =  $request->input('nombre_jours');
            }
            if($request->input('mode_paiement_consultant')){
                $prestation->mode_paiement_consultant =  $request->input('mode_paiement_consultant');
            }
            if($request->input('date_paiement_consultant')){
                $prestation->date_paiement_consultant =  $request->input('date_paiement_consultant');
            }
            if($request->input('ref_paiement_consultant')){
                $prestation->ref_paiement_consultant =  $request->input('ref_paiement_consultant');
            }
            if($request->input('prestation_payee')){
                if($request->input('prestation_payee') == "true"){
                    $prestation->prestation_payee = 1 ;
                }
                else{
                    $prestation->prestation_payee = 0 ;
                }
            }
            if($request->input('ref_facture_client')){
                $prestation->ref_facture_client =  $request->input('ref_facture_client');
            }
            if($request->input('mode_paiement_client')){
                $prestation->mode_paiement_client =  $request->input('mode_paiement_client');
            }
            if($request->input('date_paiement_client')){
                $prestation->date_paiement_client =  $request->input('date_paiement_client');
            }
            if($request->input('ref_paiement_client')){
                $prestation->ref_paiement_client =  $request->input('ref_paiement_client');
            }
            if($request->input('facture_reglee')){
                if($request->input('facture_reglee') == "true"){
                    $prestation->facture_reglee = 1 ;
                }
                else{
                    $prestation->facture_reglee = 0;
                }
            }
            if($request->input('montant_a_payer')){
                $prestation->montant_a_payer =  $request->input('montant_a_payer');
            }
            if($request->input('montant_facture')){
                $prestation->montant_facture =  $request->input('montant_facture');
            }
            $user->prestations()->save($prestation);
            return response()->json("prestation has edited");
        }
        else{
            return response()->json('user not can edit prestation');
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
        if($user->can('delete-client')){
            $prestation = Prestation::find($id);
            $prestation->delete();
            return response()->json('Has deleted');
        }
        else{
            return response()->json('user not can delete client');
        }
    }

    public function serachPrestation(Request $request){

        $mission =   $request->input('mission');
        $missionFind = Mission::where('titre',$mission)->first();

        $date1 =  $request->input('date_effet');
        $date_effet = Carbon::parse($date1)->addDay()->format('Y-m-d');

        $date2 =  $request->input('date_paiement_consultant');
        $date_paiement_consultant = Carbon::parse($date2)->addDay()->format('Y-m-d');

        $date3 =  $request->input('date_paiement_client');
        $date_paiement_client = Carbon::parse($date3)->addDay()->format('Y-m-d');

        if($request->input('facture_reglee') == "true"){
            $facture_reglee = 1;
        }
        else{
            $facture_reglee = 0;
        }
        if($request->input('prestation_payee') == "true"){
            $prestation_payee = 1;
        }
        else{
            $prestation_payee = 0;
        }


        $prestation = DB::table('prestations')
            ->where('date_effet',$date_effet)
            ->orWhere('date_paiement_consultant',$date_paiement_consultant)
            ->orWhere('date_paiement_client',$date_paiement_client)
            ->orWhere('facture_reglee',$facture_reglee)
            ->orWhere('prestation_payee',$prestation_payee)
            ->orWhere('mis_id',$missionFind->id)
            ->get();

        if ($prestation != null){
            return response()->json($prestation);
        }
        else {
            return response()->json("Prestation Not Found");
        }
    }

    public function getMision(){
        $prestations = Prestation::all();
        foreach ($prestations as $prestation){
           $mission[] = array("mission" => Mission::find($prestation->mis_id)->pluck('titre'),"prestation" => $prestation);
        }
        return response()->json($mission);
    }

   /* public function nnHelp(){
       $nn = Prestation::with(array('missions'=>function($query){
            $query->select('mis_id','id');
       }))->get();

        return response()->json($nn);
    }*/

}
