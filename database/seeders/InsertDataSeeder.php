<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
//use App\Models\InsertData;

class InsertDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        //InsertData::truncate();

        $csvFile = fopen(base_path("database/data/data2.csv"), "r");


        while (($line = fgetcsv($csvFile, 2000, "\n")) !== FALSE) {
            $data = explode(",", $line['0']);
            $address = explode("`", $line['0']);;
            //echo $data['0'] . "\n";
            //echo $data['1'] . "\n";
            //echo $address['1'] . "\n";
            //echo $data[count($data)-4] . "\n";
            //echo $data[count($data)-3] . "\n";
            //echo $data[count($data)-2] . "\n";
            //echo $data[count($data)-1] . "\n";
            DB::table('boxLetterAllData')->insert([
                "idBoxLetter" => $data['0'],
                "typeOfBoxLetter" => $data['1'],
                "street" => $address['1'],
                "pickUpTime" => $data[count($data)-4],
                "city" => $data[count($data)-3],
                "coordinatesx" => $data[count($data)-2],
                "coordinatesy" => $data[count($data)-1]
            ]);
        }
        fclose($csvFile);
    }
}
