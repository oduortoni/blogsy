/*
* file: blogsy/resources/js/app.js
* description: This file is used to bootstrap the application.
* author: toni
* date: 2025-06-02
* version: 1.0.0
* license: MIT
* copyright: 2025 toni
* contact: oduortoni@gmail.com
*/
import "./bootstrap";
import { Home, Posts, Post } from './views/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Global references
    window.app = app;
    window.views = { Home, Posts, Post };

    // Router
    function router(path) {
        if (path === '/' || path === '/home') {
            Home(app);
        } else if (path === '/posts') {
            Posts(app);
        } else if (path.startsWith('/posts/')) {
            const id = path.split('/')[2];
            Post(id);
        } else {
            app.innerHTML = '<p>Page not found.</p>';
        }
    }

    window.router = (path) => {
        history.pushState({}, '', path);
        router(path);
    };

    // Enable popstate (back/forward navigation)
    window.onpopstate = () => {
        router(location.pathname);
    };

    // Navbar links
    document.getElementById('nav-home').onclick = () => router('/home');
    document.getElementById('nav-posts').onclick = () => router('/posts');

    // Initial load
    router(location.pathname);
});
