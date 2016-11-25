<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Caisse;
use App\User;
use Log;
use Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CaisseController extends Controller
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
        return response()->json(Caisse::all());
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
        //  = ['designat','date_paiement','mode_paiement','montant','ref_paiement','type_opr','observations'];

        $user = Auth::user();
        if($user->can('create-client')){

            $caisse = new Caisse();
            $caisse->designat = $request->input('designat');
            $caisse->date_paiement = $request->input('date_paiement');
            $caisse->mode_paiement = $request->input('mode_paiement');
            $caisse->montant = $request->input('montant');
            $caisse->ref_paiement = $request->input('ref_paiement');
            $caisse->type_opr = $request->input('type_opr');
            $caisse->observations = $request->input('observations');
            $user->caisses()->save($caisse);

            return response()->json('user can add caisse');
        }
        else{
            return response()->json('user not can add caisse');
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
        if($user->can('read-client')){
            $caisse = Caisse::where('id', $id)
                ->take(1)
                ->get();
            return response()->json($caisse);
        }
        else{
            return response()->json('user not can show caisse');
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
        if($user->can('edit-client')){
            $caisse = Caisse::find($id);

            if ($request->input('designat')) {
                $caisse->designat = $request->input('designat');
            }
            if ($request->input('date_paiement')) {
                $caisse->date_paiement = $request->input('date_paiement');
            }
            if ($request->input('mode_paiement')) {
                $caisse->mode_paiement = $request->input('mode_paiement');
            }
            if ($request->input('montant')) {
                $caisse->montant = $request->input('montant');
            }
            if ($request->input('ref_paiement')) {
                $caisse->ref_paiement = $request->input('ref_paiement');
            }
            if ($request->input('type_opr')) {
                $caisse->type_opr = $request->input('type_opr');
            }
            if ($request->input('observations')) {
                $caisse->observations = $request->input('observations');
            }

            $user->caisses()->save($caisse);

            return response()->json($caisse);
        }
        else{
            return response()->json('user not can edit client');
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
            $caisse = Caisse::find($id);
            $caisse->delete();
            return response()->json('Has deleted');
        }
        else{
            return response()->json('user not can delete client');
        }
    }
    public function serachCaisse(Request $request){

        $date1 = $request->input('myDate');
        $date2 = $request->input('firstDay');
        $currentDate = Carbon::parse($date1)->format('Y-m-d');
        $firstDayCurrentYear = Carbon::parse($date2)->format('Y-m-d');

        $type = $request->input('type');
        $caisse = Caisse::where('type_opr',$type)->whereBetween('date_paiement',[$firstDayCurrentYear,$currentDate])->first();

        if($caisse != null){
            return response()->json($caisse);
        }
        else{
            return response()->json("caisse not found");
        }

    }
}
