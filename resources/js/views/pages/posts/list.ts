/*
 * author: toni
 * date: 2026-01-14
 * file: blogsy/resources/js/views/pages/posts/list.ts
 * description: Posts list page
 */

import api from '../../../lib/api';
import { PostCard } from '../../components/PostCard';
import { Loading, ErrorMessage, EmptyState } from '../../components/ui';

const Posts = async (app: HTMLElement): Promise<void> => {
    app.innerHTML = Loading('Loading posts...');
    
    const result = await api.getPosts();

    if (!result.success) {
        app.innerHTML = ErrorMessage(result.message || 'Failed to load posts');
        return;
    }

    const posts = result.data || [];
    const featuredResult = await api.getFeaturedPosts();
    const featuredIds = featuredResult.success && featuredResult.data ? featuredResult.data.map((p: any) => p.id) : [];
    
    const postsWithFeatured = posts.map(p => ({ ...p, is_featured: featuredIds.includes(p.id) }));
    
    const handleFeatureToggle = async (id: number, isFeatured: boolean) => {
        if (isFeatured) {
            await api.unfeaturePost(id);
        } else {
            await api.featurePost(id);
        }
        const idx = postsWithFeatured.findIndex(p => p.id === id);
        if (idx !== -1) {
            postsWithFeatured[idx].is_featured = !isFeatured;
        }
        render();
    };

    const render = () => {
        app.innerHTML = `
            <h2>POSTS<button onclick="window.router.navigate('/posts/create')" class="create-btn" title="Create New Post">+</button></h2>
            <div class="posts">
                ${
                    postsWithFeatured.length > 0
                        ? postsWithFeatured.map(post => PostCard(post, (id) => window.router.navigate(`/posts/post/${id}`), handleFeatureToggle)).join('')
                        : EmptyState('No posts found.')
                }
            </div>
        `;
    };
    
    render();
};

export default Posts;
