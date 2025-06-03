/*
 * file: blogsy/resources/js/lib/router.js
 * description: This file is used to route the application to the correct view based on the current path
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */

class Router {
    constructor() {
        this.routes = [];
        this.default = null;
    }

    register(path, view) {
        this.routes.push({ path, view });
    }

    route(path) {
        const segments = path.split("/").filter(Boolean);

        const route = this.routes.find((route) => route.path === path);
        if (route) {
            route.view(app);
        } else {
            this.default(app);
        }
    }

    fallback(view) {
        this.default = view;
    }
}

export default Router;
