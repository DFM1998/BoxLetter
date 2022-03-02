<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;
use Illuminate\Support\Facades\DB;

class CityController extends Controller
{
    public function index(){

        //$cities = DB::table('boxLetter')->join('city', 'idCity','=','fkCity')->get();
        $cities = City::all();

        return view('api.city.getCities', [
            'cities' => $cities
        ]);
    }

    public function checkOutId($cityName){
        $cities = City::select('idCity')->where('city', $cityName)->get();

        return view('api.city.getId', [
            'cities' => $cities
        ]);
    }
}
