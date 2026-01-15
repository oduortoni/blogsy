<?php

/*
* author: @toni
* date: 2025-06-01
* description: Post repository interface
* file: blogsy/blogsy/Domain/Blog/Repositories/PostRepositoryInterface.php
*/

declare(strict_types=1);

namespace Blogsy\Domain\Blog\Repositories;

use Blogsy\Domain\Blog\Entities\Post as DomainPost;

interface PostRepositoryInterface
{
    public function list(): array;

    public function save(DomainPost $post): DomainPost;

    public function find(int $id): ?DomainPost;

    public function incrementViews(int $id): void;

    public function update(int $id, array $data): void;

    public function delete(int $id): void;
}
