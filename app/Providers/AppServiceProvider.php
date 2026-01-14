<?php

namespace App\Providers;

use Blogsy\Domain\Blog\Services\PostServiceInterface;
use Blogsy\Application\Blog\Services\PostService;
use Blogsy\Domain\Blog\Repositories\PostRepositoryInterface;
use Blogsy\Application\Blog\Repositories\EloquentPostRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PostRepositoryInterface::class, EloquentPostRepository::class);
        $this->app->bind(PostServiceInterface::class, PostService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
