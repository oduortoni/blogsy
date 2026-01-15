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
    private async request<T>(method: string, endpoint: string, data: any = null): Promise<ApiResponse<T>> {
        try {
            const config: any = {
                method,
                url: `${API_BASE}${endpoint}`,
            };
            
            if (data) {
                if (data instanceof FormData) {
                    config.data = data;
                } else {
                    config.headers = { 'Content-Type': 'application/json' };
                    config.data = data;
                }
            }
            
            const response = await axios(config);
            return { success: true, ...response.data };
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
            const errorData = axiosError.response?.data || { message: 'An error occurred' };
            
            return {
                success: false,
                message: errorData.message || 'An error occurred',
                errors: errorData.errors
            };
        }
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
}

export default new ApiService();
export type { Post, PostInput, ApiResponse, ContentBlock };
