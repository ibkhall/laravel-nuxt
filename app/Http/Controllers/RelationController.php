<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Orion\Http\Controllers\RelationController as BaseController;

class RelationController extends BaseController
{
    //use DisableAuthorization;
    
    public function resolveUser()
    {
        return Auth::guard('sanctum')->user();
    }
    
}
