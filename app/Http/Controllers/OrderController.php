<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    //
    public function index($id)
    {

    }

    public function store(Request $request)
    {
        Order::create([
            'id' => $request->input('id'),
            'user_id' => $request->input('user_id'),
            'details' => $request->input('details')
        ]);
    }
}
