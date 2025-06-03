/*
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 * file: blogsy/resources/js/views/posts.js
 * description: This file is used to render the list of posts.
 */
const Posts = async (app, params) => {
    app.innerHTML = "<p>Loading posts...</p>";
    try {
        const result = await axios
            .get("/api/posts")
            .then((response) => response.data);

        app.innerHTML = `
            <h2>Posts <button onclick="window.router.navigate('/posts/create')" class="create-btn" title="Create New Post">+</button></h2>
            <div class="posts">
                ${
                    result.posts.length > 0
                        ? result.posts.map((post) => PostCard(post)).join("")
                        : "<p>No posts found.</p>"
                }
            </div>
        `;
    } catch (error) {
        app.innerHTML = "<p>Failed to load posts.</p>";
        console.error(error);
    }
};

const PostCard = (post) => {
    return `
        <div class="post" onclick="window.router.navigate('/posts/post/${post.id}')">
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 80)}...</p>
            </div>
        </div>
    `;
};

export default Posts;
