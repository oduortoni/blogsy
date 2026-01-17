/*
 * file: blogsy/resources/js/views/pages/main/home.js
 * description: Home view with dark theme editorial layout
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
        <div class="page">
            <section class="hero">
                <div class="kicker">A place for ideas</div>
                <h1>Essays, experiments,<br>and carefully assembled thoughts</h1>
                <p>
                    This is a journal for things worth slowing down for—technology,
                    culture, systems, mistakes, and the spaces between them.
                </p>
            </section>

            <section class="featured">
                ${featured.length > 0 ? `
                    <div class="featured-main">
                        <div class="featured-card" id="featured-card">
                            <div class="meta" id="featured-meta">Featured</div>
                            <h2 id="featured-title">${featured[0].title}</h2>
                            <p id="featured-desc">${getPostExcerpt(featured[0])}</p>
                        </div>
                        <div class="featured-visual" id="featured-visual" 
                            style="background-image: url('${featured[0].featured_image || ''}'); background-size: cover; background-position: center;"
                            data-id="${featured[0].id}"></div>

                    <div class="featured-selector">
                        <button class="arrow left" id="arrow-left">‹</button>

                        <div class="selector-track" id="selector-track">
                            ${featured.map((post, index) => `
                                <article class="selector-card ${index === 0 ? 'active' : ''}"
                                    data-meta="Essay"
                                    data-title="${post.title}"
                                    data-desc="${getPostExcerpt(post)}"
                                    data-id="${post.id}"
                                    data-image="${post.featured_image || ''}">
                                    <div class="meta">Essay</div>
                                    <h4>${post.title}</h4>
                                </article>
                            `).join('')}
                        </div>

                        <button class="arrow right" id="arrow-right">›</button>
                    </div>
                ` : `
                    <div class="no-featured">
                        <p>No featured posts yet. Check back soon!</p>
                    </div>
                `}
            </section>
        </div>
    `;

    // Setup card selection
    setupCardSelection();
};

function getPostExcerpt(post) {
    if (Array.isArray(post.content)) {
        const textBlock = post.content.find(b => b.type === 'text' || b.type === 'heading');
        if (textBlock && textBlock.content) {
            return textBlock.content.substring(0, 150) + (textBlock.content.length > 150 ? '...' : '');
        }
    }
    const content = String(post.content || '');
    return content.substring(0, 150) + (content.length > 150 ? '...' : '');
}

function setupCardSelection() {
    const track = document.getElementById('selector-track');
    const cards = document.querySelectorAll('.selector-card');
    const meta = document.getElementById('featured-meta');
    const title = document.getElementById('featured-title');
    const desc = document.getElementById('featured-desc');
    const visual = document.getElementById('featured-visual');

    if (!track || !cards.length || !meta || !title || !desc || !visual) return;

    let currentIndex = 0;

    // Find initial active card
    cards.forEach((card, index) => {
        if (card.classList.contains('active')) {
            currentIndex = index;
        }
    });

    function selectCard(index) {
        cards.forEach(c => c.classList.remove('active'));
        const card = cards[index];
        card.classList.add('active');

        meta.textContent = card.dataset.meta;
        title.textContent = card.dataset.title;
        desc.textContent = card.dataset.desc;
        visual.style.backgroundImage = card.dataset.image ? `url('${card.dataset.image}')` : 'none';
        visual.dataset.id = card.dataset.id;

        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        currentIndex = index;
    }

    // Arrow navigation
    document.getElementById('arrow-left')?.addEventListener('click', () => {
        const next = (currentIndex - 1 + cards.length) % cards.length;
        selectCard(next);
    });

    document.getElementById('arrow-right')?.addEventListener('click', () => {
        const next = (currentIndex + 1) % cards.length;
        selectCard(next);
    });

    // Card click
    cards.forEach((card, index) => {
        card.addEventListener('click', () => selectCard(index));
    });

    // Visual click navigates to post
    visual.addEventListener('click', () => {
        if (visual.dataset.id) {
            window.router.navigate(`/posts/post/${visual.dataset.id}`);
        }
    });

    // Featured card click navigates to post
    const featuredCard = document.getElementById('featured-card');
    featuredCard?.addEventListener('click', () => {
        if (visual.dataset.id) {
            window.router.navigate(`/posts/post/${visual.dataset.id}`);
        }
    });
}

export default Home;
