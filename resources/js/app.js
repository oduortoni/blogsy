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

import { Home } from './views/home.js';
import { Posts } from './views/posts.js';
import { Post } from './views/post.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const navHome = document.getElementById('nav-home');
    const navPosts = document.getElementById('nav-posts');

    window.app = app;
    window.views = {
        Home,
        Posts,
        Post
    };

    navHome.onclick = () => {
        window.views.Home(window.app);
    };
    navPosts.onclick = () => {
        window.views.Posts(window.app);
    };

    window.views.Home(window.app); // Load home by default
});
