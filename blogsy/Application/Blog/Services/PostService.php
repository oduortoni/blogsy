<?php

/*
* author: @toni
* date: 2025-06-01
* description: Create post use case
* file: blogsy/blogsy/Application/Blog/Services/PostService.php
*/

declare(strict_types=1);

namespace Blogsy\Application\Blog\Services;

use Blogsy\Domain\Blog\Entities\Post;
use Blogsy\Domain\Blog\Services\PostServiceInterface;
use Blogsy\Domain\Blog\Repositories\PostRepositoryInterface;

class PostService implements PostServiceInterface
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
     * @return Post
     */
    public function create(array $data): Post
    {
        $post = Post::fromArray($data);
        return $this->repository->save($post);
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
     * @return Post|null
     */
    public function find(int $id): ?Post
    {
        $post = $this->repository->find($id);
        if (! $post) {
            return null;
        }
        $this->repository->incrementViews($id);

        return $post;
    }

    /*
     * Update a post by id
     *
     * @param int $id
     * @param array $data
     * @return Post|null
     */
    public function update(int $id, array $data): ?Post
    {
        $this->repository->update($id, $data);
        return $this->repository->find($id);
    }

    /*
     * Delete a post by id
     *
     * @param int $id
     * @return void
     */
    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }
}
