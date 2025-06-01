<?php
/*
* author: @toni
* date: 2025-06-01
* description: Eloquent implementation of PostRepositoryInterface
* file: app/Repositories/EloquentPostRepository.php
*/

declare(strict_types=1);

namespace App\Repositories;

use Blogsy\Domain\Blog\Entities\Post as DomainPost;
use Blogsy\Domain\Blog\Interfaces\PostRepositoryInterface;
use App\Models\Post;

class EloquentPostRepository implements PostRepositoryInterface
{
    /*
     * Save a post
     *
     * @param DomainPost $post
     * @return void
     */
    public function save(DomainPost $post): void
    {
        Post::create([
            'title' => $post->title,
            'content' => $post->content,
            'slug' => $post->slug,
            'is_published' => $post->is_published,
            'views' => $post->views,
            'likes' => $post->likes,
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
                'content' => substr($post->content, 0, 100) . '...',
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
     * @return DomainPost
     */
    public function find(int $id): DomainPost
    {
        $eloquentPost = Post::find($id);
        $post = DomainPost::fromArray([
            'id' => $eloquentPost->id,
            'title' => $eloquentPost->title,
            'slug' => $eloquentPost->slug,
            'content' => $eloquentPost->content,
            'is_published' => $eloquentPost->is_published,
            'views' => $eloquentPost->views ?? 0,
            'likes' => $eloquentPost->likes ?? 0,
            'created_at' => $eloquentPost->created_at,
            'updated_at' => $eloquentPost->updated_at,
        ]);

        return $post;
    }

    /*
     * Increment the views of a post
     *
     * @param int $id
     * @return void
     */
    public function incrementViews(int $id): void
    {
        Post::find($id)->increment('views');
    }

    /*
     * Update a post by id
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
        $post->update($data);
        $post->save();
    }

    /*
     * Delete a post by id
     *
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        Post::find($id)->delete();
    }
}
