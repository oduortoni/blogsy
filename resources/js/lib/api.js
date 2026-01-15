/*
 * file: blogsy/resources/js/lib/api.js
 * description: Centralized API service for v1 endpoints
 * author: toni
 * date: 2026-01-14
 */

const API_BASE = '/api/v1';

class ApiService {
    async request(method, endpoint, data = null) {
        try {
            const config = {
                method,
                url: `${API_BASE}${endpoint}`,
                headers: { 'Content-Type': 'application/json' }
            };
            
            if (data) config.data = data;
            
            const response = await axios(config);
            return { success: true, ...response.data };
        } catch (error) {
            const errorData = error.response?.data || {};
            return {
                success: false,
                message: errorData.message || 'An error occurred',
                errors: errorData.errors || null
            };
        }
    }

    // Posts
    getPosts() {
        return this.request('GET', '/posts');
    }

    getPost(id) {
        return this.request('GET', `/posts/${id}`);
    }

    createPost(data) {
        return this.request('POST', '/posts', data);
    }

    updatePost(id, data) {
        return this.request('PUT', `/posts/${id}`, data);
    }

    deletePost(id) {
        return this.request('DELETE', `/posts/${id}`);
    }
}

export default new ApiService();
