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
    
    // Check like status for each post if authenticated
    const postsWithMeta = await Promise.all(posts.map(async (p) => {
        let userLiked = false;
        if (api.isAuthenticated()) {
            const likeCheck = await api.checkLike(p.id);
            if (likeCheck.success && likeCheck.data) {
                userLiked = likeCheck.data.liked;
            }
        }
        return { ...p, is_featured: featuredIds.includes(p.id), user_liked: userLiked };
    }));
    
    const postsWithFeatured = postsWithMeta;
    
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

    const handleLike = async (id: number) => {
        if (!api.isAuthenticated()) {
            window.router.navigate('/login');
            return;
        }
        
        const idx = postsWithFeatured.findIndex(p => p.id === id);
        if (idx === -1) return;
        
        const post = postsWithFeatured[idx];
        const userLiked = (post as any).user_liked || false;
        
        if (userLiked) {
            const result = await api.unlikePost(id);
            if (result.success) {
                postsWithFeatured[idx].likes = Math.max(0, (postsWithFeatured[idx].likes || 0) - 1);
                (postsWithFeatured[idx] as any).user_liked = false;
                render();
            }
        } else {
            const result = await api.likePost(id);
            if (result.success) {
                postsWithFeatured[idx].likes = (postsWithFeatured[idx].likes || 0) + 1;
                (postsWithFeatured[idx] as any).user_liked = true;
                render();
            }
        }
    };

    const render = () => {
        app.innerHTML = `
            <h2>POSTS<button onclick="window.router.navigate('/posts/create')" class="create-btn" title="Create New Post">+</button></h2>
            <div class="posts">
                ${
                    postsWithFeatured.length > 0
                        ? postsWithFeatured.map(post => PostCard(post, (id) => window.router.navigate(`/posts/post/${id}`), handleFeatureToggle, handleLike)).join('')
                        : EmptyState('No posts found.')
                }
            </div>
        `;
    };
    
    render();
};

export default Posts;
