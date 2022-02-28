<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
    public function index(){

        $cities = City::select('city')->get();

        return view('city.getCities', [
            'cities' => $cities
        ]);
    }

    public function checkOutId($cityName){
        $cities = City::select('idCity')->where('city', $cityName)->get();

        return view('city.getId', [
            'cities' => $cities
        ]);
    }
}
