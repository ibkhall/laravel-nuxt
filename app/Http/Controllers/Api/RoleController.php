<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;

class RoleController extends Controller
{
    protected $model = Role::class;

    public function includes() : array
    {
        return ['permissions'];
    }

   
    public function searchableBy() : array
    {
        return ['name', 'description'];
    }
}
