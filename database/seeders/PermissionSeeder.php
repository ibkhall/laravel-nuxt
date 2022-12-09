<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'manage_permissions']);
        Permission::create(['name' => 'create.user']);
        Permission::create(['name' => 'update.user']);
        Permission::create(['name' => 'read.user']);
        Permission::create(['name' => 'delete.user']);
    }
}
