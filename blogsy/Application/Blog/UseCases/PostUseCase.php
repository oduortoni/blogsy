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
        $post = Post::fromArray($data);
        $this->repository->save($post);
    }

    /*
     * List all posts
     *
     * @return array
     */
    public function list(): array
    {
        return $this->repository->list();
    }

    /*
     * Find a post by id
     *
     * @param int $id
     * @return Post
     */
    public function find(int $id): Post
    {
        $post = $this->repository->find($id);
        if (!$post) {
            return null;
        }
        $this->repository->incrementViews($id);
        return $post;
    }
}
