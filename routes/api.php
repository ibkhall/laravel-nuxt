<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\RolePermissionsController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserPermissionsController;
use App\Http\Controllers\Api\UserRolesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SystemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->append('allPermissions', 'allRoles');
});


Route::group(['as' => 'api.', 'middleware' => ['auth:api']], function() {
    Route::put('/password/reset', [AuthController::class, 'resetPassword'])->name('resetPassword');
    Orion::resource('system', SystemController::class)->only('show', 'update');
    Orion::resource('users', UserController::class)->withSoftDeletes();
    Orion::belongsToManyResource('users','roles', UserRolesController::class);
    Orion::belongsToManyResource('users','permissions', UserPermissionsController::class);
    Orion::resource('roles', RoleController::class);
    Orion::belongsToManyResource('roles', 'permissions', RolePermissionsController::class);
    Orion::resource('permissions', PermissionController::class)->only('index', 'search');
    Orion::resource('activities', ActivityController::class)->only('index', 'search');
});