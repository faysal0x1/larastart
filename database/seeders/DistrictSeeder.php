<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $districts = [
            ['id' => '1', 'division_id' => '1', 'district_name' => 'Comilla'],
            ['id' => '2', 'division_id' => '1', 'district_name' => 'Feni'],
            ['id' => '3', 'division_id' => '1', 'district_name' => 'Brahmanbaria'],
            ['id' => '4', 'division_id' => '1', 'district_name' => 'Rangamati'],
            ['id' => '5', 'division_id' => '1', 'district_name' => 'Noakhali'],
            ['id' => '6', 'division_id' => '1', 'district_name' => 'Chandpur'],
            ['id' => '7', 'division_id' => '1', 'district_name' => 'Lakshmipur'],
            ['id' => '8', 'division_id' => '1', 'district_name' => 'Chattogram'],
            ['id' => '9', 'division_id' => '1', 'district_name' => 'Coxsbazar'],
            ['id' => '10', 'division_id' => '1', 'district_name' => 'Khagrachhari'],
            ['id' => '11', 'division_id' => '1', 'district_name' => 'Bandarban'],
            ['id' => '12', 'division_id' => '2', 'district_name' => 'Sirajganj'],
            ['id' => '13', 'division_id' => '2', 'district_name' => 'Pabna'],
            ['id' => '14', 'division_id' => '2', 'district_name' => 'Bogura'],
            ['id' => '15', 'division_id' => '2', 'district_name' => 'Rajshahi'],
            ['id' => '16', 'division_id' => '2', 'district_name' => 'Natore'],
            ['id' => '17', 'division_id' => '2', 'district_name' => 'Joypurhat'],
            ['id' => '18', 'division_id' => '2', 'district_name' => 'Chapainawabganj'],
            ['id' => '19', 'division_id' => '2', 'district_name' => 'Naogaon'],
            ['id' => '20', 'division_id' => '3', 'district_name' => 'Jashore'],
            ['id' => '21', 'division_id' => '3', 'district_name' => 'Satkhira'],
            ['id' => '22', 'division_id' => '3', 'district_name' => 'Meherpur'],
            ['id' => '23', 'division_id' => '3', 'district_name' => 'Narail'],
            ['id' => '24', 'division_id' => '3', 'district_name' => 'Chuadanga'],
            ['id' => '25', 'division_id' => '3', 'district_name' => 'Kushtia'],
            ['id' => '26', 'division_id' => '3', 'district_name' => 'Magura'],
            ['id' => '27', 'division_id' => '3', 'district_name' => 'Khulna'],
            ['id' => '28', 'division_id' => '3', 'district_name' => 'Bagerhat'],
            ['id' => '29', 'division_id' => '3', 'district_name' => 'Jhenaidah'],
            ['id' => '30', 'division_id' => '4', 'district_name' => 'Jhalakathi'],
            ['id' => '31', 'division_id' => '4', 'district_name' => 'Patuakhali'],
            ['id' => '32', 'division_id' => '4', 'district_name' => 'Pirojpur'],
            ['id' => '33', 'division_id' => '4', 'district_name' => 'Barishal'],
            ['id' => '34', 'division_id' => '4', 'district_name' => 'Bhola'],
            ['id' => '35', 'division_id' => '4', 'district_name' => 'Barguna'],
            ['id' => '36', 'division_id' => '5', 'district_name' => 'Sylhet'],
            ['id' => '37', 'division_id' => '5', 'district_name' => 'Moulvibazar'],
            ['id' => '38', 'division_id' => '5', 'district_name' => 'Habiganj'],
            ['id' => '39', 'division_id' => '5', 'district_name' => 'Sunamganj'],
            ['id' => '40', 'division_id' => '6', 'district_name' => 'Narsingdi'],
            ['id' => '41', 'division_id' => '6', 'district_name' => 'Gazipur'],
            ['id' => '42', 'division_id' => '6', 'district_name' => 'Shariatpur'],
            ['id' => '43', 'division_id' => '6', 'district_name' => 'Narayanganj'],
            ['id' => '44', 'division_id' => '6', 'district_name' => 'Tangail'],
            ['id' => '45', 'division_id' => '6', 'district_name' => 'Kishoreganj'],
            ['id' => '46', 'division_id' => '6', 'district_name' => 'Manikganj'],
            ['id' => '47', 'division_id' => '6', 'district_name' => 'Dhaka'],
            ['id' => '48', 'division_id' => '6', 'district_name' => 'Munshiganj'],
            ['id' => '49', 'division_id' => '6', 'district_name' => 'Rajbari'],
            ['id' => '50', 'division_id' => '6', 'district_name' => 'Madaripur'],
            ['id' => '51', 'division_id' => '6', 'district_name' => 'Gopalganj'],
            ['id' => '52', 'division_id' => '6', 'district_name' => 'Faridpur'],
            ['id' => '53', 'division_id' => '7', 'district_name' => 'Panchagarh'],
            ['id' => '54', 'division_id' => '7', 'district_name' => 'Dinajpur'],
            ['id' => '55', 'division_id' => '7', 'district_name' => 'Lalmonirhat'],
            ['id' => '56', 'division_id' => '7', 'district_name' => 'Nilphamari'],
            ['id' => '57', 'division_id' => '7', 'district_name' => 'Gaibandha'],
            ['id' => '58', 'division_id' => '7', 'district_name' => 'Thakurgaon'],
            ['id' => '59', 'division_id' => '7', 'district_name' => 'Rangpur'],
            ['id' => '60', 'division_id' => '7', 'district_name' => 'Kurigram'],
            ['id' => '61', 'division_id' => '8', 'district_name' => 'Sherpur'],
            ['id' => '62', 'division_id' => '8', 'district_name' => 'Mymensingh'],
            ['id' => '63', 'division_id' => '8', 'district_name' => 'Jamalpur'],
            ['id' => '64', 'division_id' => '8', 'district_name' => 'Netrokona'],
        ];

        DB::table('districts')->insert($districts);
    }
}
