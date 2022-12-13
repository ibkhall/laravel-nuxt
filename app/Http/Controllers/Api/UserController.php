<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    protected $model = User::class;

    public function searchableBy() : array
    {
        return ['name', 'email'];
    }

    public function sortableBy() : array
    {
         return ['id', 'name','email'];
    }
}
