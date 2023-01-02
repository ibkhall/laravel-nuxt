<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Permission extends \Spatie\Permission\Models\Permission
{
    use HasFactory, LogsActivity;

    protected $fillable = ['name', 'description', 'guard_name'];
    
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

}
