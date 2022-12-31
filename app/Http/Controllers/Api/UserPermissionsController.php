<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Orion\Http\Controllers\RelationController as ControllersRelationController;

class UserPermissionsController extends ControllersRelationController
{
    protected $model = User::class; // or "App\Models\Post"

    /**
     * Name of the relationship as it is defined on the Post model
     */
    protected $relation = 'permissions';
}
