<?php

/*
* author: @toni
* date: 2025-06-01
* description: Interface for Post use case
* file: blogsy/blogsy/Domain/Blog/Services/PostServiceInterface.php
*/

declare(strict_types=1);

namespace Blogsy\Domain\Blog\Services;

use Blogsy\Domain\Blog\Entities\Post;

interface PostServiceInterface
{
    public function create(array $data): Post;
    public function list(): array;
    public function find(int $id): ?Post;
    public function update(int $id, array $data): ?Post;
    public function delete(int $id): void;
    public function getFeatured(): array;
    public function feature(int $id): void;
    public function unfeature(int $id): void;
}
