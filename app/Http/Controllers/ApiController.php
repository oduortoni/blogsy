<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    /*
    *  API endpoint for the json that lists all available endpoints
    */
    public function api(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'OK'
        ]);
    }
}
