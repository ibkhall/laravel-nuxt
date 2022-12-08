<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Orion\Concerns\DisablePagination;

class PermissionController extends Controller
{
    use DisablePagination;
    
    protected $model = Permission::class;
}
