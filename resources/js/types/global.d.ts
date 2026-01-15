/*
 * file: blogsy/resources/js/types/global.d.ts
 * description: Global type declarations
 * author: toni
 * date: 2026-01-14
 */

interface Router {
    navigate(path: string): void;
    register(path: string, view: any): void;
    fallback(view: any): void;
}

interface Window {
    router: Router;
    app: HTMLElement;
    views: any;
}

declare const axios: any;
