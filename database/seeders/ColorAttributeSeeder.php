<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = [
            ['name' => 'YellowGreen', 'code' => '#9ACD32'],
            ['name' => 'Yellow', 'code' => '#FFFF00'],
            ['name' => 'WhiteSmoke', 'code' => '#F5F5F5'],
            ['name' => 'White', 'code' => '#FFFFFF'],
            ['name' => 'Wheat', 'code' => '#F5DEB3'],
            ['name' => 'Violet', 'code' => '#EE82EE'],
            ['name' => 'Turquoise', 'code' => '#40E0D0'],
            ['name' => 'Tomato', 'code' => '#FF6347'],
            ['name' => 'Thistle', 'code' => '#D8BFD8'],
            ['name' => 'Teal', 'code' => '#008080'],
            ['name' => 'Tan', 'code' => '#D2B48C'],
            ['name' => 'SteelBlue', 'code' => '#4682B4'],
            ['name' => 'SpringGreen', 'code' => '#00FF7F'],
            ['name' => 'Snow', 'code' => '#FFFAFA'],
            ['name' => 'SlateGray', 'code' => '#708090'],
            ['name' => 'SlateBlue', 'code' => '#6A5ACD'],
            ['name' => 'SkyBlue', 'code' => '#87CEEB'],
            ['name' => 'Silver', 'code' => '#C0C0C0'],
            ['name' => 'Sienna', 'code' => '#A0522D'],
            ['name' => 'Seashell', 'code' => '#FFF5EE'],
            ['name' => 'SeaGreen', 'code' => '#2E8B57'],
            ['name' => 'SandyBrown', 'code' => '#F4A460'],
            ['name' => 'Salmon', 'code' => '#FA8072'],
            ['name' => 'SaddleBrown', 'code' => '#8B4513'],
            ['name' => 'RoyalBlue', 'code' => '#4169E1'],
            ['name' => 'RosyBrown', 'code' => '#BC8F8F'],
            ['name' => 'Red', 'code' => '#FF0000'],
            ['name' => 'Purple', 'code' => '#800080'],
            ['name' => 'PowderBlue', 'code' => '#B0E0E6'],
            ['name' => 'Plum', 'code' => '#DDA0DD'],
            ['name' => 'Pink', 'code' => '#FFC0CB'],
            ['name' => 'Peru', 'code' => '#CD853F'],
            ['name' => 'PeachPuff', 'code' => '#FFDAB9'],
            ['name' => 'PapayaWhip', 'code' => '#FFEFD5'],
            ['name' => 'PaleVioletRed', 'code' => '#DB7093'],
            ['name' => 'PaleTurquoise', 'code' => '#AFEEEE'],
            ['name' => 'PaleGreen', 'code' => '#98FB98'],
            ['name' => 'PaleGoldenrod', 'code' => '#EEE8AA'],
            ['name' => 'Orchid', 'code' => '#DA70D6'],
            ['name' => 'OrangeRed', 'code' => '#FF4500'],
            ['name' => 'Orange', 'code' => '#FFA500'],
        ];

        DB::table('color_attributes')->insert($colors);
    }
}
