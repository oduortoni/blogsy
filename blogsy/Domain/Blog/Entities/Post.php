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
    public function __construct(
        public int $id,
        public string $title,
        public string $slug,
        public array|string $content,
        public ?string $featured_image,
        public bool $is_published,
        public int $views,
        public int $likes,
        public ?int $user_id,
        public ?string $published_at,
        public string $created_at,
        public string $updated_at,
    ) {}

    /**
     * Create a new Post from an array of data
     */
    public static function fromArray(array $data): static
    {
        $now = date('d-m-Y H:i:s');

        return new static(
            $data['id'] ?? 0,
            $data['title'],
            $data['slug'],
            $data['content'] ?? [],
            $data['featured_image'] ?? null,
            $data['is_published'] ?? false,
            $data['views'] ?? 0,
            $data['likes'] ?? 0,
            $data['user_id'] ?? null,
            $data['published_at'] ?? null,
            $data['created_at'] ?? $now,
            $data['updated_at'] ?? $now
        );
    }
}
