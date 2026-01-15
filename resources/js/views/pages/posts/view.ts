/*
 * file: blogsy/resources/js/views/pages/posts/view.ts
 * description: Single post view page
 * author: toni
 * date: 2026-01-14
 */

import api from '../../../lib/api';
import { Loading, ErrorMessage } from '../../components/ui';
import type { Post } from '../../../lib/api';

const PostView = async (app: HTMLElement, params: { id: string }): Promise<void> => {
    app.innerHTML = Loading('Loading post...');
    
    const result = await api.getPost(parseInt(params.id));

    if (!result.success || !result.data) {
        app.innerHTML = ErrorMessage(result.message || 'Post not found');
        return;
    }

    app.innerHTML = renderPost(result.data);
};

const renderPost = (post: Post): string => {
    return `
        <article class="post-detail">
            <h2>${post.title}</h2>
            <p class="meta">
                <strong>Views:</strong> ${post.views || 0} |
                <strong>Likes:</strong> ${post.likes || 0} |
                <strong>Published:</strong> ${new Date(post.created_at).toLocaleDateString()}
            </p>
            <div class="content">
                ${post.content}
            </div>
            <div class="post-actions">
                <button class="btn btn-back" onclick="window.router.navigate('/posts')" title="Back to Posts">←</button>
                <button class="btn btn-edit" onclick="window.router.navigate('/posts/edit/${post.id}')" title="Edit Post">✎</button>
                <button class="btn btn-delete" onclick="window.router.navigate('/posts/delete/${post.id}')" title="Delete Post">✕</button>
            </div>
        </article>
    `;
};

export default PostView;
