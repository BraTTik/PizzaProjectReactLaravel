<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Address;
use Exception;
use  Symfony\Component\VarDumper\Dumper\CliDumper as Dumper;
use Symfony\Component\VarDumper\Cloner\VarCloner as Cloner;

class UserController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        //
        try{
            User::create([
                'name' => $request->input('name'),
                'last_name' => $request->input('lastName'),
                'password' => $request->input('password'),
                'email' => $request->input('email')
                ]);

        }catch(Exception $err){
            return ["success" => "no", "error" => $err->getMessage()];
        }

        return ["success" => "ok"];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
        try{
            $user = User::where('email', '=', $request->input('email'))->first();
        }catch(Exception $err){
            return ["success" => "no", "error" => $err->getMessage()];
        }

        if($user->password === $request->input('password')){
            return ["success" => "ok", "user" => $user];
        }else{
            return ["success" => "no", "error" => "Password and Email doesn't match"];
        }
    }

    public function contacts($id){
        $contacts = Address::where('user_id', '=', $id)->first();
        return $contacts;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        
        $id = $request->input('id');
        
        $address = Address::where('user_id', '=', $id)->first();

    
        if(is_null($address)){
           $result = $this->addAddress($request, $id);
        }else{
           $result = $this->updateAddress($request, $id);
        }

        return $result;
    }

    private function updateAddress(Request $request, $id)
    {
        (new Dumper())->dump( 
            (new Cloner())->cloneVar('Hel')
        );
        try{
            $address = Address::where('user_id', '=', $id)->first();
            $address->street = $request->input('street');
            $address->house = $request->input('house');
            $address->building = $request->input('building');
            $address->phone = $request->input('phone');
            $address->save();
        
        }catch(Exception $err){
            return ["success" => "no", "error" => $err->getMessage()];
        }

        return  ["success" => "ok"];
    }

    private function addAddress(Request $request, $id)
    {
    
        try{
            Address::create([
                'user_id' => $request->input('id'),
                'street' => $request->input('street'),
                'house' => $request->input('house'),
                'building' => $request->input('building') ?? null,
                'phone' => $request->input('phone'),
                'apartment' => $request->input('apartment')
                ]);
            }catch(Exception $err){
                (new Dumper())->dump( 
                    (new Cloner())->cloneVar('Exception in create')
                );
            return ["success" => "no", "error" => $err->getMessage()];
        }

        return ["success" => "ok"];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        
    }
    
}
