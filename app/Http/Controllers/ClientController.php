<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Client;
use App\User;
use Log;
use Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ClientController extends Controller
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
        return response()->json(Client::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }
    //protected $fillable = ['raisonSoc', 'add', 'ville','email','tel','nomResp'];

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if($user->can('create-client')){

            $client = new Client();
            $client->raisonSoc = $request->input('raisonSoc');
            $client->add = $request->input('add');
            $client->ville =  $request->input('ville');
            $client->email = $request->input('email');
            $client->tel = $request->input('tel');
            $client->nomResp = $request->input('nomResp');

            $user->clients()->save($client);

            return response()->json('user can create client');
        }
        else{
            return response()->json('user not can create client');
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
            $client = Client::where('id', $id)
                ->take(1)
                ->get();
            return response()->json($client);
        }
        else{
            return response()->json('user not can see client');
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
            $client = Client::find($id);

            if ($request->input('raisonSoc')) {
                $client->raisonSoc = $request->input('raisonSoc');
            }
            if ($request->input('add')) {
                $client->add = $request->input('add');
            }
            if ($request->input('ville')) {
                $client->ville = $request->input('ville');
            }
            if ($request->input('email')) {
                $client->email = $request->input('email');
            }
            if ($request->input('tel')) {
                $client->tel = $request->input('tel');
            }
            if ($request->input('tel')) {
                $client->nomResp = $request->input('nomResp');
            }

            $user->clients()->save($client);

            return response()->json($client);
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
            $client = Client::find($id);
            $client->delete();
            return response()->json('Has deleted');
        }
        else{
            return response()->json('user not can delete client');
        }
    }

    public function getRaisons(){
        return response()->json(Client::all()->pluck("raisonSoc"));
    }

    public function searchClient(Request $request){
        $raisonSoc =  $request->input('raisonSoc');
        $ville = $request->input('ville');
        $client = Client::where('raisonSoc',$raisonSoc)->orWhere('ville',$ville)->first();
        if($client != null){
            return response()->json($client);
        }
        else{
            return response()->json('No Clinet Found');
        }
    }
}
