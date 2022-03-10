<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Boxletter;
use Illuminate\Support\Facades\DB;

class BoxletterController extends Controller
{
    public function index(){

        $boxletters = DB::table('boxLetter')->join('city', 'idCity','=','fkCity')->get();
        //$boxletters = Boxletter::select('street', 'fkCity')->get();

        return view('api.boxletter.getBoxLetter', [
            'boxletters' => $boxletters
        ]);
    }

    public function checkOutTowns($town){
        $arrayTowns = explode(',', $town);
        $boxletters = DB::table('boxLetter')->join('city', 'idCity','=','fkCity')->whereIn('city', $arrayTowns)->get();

        return view('api.boxletter.getBoxLetterTown', [
            'boxletters' => $boxletters
        ]);
    }
}
