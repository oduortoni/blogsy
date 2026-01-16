/*
 * file: blogsy/resources/js/views/components/PostCard.ts
 * description: Reusable post card component
 * author: toni
 * date: 2026-01-14
 */

import type { Post } from '../../lib/api';
import api from '../../lib/api';

export const PostCard = (post: Post, onClick?: (id: number) => void, onFeatureToggle?: (id: number, isFeatured: boolean) => void): string => {
    const id = `post-${post.id}`;
    const featureBtnId = `feature-btn-${post.id}`;
    
    setTimeout(() => {
        const card = document.getElementById(id);
        if (card && onClick) {
            card.onclick = (e) => {
                if ((e.target as HTMLElement).closest('.feature-btn')) return;
                onClick(post.id);
            };
        }
        
        const featureBtn = document.getElementById(featureBtnId);
        if (featureBtn && onFeatureToggle) {
            featureBtn.onclick = (e) => {
                e.stopPropagation();
                onFeatureToggle(post.id, !!(post as any).is_featured);
            };
        }
    }, 0);

    const getPreview = () => {
        if (Array.isArray(post.content)) {
            const textBlock = post.content.find(b => b.type === 'text' || b.type === 'heading');
            return textBlock?.content?.substring(0, 100) || 'No content';
        }
        return String(post.content).substring(0, 100);
    };

    const user = api.getUser();
    const isOwner = user && post.user_id === user.id;

    return `
        <div id="${id}" class="post">
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="post-featured" />` : '<div class="post-featured"></div>'}
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${getPreview()}...</p>
                <div class="post-meta">
                    <span>${post.views || 0} views</span>
                    <span>${post.likes || 0} likes</span>
                    ${isOwner ? `<button id="${featureBtnId}" class="feature-btn" title="${(post as any).is_featured ? 'Unfeature' : 'Feature'}">${(post as any).is_featured ? '★' : '☆'}</button>` : ''}
                </div>
            </div>
        </div>
    `;
};
