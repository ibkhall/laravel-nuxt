<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
            'name' => 'Super Admin',
            'email' => 'admin@app.com',
        ]);
        CauserResolver::setCauser(User::find(1));
        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $user->assignRole(1);
    }
}
