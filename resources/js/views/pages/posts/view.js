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

const Post = async (app, params) => {
    app.innerHTML = "<p>Loading post...</p>";
    try {
        const result = await axios
            .get(`/api/posts/${params.id}`)
            .then((response) => response.data);
        app.innerHTML = PostView(result.post);
    } catch (error) {
        app.innerHTML = "<p>Failed to load post.</p>";
        console.error(error);
    }
};

const PostView = (post) => {
    return `
        <article class="post-detail">
            <h2>${post.title}</h2>
            <p class="meta">
                <strong>Author:</strong> ${post.author?.name ?? "Unknown"} |
                <strong>Published:</strong> ${new Date(post.created_at).toLocaleDateString()}
            </p>
            <div class="content">
                ${post.content}
            </div>
            <div class="post-actions">
                <button class="btn btn-back" onclick="window.router.navigate('/posts')" title="Back to Posts">←</button>
                <button class="btn btn-edit" onclick="window.router.navigate('/posts/edit/${post.id}')" title="Edit Post">✎</button>
                <button class="btn btn-delete" onclick="window.router.navigate('/posts/delete/${post.id}')" title="Delete Post">✕</button>
            </div>
        </article>
    `;
};

export default Post;
