<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Arr;
class PlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(config('hosting_plans.default') as $plan_name => $details){
            foreach($details as $row){
                Plan::create([
                    'name' => $plan_name,
                    'quantity' => (Arr::has($row, 'quantity')) ? ($row['quantity']) : (null),
                    'price' => $row['price'],
                    'duration' => $row['duration'],
                    'type' => (Arr::has($row, 'type')) ? ($row['type']) : ('limited'),
                    'discount' => (Arr::has($row, 'discount')) ? ($row['discount']) : (null),
                    'backup_rate' => (Arr::has($row, 'backup_rate')) ? ($row['backup_rate']) : (null),
                ]);
            }
        }
    }
}
