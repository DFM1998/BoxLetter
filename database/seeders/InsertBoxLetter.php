<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
//use App\Models\InsertData;

class InsertBoxLetter extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        //InsertData::truncate();

        $csvFile = fopen(base_path("database/data/boxLetter.csv"), "r");

        while (($data = fgetcsv($csvFile, 2000)) !== FALSE) {
            //echo $data['0'] . "\n";
            //echo $data['1'] . "\n";
            //echo $data['2'] . "\n";
            //echo $data['3'] . "\n";
            //echo $data['4'] . "\n";
            //echo $data['5'] . "\n";
        
            DB::table('boxLetter')->insert([
                "idBoxLetter" => $data['0'],
                "typeOfBoxLetter" => $data['1'],
                "street" => $data['2'],
                "pickUpTime" => $data['3'],
                "coordinates" => $data['4'],
                "fkCity" => $data['5'],
            ]);
        }
        fclose($csvFile);
    }
}
