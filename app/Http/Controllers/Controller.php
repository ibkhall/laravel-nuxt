<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Auth;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller as BaseController;

class Controller extends BaseController
{
    //use DisableAuthorization;
    
    public function resolveUser()
    {
        return Auth::guard('sanctum')->user();
    }
    
}
