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
export async function Posts() {
    window.app.innerHTML = '<p>Loading posts...</p>';
    try {
        const result = await axios.get('/api/posts').then(response => response.data);

        window.app.innerHTML = `
            <h2>All Posts</h2>
            <div class="posts">
                ${
                    result.posts.length > 0 ?
                    result.posts.map(post => PostCard(post)).join('') :
                    '<p>No posts found.</p>'
                }
            </div>
        `;
    } catch (error) {
        window.app.innerHTML = '<p>Failed to load posts.</p>';
        console.error(error);
    }
}

function PostCard(post) {
    return `
        <div class="post" onclick="window.views.Post(${post.id})">
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 100)}...</p>
        </div>
    `;
}