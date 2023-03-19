<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActivated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()->is_active) {
            return response()->json([
                'errors' => [
                  'name' => trans('auth.deactivated'),
                ],
                'message' => 'Access error'
              ], 401);
        }
 
      
        return $next($request);
    }
}
