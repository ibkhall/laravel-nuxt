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
        Permission::create(['name' => 'manage_permissions', 'description' => 'Gérer les accès']);
        Permission::create(['name' => 'user.create', 'description' => 'Créer un utilisateur']);
        Permission::create(['name' => 'user.update', 'description' => 'Modifier un utilisateur']);
        Permission::create(['name' => 'user.read', 'description' => 'Voir les utilisateur']);
        Permission::create(['name' => 'user.delete', 'description' => 'Supprimer un utilisateur']);
    }
}
