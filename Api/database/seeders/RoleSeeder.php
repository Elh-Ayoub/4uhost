<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'title' => 'Admin',
            'description' => 'This is Admin role, he have access to make CRUD operation to all fields.'
        ]);
        Role::create([
            'title' => 'User',
            'description' => 'User can authenticate and make an purchases.'
        ]);
    }
}
