<?php
/*
* author: @toni
* date: 2025-06-01
* description: Create post use case
* file: blogsy/blogsy/Application/Blog/UseCases/PostUseCase.php
*/

declare(strict_types=1);

namespace Blogsy\Application\Blog\UseCases;

use Blogsy\Domain\Blog\Entities\Post;
use Blogsy\Domain\Blog\Interfaces\PostRepositoryInterface;
use Blogsy\Application\Blog\Interfaces\PostUseCaseInterface;

class PostUseCase implements PostUseCaseInterface
{
    protected $repository;

    public function __construct(PostRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /*
     * Create a new post
     *
     * @param array $data
     * @return void
     */
    public function create(array $data): void
    {
        $post = new Post(
            $data['title'],
            $data['content'],
            $data['slug'],
            $data['is_published'],
            $data['views'],
            $data['likes']
        );

        $this->repository->save($post);
    }
}
