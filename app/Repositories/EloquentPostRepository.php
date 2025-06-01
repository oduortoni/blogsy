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
}
