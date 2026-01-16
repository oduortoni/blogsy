/*
 * file: blogsy/resources/js/app.ts
 * description: Bootstraps the SPA and sets up client-side routing
 * author: toni
 * date: 2026-01-14
 */

import "./lib/bootstrap";
import Router from "./lib/router.js";
import { Dialog } from "./views/components/index";
import {
    Home,
    About,
    Posts,
    Post,
    PostUpdate,
    PostDelete,
    PostCreate,
} from "./views/pages/index";
import Login from "./views/pages/auth/login";
import Register from "./views/pages/auth/register";
import api from "./lib/api";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app") as HTMLElement;

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
    router.register("/login", Login);
    router.register("/register", Register);
    router.register("/posts", Posts);
    router.register("/posts/post/:id", Post);
    router.register("/posts/create", PostCreate);
    router.register("/posts/edit/:id", PostUpdate);
    router.register("/posts/delete/:id", PostDelete);
    router.fallback(Home);

    window.router = router;

    window.onpopstate = () => {
        router.navigate(location.pathname);
    };

    // Navbar links
    const navLogo = document.getElementById("nav-logo");
    const navHome = document.getElementById("nav-home");
    const navPosts = document.getElementById("nav-posts");
    const navAbout = document.getElementById("nav-about");
    const navLogin = document.getElementById("nav-login");
    const navLogout = document.getElementById("nav-logout");

    const updateAuthUI = () => {
        const isAuth = api.isAuthenticated();
        if (navLogin) navLogin.style.display = isAuth ? 'none' : 'block';
        if (navLogout) navLogout.style.display = isAuth ? 'block' : 'none';
    };

    if (navLogo) navLogo.onclick = () => router.navigate("/");
    if (navHome) navHome.onclick = () => router.navigate("/");
    if (navPosts) navPosts.onclick = () => router.navigate("/posts");
    if (navAbout) navAbout.onclick = () => router.navigate("/about");
    if (navLogin) navLogin.onclick = () => router.navigate("/login");
    if (navLogout) navLogout.onclick = async () => {
        await api.logout();
        updateAuthUI();
        router.navigate("/");
    };

    updateAuthUI();

    const originalNavigate = router.navigate.bind(router);
    router.navigate = (path: string) => {
        const protectedRoutes = ['/posts/create', '/posts/edit', '/posts/delete'];
        const isProtected = protectedRoutes.some(route => path.startsWith(route));
        
        if (isProtected && !api.isAuthenticated()) {
            originalNavigate('/login');
            return;
        }
        
        originalNavigate(path);
        updateAuthUI();
    };

    router.navigate(location.pathname);
});
