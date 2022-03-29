<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boxletter extends Model
{
    //use HasFactory;

    protected $table = 'boxLetter';
    protected $fillable = ['typeOfBoxLetter', 'street', 'pickUpTime', 'coordinates', 'normalCoordinates', 'fkCity', 'postal'];
}
