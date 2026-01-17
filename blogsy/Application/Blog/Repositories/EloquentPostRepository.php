<?php

/*
* author: @toni
* date: 2025-06-01
* description: Eloquent implementation of PostRepositoryInterface
* file: blogsy/Application/Blog/Repositories/EloquentPostRepository.php
*/

declare(strict_types=1);

namespace Blogsy\Application\Blog\Repositories;

use App\Models\Post;
use App\Models\User;
use Blogsy\Domain\Blog\Entities\Post as DomainPost;
use Blogsy\Domain\Blog\Repositories\PostRepositoryInterface;

class EloquentPostRepository implements PostRepositoryInterface
{
    /*
     * Save a post
     *
     * @param DomainPost $post
     * @return DomainPost
     */
    public function save(DomainPost $post): DomainPost
    {
        $data = [
            'title' => $post->title,
            'content' => $post->content,
            'slug' => $post->slug,
            'featured_image' => $post->featured_image,
            'is_published' => $post->is_published,
            'views' => $post->views,
            'likes' => $post->likes,
            'user_id' => $post->user_id ?? null,
        ];

        if ($post->is_published) {
            $data['published_at'] = now();
        }

        $created = Post::create($data);

        return DomainPost::fromArray([
            'id' => $created->id,
            'title' => $created->title,
            'slug' => $created->slug,
            'content' => $created->content,
            'featured_image' => $created->featured_image,
            'is_published' => $created->is_published,
            'views' => $created->views,
            'likes' => $created->likes,
            'user_id' => $created->user_id,
            'created_at' => $created->created_at,
            'updated_at' => $created->updated_at,
        ]);
    }

    /*
     * List all posts
     *
     * @return array
     */
    public function list(): array
    {
        $posts = Post::all()->map(function ($post) {
            $content = $post->content;
            $preview = '';
            
            if (is_array($content)) {
                $textBlock = collect($content)->first(fn($b) => isset($b['content']));
                $preview = $textBlock['content'] ?? '';
            } else {
                $preview = $content ?? '';
            }
            
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => substr($preview, 0, 100).'...',
                'featured_image' => $post->featured_image,
                'is_published' => $post->is_published,
                'views' => $post->views,
                'likes' => $post->likes,
                'user_id' => $post->user_id,
                'published_at' => $post->published_at,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        })->toArray();
        return $posts;
    }

    /*
     * Find a post by id
     *
     * @param int $id
     * @return DomainPost|null
     */
    public function find(int $id): ?DomainPost
    {
        $eloquentPost = Post::with('user:id,name')->find($id);
        if (! $eloquentPost) {
            return null;
        }

        return DomainPost::fromArray([
            'id' => $eloquentPost->id,
            'title' => $eloquentPost->title,
            'slug' => $eloquentPost->slug,
            'content' => $eloquentPost->content,
            'featured_image' => $eloquentPost->featured_image,
            'is_published' => $eloquentPost->is_published,
            'views' => $eloquentPost->views,
            'likes' => $eloquentPost->likes,
            'user_id' => $eloquentPost->user_id,
            'user' => $eloquentPost->user ? ['name' => $eloquentPost->user->name] : null,
            'published_at' => $eloquentPost->published_at,
            'created_at' => $eloquentPost->created_at,
            'updated_at' => $eloquentPost->updated_at,
        ]);
    }

    /*
     * Increment the views of a post
     *
     * @param int $id
     * @return void
     */
    public function incrementViews(int $id): void
    {
        Post::where('id', $id)->increment('views');
    }

    /*
     * Update a post by id
     *
     * @param int $id
     * @param array $data
     * @return void
     */
    public function update(int $id, array $data): void
    {
        $post = Post::find($id);
        if (!$post) return;

        $wasUnpublished = !$post->is_published;
        $nowPublished = $data['is_published'] ?? false;

        if ($wasUnpublished && $nowPublished && !$post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);
    }

    /*
     * Delete a post by id
     *
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        Post::find($id)?->delete();
    }

    /*
     * Get featured posts
     *
     * @return array
     */
    public function getFeatured(): array
    {
        $posts = Post::whereHas('featured')->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => is_array($post->content) ? (collect($post->content)->first(fn($b) => isset($b['content']))['content'] ?? '') : $post->content,
                'featured_image' => $post->featured_image,
                'is_published' => $post->is_published,
                'views' => $post->views,
                'likes' => $post->likes,
                'published_at' => $post->published_at,
            ];
        })->toArray();
        return $posts;
    }

    /*
     * Feature a post
     *
     * @param int $id
     * @return void
     */
    public function feature(int $id): void
    {
        $post = Post::find($id);
        if ($post && !$post->featured()->exists()) {
            $post->featured()->create([]);
        }
    }

    /*
     * Unfeature a post
     *
     * @param int $id
     * @return void
     */
    public function unfeature(int $id): void
    {
        Post::find($id)?->featured()->delete();
    }
}
