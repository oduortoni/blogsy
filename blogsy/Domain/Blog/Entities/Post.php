<?php
/*
* author: @toni
* date: 2025-06-01
* description: Post entity
* file: blogsy/blogsy/Domain/Blog/Entities/Post.php
*/

declare(strict_types=1);

namespace Blogsy\Domain\Blog\Entities;

class Post
{
    public int $id;
    public string $created_at;
    public string $updated_at;

    public function __construct(
        public string $title,
        public string $content,
        public string $slug,
        public bool $is_published,
        public int $views,
        public int $likes,
    ) {}
}
