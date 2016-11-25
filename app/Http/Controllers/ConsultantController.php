<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Consultant;
use App\User;
use Log;
use Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class ConsultantController extends Controller
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
        return response()->json(Consultant::all());

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
        if($user->can('add-cons')){
            $consultant = new Consultant();
            $consultant->nom =  $request->input('nom');
            $consultant->prenom = $request->input('prenom');
            $consultant->date_naissance = $request->input('date_naissance');
            $consultant->adresse = $request->input('adresse');
            $consultant->ville = $request->input('ville');
            $consultant->email = $request->input('email');
            $consultant->telephone = $request->input('telephone');
            $consultant->type = $request->input('type');
            $consultant->rib = $request->input('rib');
            $consultant->banque = $request->input('banque');
            $consultant->observations = $request->input('observations');

           $user->consultants()->save($consultant);

            return response()->json('user can add consultant');
        }
        else{
            return response()->json('user can add consultant');
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
            $consultant = Consultant::where('id', $id)
                ->take(1)
                ->get();
            return response()->json($consultant);
        }
        else{
            return response()->json('user not can not see Consultant');
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
        if($user->can('edit-cons')){
            $consultant = Consultant::find($id);

            if ($request->input('nom')) {
                $consultant->nom = $request->input('nom');
            }
            if ($request->input('prenom')) {
                $consultant->prenom = $request->input('prenom');
            }
            if ($request->input('date_naissance')) {
                $consultant->date_naissance = $request->input('date_naissance');
            }
            if ($request->input('adresse')) {
                $consultant->adresse = $request->input('adresse');
            }
            if ($request->input('ville')) {
                $consultant->ville = $request->input('ville');
            }
            if ($request->input('email')) {
                $consultant->email = $request->input('email');
            }
            if ($request->input('telephone')) {
                $consultant->telephone = $request->input('telephone');
            }
            if ($request->input('type')) {
                $consultant->type = $request->input('type');
            }
            if ($request->input('rib')) {
                $consultant->rib = $request->input('rib');
            }
            if ($request->input('banque')) {
                $consultant->banque = $request->input('banque');
            }
            if ($request->input('observations')) {
                $consultant->observations = $request->input('observations');
            }

            $user->consultants()->save($consultant);

            return response()->json($consultant);
        }
        else{
            return response()->json('user not can edit consultant');
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
        if($user->can('delete-cons')){
            $client = Consultant::find($id);
            $client->delete();
            return response()->json('Has deleted');
        }
        else{
            return response()->json('user not can delete Consultant');
        }
    }

    public function serachConsultant(Request $request){

        $builder = Consultant::query();
        $nom =  $request->input('nom');
        $prenom = $request->input('prenom');
        $email = $request->input('email');
        $tel =   $request->input('telephone');

        if($nom != null){
            $builder->where('nom','=',$nom);
        }
        if($prenom != null){
            $builder->where('prenom','=',$prenom);
        }
        if($email != null){
            $builder->where('email','=',$email);
        }
        if($tel != null){
            $builder->where('tel','=',$tel);
        }

        $result = $builder->get();

        if ($result != null){
            return response()->json($result);
        }
        else {
            return response()->json("Consultant Not Found");
        }
    }

    public function getConsultants(){
            return response()->json(Consultant::all()->pluck("nom"));
    }
}
