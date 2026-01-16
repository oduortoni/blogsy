/*
 * file: blogsy/resources/js/lib/api.ts
 * description: Centralized API service for v1 endpoints
 * author: toni
 * date: 2026-01-14
 */

import axios, { AxiosError } from 'axios';

const API_BASE = '/api/v1';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    content: ContentBlock[];
    featured_image?: string | null;
    is_published: boolean;
    views: number;
    likes: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    user_id?: number;
}

interface ContentBlock {
    type: 'heading' | 'text' | 'image';
    content?: string;
    image_id?: number;
    image_url?: string;
}

interface PostInput {
    title: string;
    slug: string;
    content: ContentBlock[];
    featured_image?: string;
    is_published: boolean;
}

class ApiService {
    private token: string | null = localStorage.getItem('auth_token');
    private user: any = null;

    constructor() {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
            } catch {
                this.user = null;
            }
        }
    }

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            this.user = null;
        }
    }

    setUser(user: any) {
        this.user = user;
        if (user) {
            localStorage.setItem('auth_user', JSON.stringify(user));
        }
    }

    getUser(): any {
        return this.user;
    }

    getToken(): string | null {
        return this.token;
    }

    private async request<T>(method: string, endpoint: string, data: any = null): Promise<ApiResponse<T>> {
        try {
            const config: any = {
                method,
                url: `${API_BASE}${endpoint}`,
                headers: {},
            };
            
            if (this.token) {
                config.headers['Authorization'] = `Bearer ${this.token}`;
            }
            
            if (data) {
                if (data instanceof FormData) {
                    config.data = data;
                } else {
                    config.headers['Content-Type'] = 'application/json';
                    config.data = data;
                }
            }
            
            const response = await axios(config);
            return { success: true, ...response.data };
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
            const errorData = axiosError.response?.data || { message: 'An error occurred' };
            
            if (axiosError.response?.status === 401) {
                this.setToken(null);
            }
            
            return {
                success: false,
                message: errorData.message || 'An error occurred',
                errors: errorData.errors
            };
        }
    }

    async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
        const result = await this.request<{ token: string; user: any }>('POST', '/login', { email, password });
        if (result.success && result.data?.token) {
            this.setToken(result.data.token);
            this.setUser(result.data.user);
        }
        return result;
    }

    async register(name: string, email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
        const result = await this.request<{ token: string; user: any }>('POST', '/register', { name, email, password });
        if (result.success && result.data?.token) {
            this.setToken(result.data.token);
            this.setUser(result.data.user);
        }
        return result;
    }

    async logout(): Promise<ApiResponse<null>> {
        const result = await this.request<null>('POST', '/logout');
        this.setToken(null);
        return result;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    getPosts(): Promise<ApiResponse<Post[]>> {
        return this.request<Post[]>('GET', '/posts');
    }

    getPost(id: number): Promise<ApiResponse<Post>> {
        return this.request<Post>('GET', `/posts/${id}`);
    }

    createPost(data: PostInput): Promise<ApiResponse<Post>> {
        return this.request<Post>('POST', '/posts', data);
    }

    updatePost(id: number, data: Partial<PostInput>): Promise<ApiResponse<Post>> {
        return this.request<Post>('PUT', `/posts/${id}`, data);
    }

    deletePost(id: number): Promise<ApiResponse<null>> {
        return this.request<null>('DELETE', `/posts/${id}`);
    }

    uploadImage(file: File): Promise<ApiResponse<{ id: number; url: string; filename: string }>> {
        const formData = new FormData();
        formData.append('image', file);
        return this.request('POST', '/images', formData);
    }

    deleteImage(id: number): Promise<ApiResponse<null>> {
        return this.request<null>('DELETE', `/images/${id}`);
    }

    getFeaturedPosts(): Promise<ApiResponse<Post[]>> {
        return this.request<Post[]>('GET', '/posts/featured');
    }

    featurePost(id: number): Promise<ApiResponse<null>> {
        return this.request<null>('POST', `/posts/${id}/feature`);
    }

    unfeaturePost(id: number): Promise<ApiResponse<null>> {
        return this.request<null>('DELETE', `/posts/${id}/feature`);
    }
}

export default new ApiService();
export type { Post, PostInput, ApiResponse, ContentBlock };
