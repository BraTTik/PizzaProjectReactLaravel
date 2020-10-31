<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Exception;
use  Symfony\Component\VarDumper\Dumper\CliDumper as Dumper;
use Symfony\Component\VarDumper\Cloner\VarCloner as Cloner;


class OrderController extends Controller
{
    //
    public function index($id)
    {   
        try{
            return Order::where('user_id', '=', $id)->orderBy('id', 'desc')->get();
        }catch(Exception $error){
            return ["success" => "no", "error" => $error->getMessage()];
        }
    }

    public function store(Request $request)
    {
        (new Dumper())->dump( 
            (new Cloner())->cloneVar(json_encode($request->input('user_id')))
        );

        try{
            Order::create([
                'id' => $request->input('id'),
                'user_id' => $request->input('user_id'),
                'details' => json_encode($request->input('details')),
                'customer' => json_encode($request->input('user'))
            ]);
        }catch(Exception $err){
            return ["success" => "no", "error"=>$err];
        }

        return ["success" => "ok"];
    }
}
