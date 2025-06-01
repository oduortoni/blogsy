<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Blogsy\Domain\Blog\Interfaces\PostRepositoryInterface;
use App\Repositories\EloquentPostRepository;
use Blogsy\Application\Blog\Interfaces\PostServiceInterface;
use Blogsy\Application\Blog\Services\PostService; 

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
