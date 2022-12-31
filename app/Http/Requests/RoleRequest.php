<?php

namespace App\Http\Requests;

use Orion\Http\Requests\Request;

class RoleRequest extends Request
{
    public function storeRules() : array
    {
        return [
            'name' => 'required|string|min:3|unique:roles,name',
            'description' => 'nullable|string|min:3',
        ];
    }

    public function updateRules() : array
    {
        return [
            'name' => 'required|string|min:3|unique:roles,name,'.$this->route()->parameter('role'),
            'description' => 'nullable|string|min:3',
        ];
    }
}
