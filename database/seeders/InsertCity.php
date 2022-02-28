<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
//use App\Models\InsertData;

class InsertCity extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        //InsertData::truncate();

        $csvFile = fopen(base_path("database/data/city.csv"), "r");


        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            DB::table('city')->insert([
                "idCity" => $data['0'],
                "city" => $data['1'],
                "population" => $data['2'],
            ]);
        }
        fclose($csvFile);
    }
}
