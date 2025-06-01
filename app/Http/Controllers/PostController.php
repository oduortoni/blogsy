<?php

/*
* author: @toni
* date: 2025-06-01
* description: HTTP controller for creating posts
* file: app/Http/Controllers/PostController.php
*/

declare(strict_types=1);

namespace App\Http\Controllers;

use Blogsy\Application\Blog\Interfaces\PostServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    protected $service;

    public function __construct(PostServiceInterface $service)
    {
        $this->service = $service;
    }

    /*
    * List all posts
    *
    * @return JsonResponse
    */
    public function index(): JsonResponse
    {
        $posts = $this->service->list();

        return response()->json([
            'posts' => $posts,
            'message' => 'Posts fetched successfully',
        ], 200);
    }

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

        $this->service->create([
            ...$validated,
            'views' => 0,
            'likes' => 0,
        ]);

        return response()->json(['message' => 'Post created'], 201);
    }

    /*
    * Show a post by id
    *
    * @param int $id
    * @return JsonResponse
    */
    public function show(int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }

        return response()->json([
            'post' => $post,
            'message' => 'Post fetched successfully',
        ], 200);
    }

    /*
    * Update a post by id
    *
    * @param Request $request
    * @param int $id
    * @return JsonResponse
    */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'slug' => 'nullable|string|unique:posts,slug|max:255',
            'is_published' => 'sometimes|boolean',
        ]);

        $post = $this->service->find($id);
        if (! $post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }

        $this->service->update($id, $validated);

        return response()->json(['message' => 'Post updated'], 200);
    }

    /*
    * Delete a post by id
    *
    * @param int $id
    * @return JsonResponse
    */
    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json(['message' => 'Post deleted'], 200);
    }
}
