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
    const publishedDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString()
        : 'Not published';
    
    const user = api.getUser();
    const isOwner = user && post.user_id === user.id;
    
    const renderContent = () => {
        if (Array.isArray(post.content)) {
            return post.content.map(block => {
                switch (block.type) {
                    case 'heading':
                        return `<h3>${block.content}</h3>`;
                    case 'text':
                        return `<p>${block.content}</p>`;
                    case 'image':
                        return `<img src="${block.image_url}" alt="Post image" />`;
                    default:
                        return '';
                }
            }).join('');
        }
        return `<p>${post.content}</p>`;
    };
    
    return `
        <h2>${post.title}</h2>
        <article class="post-detail">
            <div class="post-actions" style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button class="btn btn-back" onclick="window.router.navigate('/posts')" title="Back">←</button>
                ${isOwner ? `
                    <button class="btn btn-edit" onclick="window.router.navigate('/posts/edit/${post.id}')" title="Edit">✎</button>
                    <button class="btn btn-delete" onclick="window.router.navigate('/posts/delete/${post.id}')" title="Delete">🗑</button>
                ` : ''}
            </div>
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="post-featured-large" />` : ''}
            <h2>${post.title}</h2>
            <p class="meta">
                <strong>Views:</strong> ${post.views || 0} |
                <strong>Likes:</strong> ${post.likes || 0} |
                <strong>Published:</strong> ${publishedDate}
            </p>
            <div class="content">
                ${renderContent()}
            </div>
        </article>
    `;
};

export default PostView;
