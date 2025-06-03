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
        $endpoints = [
            'GET /api' => 'List all available endpoints',
            'GET /api/posts' => 'List all posts',
            'GET /api/posts/{id}' => 'Get a specific post',
            'POST /api/posts/create' => 'Create a new post',
            'PUT /api/posts/{id}' => 'Update a specific post',
        ];

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'endpoints' => $endpoints,
        ]);
    }
}
