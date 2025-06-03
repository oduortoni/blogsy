/*
 * file: blogsy/resources/js/views/post-update.js
 * description: This file is used to update a post.
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */

// Load post and render form
const PostUpdate = async (id) => {
    try {
        const { data } = await axios.get(`/api/posts/${id}`);
        const post = data.post;

        history.pushState({}, "", `/posts/${id}/edit`);

        // Render form
        window.app.innerHTML = `
            <form id="update-post-form" class="post-form">
                <input type="text" name="title" placeholder="Title" value="${post.title}" required />
                <textarea name="content" placeholder="Content" required>${post.content}</textarea>
                <button type="submit">Update</button>
            </form>
        `;

        // Attach submit event
        document.getElementById("update-post-form").onsubmit = async (e) => {
            e.preventDefault();

            const title = document
                .querySelector('input[name="title"]')
                .value.trim();
            const content = document
                .querySelector('textarea[name="content"]')
                .value.trim();

            if (!title || !content) {
                window.views.Dialog(
                    "Validation Error",
                    "Both title and content are required.",
                );
                return;
            }

            try {
                await updatePost(id, title, content);
                window.views.Dialog(
                    "Success",
                    "Post updated successfully!",
                    () => {
                        history.pushState({}, "", `/posts/${id}`);
                        window.views.Post(id);
                    },
                );
            } catch {
                window.views.Dialog("Error", "Failed to update post.");
            }
        };
    } catch (error) {
        console.error("Failed to load post for editing:", error);
        window.app.innerHTML = `<p>Could not load post for editing.</p>`;
    }
};

// Update a post via API
const updatePost = async (id, title, content) => {
    try {
        const response = await axios.post(`/api/posts/update/${id}`, {
            title,
            content,
        });
        console.info("Post updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to update post:", error);
        throw error;
    }
};

export default PostUpdate;
