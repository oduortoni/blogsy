<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Post;

class PostController extends Controller
{
    /*
    * Store a new post
    *
    * @param Request $request
    * @return JsonResponse
    */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'required|string|unique:posts,slug|max:255',
            'is_published' => 'sometimes|boolean',
        ]);

        $post = Post::create([
            ...$validated,
            'views' => 0,
            'likes' => 0,
        ]);

        return response()->json($post, 201);
    }
}
