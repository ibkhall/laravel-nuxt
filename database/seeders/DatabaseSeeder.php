<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\System;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Activitylog\Facades\CauserResolver;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'name' => 'supadmin',
            'email' => 'supadmin@app.com',
        ]);
        CauserResolver::setCauser(User::find(1));
        System::create(['name' => 'Boilerplate', 'address' => 'Niamey', 'logo' => 'logo.png', 'telephone1' => '00000000']);
        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $user->assignRole(1);
    }
}
