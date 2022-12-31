<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Orion\Http\Controllers\RelationController as ControllersRelationController;

class RolePermissionsController extends ControllersRelationController
{
    
    protected $model = Role::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'permissions';
    
}
