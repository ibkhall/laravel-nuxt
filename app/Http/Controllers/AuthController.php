<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends BaseController
{
    public function login(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|string',
            'password' => 'required|min:6'
        ]);

        if (!Auth::guard('web')->attempt($request->only('name', 'password'))) {
            return response()->json([
              'errors' => [
                'name' => trans('auth.failed'),
              ],
              'message' => 'Credentials error'
            ], 401);
        }
        $request->session()->regenerate();
    }

    public function resetPassword(Request $request) {
        $this->validate($request, [
            'old_password' => 'current_password:web',
            'password' => 'required|string|confirmed|min:6|different:old_password'
        ]);
        /**
         * @var \App\Models\User $user
         */
        $user = Auth::user();

        $user->password = $request->password;

        return $user->save();

    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
