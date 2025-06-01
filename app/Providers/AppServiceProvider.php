<?php

namespace App\Providers;

use App\Repositories\EloquentPostRepository;
use Blogsy\Application\Blog\Interfaces\PostServiceInterface;
use Blogsy\Application\Blog\Services\PostService;
use Blogsy\Domain\Blog\Interfaces\PostRepositoryInterface;
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
