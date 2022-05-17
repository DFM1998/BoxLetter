<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

  

class InsertData extends Model

{

    use HasFactory;
    protected $fillable = [

        'idBoxLetter', 'typeOfBoxLetter', 'street', 'pickUpTime', 'city', 'coordinatesx', 'coordinatesy'

    ];

}
