/*
* description: This file is used to create a post.
* author: toni
* date: 2025-06-02
* version: 1.0.0
* license: MIT
* copyright: 2025 toni
* contact: oduortoni@gmail.com
*/ 

// Render form and attach event
const PostCreate = () => {
    history.pushState({}, '', '/posts/create');

    window.app.innerHTML = `
        <form id="create-post-form" class="post-form">
            <input type="text" name="title" placeholder="Title" required />
            <textarea name="content" placeholder="Content" required></textarea>
            <button type="submit">Create Post</button>
        </form>
    `;

    document.getElementById('create-post-form').onsubmit = async (e) => {
        e.preventDefault();

        const title = document.querySelector('input[name="title"]').value.trim();
        const content = document.querySelector('textarea[name="content"]').value.trim();

        if (!title || !content) {
            window.views.Dialog('Validation Error', 'Both title and content are required.');
            return;
        }

        try {
            const data = await createPost(title, content);
            window.views.Dialog('Success', 'Post created successfully!', () => {
                history.pushState({}, '', '/posts');
                window.views.Posts();
            });
        } catch {
            window.views.Dialog('Error', 'Failed to create post.');
        }
    };
};

// Submit post to backend
const createPost = async (title, content) => {
    try {
        const response = await axios.post('/api/posts/create', {
            title,
            content,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            is_published: true,
        });
        console.info("Post created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to create post:", error);
        throw error;
    }
};

export default PostCreate;
