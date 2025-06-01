<?php
/*
* author: @toni
* date: 2025-06-01
* description: HTTP controller for creating posts
* file: app/Http/Controllers/PostController.php
*/

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Blogsy\Application\Blog\Interfaces\PostUseCaseInterface;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    protected $useCase;

    public function __construct(PostUseCaseInterface $useCase)
    {
        $this->useCase = $useCase;
    }

    /*
    * List all posts
    *
    * @return JsonResponse
    */
    public function index(): JsonResponse
    {
        $posts = $this->useCase->list();

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

        $this->useCase->create([
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
        $post = $this->useCase->find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }
        return response()->json([
            'post' => $post,
            'message' => 'Post fetched successfully',
        ], 200);
    }

    // public function update(Request $request, Post $post) {}
    // public function destroy(Post $post) {}
}
