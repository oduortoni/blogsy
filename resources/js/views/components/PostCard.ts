/*
 * file: blogsy/resources/js/views/components/PostCard.ts
 * description: Reusable post card component
 * author: toni
 * date: 2026-01-14
 */

import type { Post } from '../../lib/api';

export const PostCard = (post: Post, onClick?: (id: number) => void): string => {
    const id = `post-${post.id}`;
    
    setTimeout(() => {
        const card = document.getElementById(id);
        if (card && onClick) {
            card.onclick = () => onClick(post.id);
        }
    }, 0);

    const getPreview = () => {
        if (Array.isArray(post.content)) {
            const textBlock = post.content.find(b => b.type === 'text' || b.type === 'heading');
            return textBlock?.content?.substring(0, 100) || 'No content';
        }
        return String(post.content).substring(0, 100);
    };

    return `
        <div id="${id}" class="post">
            ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" class="post-featured" />` : ''}
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${getPreview()}...</p>
                <div class="post-meta">
                    <span>${post.views || 0} views</span>
                    <span>${post.likes || 0} likes</span>
                </div>
            </div>
        </div>
    `;
};
