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

    return `
        <div id="${id}" class="post">
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 100)}...</p>
                <div class="post-meta">
                    <span>${post.views || 0} views</span>
                    <span>${post.likes || 0} likes</span>
                </div>
            </div>
        </div>
    `;
};
