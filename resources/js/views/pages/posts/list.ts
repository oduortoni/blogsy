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

    app.innerHTML = `
        <h2>Posts <button onclick="window.router.navigate('/posts/create')" class="create-btn" title="Create New Post">+</button></h2>
        <div class="posts">
            ${
                posts.length > 0
                    ? posts.map(post => PostCard(post, (id) => window.router.navigate(`/posts/post/${id}`))).join('')
                    : EmptyState('No posts found.')
            }
        </div>
    `;
};

export default Posts;
