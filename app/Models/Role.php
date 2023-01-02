<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Role extends \Spatie\Permission\Models\Role{
    use HasFactory, LogsActivity;
    protected $casts = [

        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];
    protected $fillable = ['name', 'description', 'guard_name'];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults();
    }

}
