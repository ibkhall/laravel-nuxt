<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;


class Role extends \Spatie\Permission\Models\Role{
    use HasFactory;
    protected $casts = [

        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];
    protected $fillable = ['name', 'description', 'guard_name'];

}
