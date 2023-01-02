<?php

namespace App\Models;

use Spatie\Activitylog\Models\Activity as Base;

class Activity extends Base
{
   
    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];
    
}
