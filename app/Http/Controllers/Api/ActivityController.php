<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;



class ActivityController extends Controller
{
    protected $model = Activity::class;

    public function searchableBy() : array
    {
        return ['created_at', 'description'];
    }

    public function sortableBy() : array
    {
         return ['created_at', 'description'];
    }

    public function alwaysIncludes() : array
    {
        return ['causer'];
    }
}
