<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Orion\Concerns\DisablePagination;

class PermissionController extends Controller
{
    
    
    protected $model = Permission::class;

    public function searchableBy() : array
    {
        return ['name', 'description'];
    }

    public function sortableBy() : array
    {
         return ['name', 'description'];
    }
}
