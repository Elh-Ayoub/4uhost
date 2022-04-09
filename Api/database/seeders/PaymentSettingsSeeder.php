<?php

namespace Database\Seeders;

use App\Models\PaymentSettings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(config('payment') as $title => $value){
            PaymentSettings::create([
                'title' => $title,
                'value' => $value,
            ]);
        }
    }
}
