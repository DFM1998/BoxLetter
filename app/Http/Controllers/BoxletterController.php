<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Boxletter;

class BoxletterController extends Controller
{
    public function index(){

        $boxletters = Boxletter::select('street', 'fkCity')->get();

        return view('boxletter.getBoxLetter', [
            'boxletters' => $boxletters
        ]);
    }
}
