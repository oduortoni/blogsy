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

    let post = result.data;
    let userLiked = false;

    // Check if user liked this post
    if (api.isAuthenticated()) {
        const likeCheck = await api.checkLike(post.id);
        if (likeCheck.success && likeCheck.data) {
            userLiked = likeCheck.data.liked;
        }
    }

    const handleLikeToggle = async () => {
        if (!api.isAuthenticated()) {
            window.router.navigate('/login');
            return;
        }

        if (userLiked) {
            const result = await api.unlikePost(post.id);
            if (result.success) {
                post.likes = Math.max(0, (post.likes || 0) - 1);
                userLiked = false;
                render();
            }
        } else {
            const result = await api.likePost(post.id);
            if (result.success) {
                post.likes = (post.likes || 0) + 1;
                userLiked = true;
                render();
            }
        }
    };

    const render = () => {
        app.innerHTML = renderPost(post, userLiked, handleLikeToggle);
    };

    render();
};

const renderPost = (post: Post, userLiked: boolean, onLikeToggle: () => void): string => {
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
    
    const html = `
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
                <strong>Likes:</strong> ${post.likes || 0}
                <button id="like-btn" class="feature-btn" style="margin-left: 1rem;" title="${userLiked ? 'Unlike' : 'Like'}">${userLiked ? '♥' : '♡'}</button> |
                <strong>Published:</strong> ${publishedDate}
            </p>
            <div class="content">
                ${renderContent()}
            </div>
        </article>
    `;

    setTimeout(() => {
        const likeBtn = document.getElementById('like-btn');
        if (likeBtn) {
            likeBtn.onclick = onLikeToggle;
        }
    }, 0);

    return html;
};

export default PostView;
