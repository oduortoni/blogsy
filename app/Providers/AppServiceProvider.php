<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Blogsy\Domain\Blog\Interfaces\PostRepositoryInterface;
use App\Repositories\EloquentPostRepository;
use Blogsy\Application\Blog\Interfaces\PostUseCaseInterface;
use Blogsy\Application\Blog\UseCases\PostUseCase; 

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PostRepositoryInterface::class, EloquentPostRepository::class);
        $this->app->bind(PostUseCaseInterface::class, PostUseCase::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
