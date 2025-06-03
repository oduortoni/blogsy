/*
 * file: blogsy/resources/js/app.js
 * description: Bootstraps the SPA and sets up client-side routing.
 * author: toni
 * date: 2025-06-02
 * version: 1.1.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */

import "./lib/bootstrap"; // development only for hot reloading
import Router from "./lib/router.js";
import { Dialog } from "./views/components/index.js";
import {
    Home,
    About,
    Posts,
    Post,
    PostUpdate,
    PostDelete,
    PostCreate,
} from "./views/pages/index.js";

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
    router.register("/posts/post/:id", Post);
    router.register("/posts/create", PostCreate);
    router.register("/posts/edit/:id", PostUpdate);
    router.register("/posts/delete/:id", PostDelete);
    router.fallback(Home);

    window.router = router;

    /**
     * Handles back/forward navigation
     */
    window.onpopstate = () => {
        router.navigate(location.pathname);
    };

    // Navbar links
    document.getElementById("nav-logo").onclick = () => router.navigate("/");
    document.getElementById("nav-home").onclick = () => router.navigate("/");
    document.getElementById("nav-posts").onclick = () =>
        router.navigate("/posts");
    document.getElementById("nav-about").onclick = () =>
        router.navigate("/about");

    // Initial route on page load
    router.navigate(location.pathname);
});
