/*
* file: blogsy/resources/js/views/post.js
* description: This file is used to render the post view.
* author: toni
* date: 2025-06-02
* version: 1.0.0
* license: MIT
* copyright: 2025 toni
* contact: oduortoni@gmail.com
*/

const Post = async (postId) => {
    window.app.innerHTML = '<p>Loading post...</p>';
    try {
        const result = await axios.get(`/api/posts/${postId}`).then(response => response.data);
        window.app.innerHTML = PostView(result.post);
    } catch (error) {
        window.app.innerHTML = '<p>Failed to load post.</p>';
        console.error(error);
    }
};

const PostView = (post) => {
    return `
        <article class="post-detail">
            <h2>${post.title}</h2>
            <p class="meta">
                <strong>Author:</strong> ${post.author?.name ?? 'Unknown'} |
                <strong>Published:</strong> ${new Date(post.created_at).toLocaleDateString()}
            </p>
            <div class="content">
                ${post.content}
            </div>
            <button class="btn" onclick="window.views.Posts(window.app)">← Back to Posts</button>
        </article>
    `;
}

export default Post;