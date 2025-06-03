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
import Router from "./lib/router.js";
import {
    Home,
    About,
    Posts,
    Post,
    PostUpdate,
    PostDelete,
    PostCreate,
} from "./views/pages/index.js";
import { Dialog } from "./views/components/index.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Expose globally for convenience
    window.app = app;
    window.views = {
        Dialog,
        Home,
        About,
        Posts,
        Post,
        PostUpdate,
        PostDelete,
        PostCreate,
    };

    const router = new Router();

    router.register("/", Home);
    router.register("/about", About);
    router.register("/posts", Posts);
    router.register("/posts/post", Post);
    router.register("/posts/create", PostCreate);
    router.register("/posts/edit", PostUpdate);
    router.register("/posts/delete", PostDelete);
    router.fallback(Home);

    /**
     * Pushes a new route and calls the router
     */
    const navigate = (path) => {
        history.pushState({}, "", path);
        router.route(path);
    };

    /**
     * Handles back/forward navigation
     */
    window.onpopstate = () => {
        navigate(location.pathname);
    };

    // Navbar links
    document.getElementById("nav-home").onclick = () =>
        navigate("/");
    document.getElementById("nav-posts").onclick = () =>
        navigate("/posts");
    document.getElementById("nav-about").onclick = () =>
        navigate("/about");

    // Initial route on page load
    navigate(location.pathname);
});
