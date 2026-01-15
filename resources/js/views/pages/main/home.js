/*
 * file: blogsy/resources/js/views/index.js
 * description: This file is used to render the home view with editorial featured layout.
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */
import api from '../../../lib/api';

const Home = async (app) => {
    const result = await api.getFeaturedPosts();
    const featured = result.success ? result.data : [];

    app.innerHTML = `
        <div class="home-container">
            ${featured.length > 0 ? `
                <div class="home-featured">
                    <!-- Left Side: Title + Hero -->
                    <div class="featured-left">
                        <h1>Best of the week</h1>
                        <div class="featured-hero" id="featured-hero" data-id="${featured[0].id}">
                            <img src="${featured[0].featured_image || 'https://picsum.photos/900/600'}" alt="${featured[0].title}" id="hero-img">
                            <div class="hero-content">
                                <span class="tag" id="hero-tag">Featured</span>
                                <h3 id="hero-title">${featured[0].title}</h3>
                                <p id="hero-excerpt">${getPostExcerpt(featured[0])}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side: Picks (scrollable) -->
                    <div class="featured-right">
                        <h2>Top picks</h2>
                        <div class="featured-picks" id="featured-picks">
                            ${featured.map(post => `
                                <article class="pick-card" 
                                    data-img="${post.featured_image || 'https://picsum.photos/200/200'}" 
                                    data-tag="Featured" 
                                    data-title="${post.title}" 
                                    data-excerpt="${getPostExcerpt(post)}"
                                    data-id="${post.id}">
                                    <img src="${post.featured_image || 'https://picsum.photos/200/200'}" alt="${post.title}">
                                    <div>
                                        <span>Featured</span>
                                        <h4>${post.title}</h4>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="no-featured">
                    <p>No featured posts yet. Check back soon!</p>
                </div>
            `}
        </div>
    `;
    
    // Hero click navigates to post
    const heroEl = document.getElementById('featured-hero');
    if (heroEl) {
        heroEl.onclick = () => window.router.navigate(`/posts/post/${heroEl.dataset.id}`);
    }
    
    // Pick card click-to-swap functionality
    document.querySelectorAll('.pick-card').forEach(pick => {
        pick.addEventListener('click', () => {
            const heroImg = document.getElementById('hero-img');
            const heroTag = document.getElementById('hero-tag');
            const heroTitle = document.getElementById('hero-title');
            const heroExcerpt = document.getElementById('hero-excerpt');
            const featuredHero = document.getElementById('featured-hero');
            
            if (heroImg && heroTag && heroTitle && heroExcerpt && featuredHero) {
                heroImg.src = pick.dataset.img;
                heroImg.alt = pick.dataset.title;
                heroTag.textContent = pick.dataset.tag;
                heroTitle.textContent = pick.dataset.title;
                heroExcerpt.textContent = pick.dataset.excerpt;
                featuredHero.dataset.id = pick.dataset.id;
                
                // Update hero click handler
                featuredHero.onclick = () => window.router.navigate(`/posts/post/${pick.dataset.id}`);
            }
        });
    });
};

function getPostExcerpt(post) {
    if (Array.isArray(post.content)) {
        const textBlock = post.content.find(b => b.type === 'text' || b.type === 'heading');
        if (textBlock && textBlock.content) {
            return textBlock.content.substring(0, 120) + (textBlock.content.length > 120 ? '...' : '');
        }
    }
    const content = String(post.content || '');
    return content.substring(0, 120) + (content.length > 120 ? '...' : '');
}

export default Home;
