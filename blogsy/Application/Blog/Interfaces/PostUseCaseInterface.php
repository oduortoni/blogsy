<?php
/*
* author: @toni
* date: 2025-06-01
* description: Interface for Post use case
* file: blogsy/blogsy/Application/Blog/Interfaces/PostUseCaseInterface.php
*/

declare(strict_types=1);

namespace Blogsy\Application\Blog\Interfaces;

interface PostUseCaseInterface
{
    public function create(array $data): void;
}
