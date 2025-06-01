<?php
/*
* author: @toni
* date: 2025-06-01
* description: Post repository interface
* file: blogsy/blogsy/Domain/Blog/Interfaces/PostRepositoryInterface.php
*/

declare(strict_types=1);

namespace Blogsy\Domain\Blog\Interfaces;

use Blogsy\Domain\Blog\Entities\Post;

interface PostRepositoryInterface
{
    public function save(Post $post): void;
}
