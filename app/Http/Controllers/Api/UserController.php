<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    protected $model = User::class;

    public function includes() : array
    {
        return ['permissions', 'roles'];
    }

    public function searchableBy() : array
    {
        return ['name', 'email'];
    }

    public function sortableBy() : array
    {
         return ['id', 'name','email', 'created_at', 'updated_at'];
    }
}
