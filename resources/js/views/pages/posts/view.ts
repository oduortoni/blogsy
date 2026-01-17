/*
 * file: blogsy/resources/js/views/pages/posts/view.ts
 * description: Single post view page with editorial layout
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
        setupFadeIn();
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
                        return `<div class="article-inline-image" style="background-image: url('${block.image_url}')"></div>`;
                    default:
                        return '';
                }
            }).join('');
        }
        return `<p>${post.content}</p>`;
    };
    
    const html = `
        <div class="page">
            <nav class="article-nav">
                <span style="cursor: pointer;">← Back to posts</span>
                <span>${new Date().getFullYear()}</span>
            </nav>

            <div class="article-divider"></div>

            <section class="article-hero fade-in">
                <div class="article-hero-left">
                <h1 class="article-title">${post.title}</h1>
                <div class="article-meta">${publishedDate} · ${post.views || 0} views</div>
                    <div class="article-author">
                        <div class="article-author-avatar"></div>
                        <div>
                            <strong>Author</strong><br>
                            Blogsy Writer
                        </div>
                    </div>
                </div>
                <div class="article-hero-right">
                    <div class="article-hero-image" 
                        ${post.featured_image ? `style="background-image: url('${post.featured_image}')"` : ''}
                        data-id="${post.id}">
                    </div>
                    <div class="article-actions">
                        <button id="article-like-btn" 
                                class="article-like-btn ${userLiked ? 'liked' : ''}"
                                title="${userLiked ? 'Unlike' : 'Like'}">
                            ${userLiked ? '♥' : '♡'} ${post.likes || 0}
                        </button>
                        ${isOwner ? `
                            <button class="btn-icon" onclick="window.router.navigate('/posts/edit/${post.id}')" title="Edit">✎</button>
                            <button class="btn-icon" onclick="window.router.navigate('/posts/delete/${post.id}')" title="Delete">🗑</button>
                        ` : ''}
                    </div>
                </div>
            </section>

            <section class="article-content fade-in">
                ${renderContent()}
            </section>
        </div>
    `;

    return html;
};

function setupFadeIn() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el as Element));

    // Setup back navigation
    const backNav = document.querySelector('.article-nav span:first-child');
    backNav?.addEventListener('click', () => window.router.navigate('/posts'));

    // Setup like button
    const likeBtn = document.getElementById('article-like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            const btn = likeBtn as HTMLButtonElement;
            if (btn.classList.contains('liked')) {
                const currentLikes = parseInt(btn.textContent?.match(/\d+/)?.[0] || '0');
                btn.innerHTML = `♡ ${currentLikes - 1}`;
                btn.classList.remove('liked');
            } else {
                const currentLikes = parseInt(btn.textContent?.match(/\d+/)?.[0] || '0');
                btn.innerHTML = `♥ ${currentLikes + 1}`;
                btn.classList.add('liked');
            }
        });
    }
}


export default PostView;
