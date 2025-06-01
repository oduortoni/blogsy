<?php

/*
* author: @toni
* date: 2025-06-01
* description: Interface for Post use case
* file: blogsy/blogsy/Application/Blog/Interfaces/PostServiceInterface.php
*/

declare(strict_types=1);

namespace Blogsy\Application\Blog\Interfaces;

interface PostServiceInterface
{
    public function create(array $data): void;
}
