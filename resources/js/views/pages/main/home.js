/*
 * file: blogsy/resources/js/views/index.js
 * description: This file is used to render the home view.
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */
const Home = (app) => {
    app.innerHTML = `
        <section class="hero">
            <h1>Welcome to Blogsy</h1>
            <p>A modular blog powered by Laravel & clean architecture.</p>
            <button class="btn" id="view-posts">View Posts</button>
        </section>
    `;

    // Attach event listener to button after rendering
    document.getElementById("view-posts").onclick = () => window.router.navigate("/posts");
};

export default Home;
