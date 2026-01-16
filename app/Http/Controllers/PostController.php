<?php

/*
* author: @toni
* date: 2025-06-01
* description: HTTP controller for creating posts
* file: app/Http/Controllers/PostController.php
*/

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Blogsy\Domain\Blog\Services\PostServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    use ApiResponse;

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

        return $this->success($posts, 'Posts fetched successfully');
    }

    /*
    * store a new post
    *
    * @param Request $request
    * @return JsonResponse
    */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'slug' => 'required|string|unique:posts,slug|max:255',
            'featured_image' => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $post = $this->service->create([
            ...$validated,
            'user_id' => $request->user()->id,
            'views' => 0,
            'likes' => 0,
        ]);

        return $this->success($post, 'Post created successfully', 201);
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
            return $this->error('Post not found', null, 404);
        }

        return $this->success($post, 'Post fetched successfully');
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
            'content' => 'nullable|array',
            'slug' => 'nullable|string|max:255|unique:posts,slug,'.$id,
            'featured_image' => 'nullable|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        if ($post->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', null, 403);
        }

        $updatedPost = $this->service->update($id, $validated);

        return $this->success($updatedPost, 'Post updated successfully');
    }

    /*
    * Delete a post by id
    *
    * @param int $id
    * @return JsonResponse
    */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        if ($post->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', null, 403);
        }

        $this->service->delete($id);

        return $this->success(null, 'Post deleted successfully');
    }

    /*
    * Get featured posts
    *
    * @return JsonResponse
    */
    public function featured(): JsonResponse
    {
        $posts = $this->service->getFeatured();
        return $this->success($posts, 'Featured posts fetched successfully');
    }

    /*
    * Feature a post
    *
    * @param int $id
    * @return JsonResponse
    */
    public function feature(Request $request, int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        if ($post->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', null, 403);
        }

        $this->service->feature($id);
        return $this->success(null, 'Post featured successfully');
    }

    /*
    * Unfeature a post
    *
    * @param int $id
    * @return JsonResponse
    */
    public function unfeature(Request $request, int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        if ($post->user_id !== $request->user()->id) {
            return $this->error('Unauthorized', null, 403);
        }

        $this->service->unfeature($id);
        return $this->success(null, 'Post unfeatured successfully');
    }

    public function like(Request $request, int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        $userId = $request->user()->id;
        $existing = \App\Models\PostLike::where('user_id', $userId)->where('post_id', $id)->first();
        
        if ($existing) {
            return $this->success(['already_liked' => true], 'Already liked');
        }

        \App\Models\PostLike::create(['user_id' => $userId, 'post_id' => $id]);
        \App\Models\Post::where('id', $id)->increment('likes');

        return $this->success(null, 'Post liked successfully');
    }

    public function unlike(Request $request, int $id): JsonResponse
    {
        $post = $this->service->find($id);
        if (! $post) {
            return $this->error('Post not found', null, 404);
        }

        $userId = $request->user()->id;
        $deleted = \App\Models\PostLike::where('user_id', $userId)->where('post_id', $id)->delete();
        
        if (!$deleted) {
            return $this->success(['not_liked' => true], 'Not liked yet');
        }

        \App\Models\Post::where('id', $id)->decrement('likes');

        return $this->success(null, 'Post unliked successfully');
    }

    public function checkLike(Request $request, int $id): JsonResponse
    {
        $userId = $request->user()->id;
        $liked = \App\Models\PostLike::where('user_id', $userId)->where('post_id', $id)->exists();
        
        return $this->success(['liked' => $liked]);
    }
}
