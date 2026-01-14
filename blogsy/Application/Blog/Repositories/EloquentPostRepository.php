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
        $created = Post::create([
            'title' => $post->title,
            'content' => $post->content,
            'slug' => $post->slug,
            'is_published' => $post->is_published,
            'views' => $post->views,
            'likes' => $post->likes,
        ]);

        return DomainPost::fromArray([
            'id' => $created->id,
            'title' => $created->title,
            'slug' => $created->slug,
            'content' => $created->content,
            'is_published' => $created->is_published,
            'views' => $created->views,
            'likes' => $created->likes,
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
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => substr($post->content, 0, 100).'...',
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
        $eloquentPost = Post::find($id);
        if (! $eloquentPost) {
            return null;
        }

        return DomainPost::fromArray([
            'id' => $eloquentPost->id,
            'title' => $eloquentPost->title,
            'slug' => $eloquentPost->slug,
            'content' => $eloquentPost->content,
            'is_published' => $eloquentPost->is_published,
            'views' => $eloquentPost->views,
            'likes' => $eloquentPost->likes,
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
        $post?->update($data);
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
}
