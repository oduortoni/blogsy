/*
* file: blogsy/resources/js/app.js
* description: Bootstraps the SPA and sets up client-side routing using History API.
* author: toni
* date: 2025-06-02
* version: 1.1.0
* license: MIT
* copyright: 2025 toni
* contact: oduortoni@gmail.com
*/

import "./bootstrap"; // development only for hot reloading

import { Dialog, Home, About, Posts, Post, PostUpdate, PostDelete } from './views/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Expose globally for convenience
    window.app = app;
    window.views = { Dialog, Home, About, Posts, Post, PostUpdate, PostDelete };

    /**
     * Routes the application to the correct view based on the current path
     */
    function router(path) {
        const segments = path.split('/').filter(Boolean); // e.g. /posts/1 => ['posts', '1']

        // Home
        if (segments.length === 0 || segments[0] === 'home') {
            Home(app);
        }

        // About
        else if (segments.length === 0 || segments[0] === 'about') {
            About(app);
        }

        // List all posts
        else if (segments[0] === 'posts' && segments.length === 1) {
            Posts(app);
        }

        // Single post: /posts/1
        else if (segments[0] === 'posts' && segments.length === 2) {
            const id = segments[1];
            Post(id);
        }

        // Edit post: /posts/edit/1
        else if (segments[0] === 'posts' && segments[1] === 'edit') {
            const id = segments[2];
            PostUpdate(id);
        }

        // Fallback
        else {
            app.innerHTML = `<section class="not-found"><h2>404 - Page Not Found</h2></section>`;
        }
    }

    /**
     * Pushes a new route and calls the router
     */
    window.router = (path) => {
        history.pushState({}, '', path);
        router(path);
    };

    /**
     * Handles back/forward navigation
     */
    window.onpopstate = () => {
        router(location.pathname);
    };

    // Navbar links
    document.getElementById('nav-home').onclick = () => router('/home');
    document.getElementById('nav-posts').onclick = () => router('/posts');
    document.getElementById('nav-about').onclick = () => router('/about');

    // Initial route on page load
    router(location.pathname);
});
