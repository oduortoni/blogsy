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

// const PostUpdate = async (id) => {
//     const updatePost = async (id, title, content) => {
//         try {
//               const post = await axios.post(`/api/posts/${id}`, {
//                   title,
//                   content,
//               }).then(response => response.data);
//               console.info(post);
//               return post;
//           } catch (error) {
//               console.error(error);
//           }
//     };

//     const post = await axios.get(`/api/posts/${id}`).then(response => response.data);
//     console.info("UPDATE POST", post);

//     window.app.innerHTML = `
//         <form>
//             <input type="text" name="title" placeholder="Title" value="${post.post.title}" />
//             <textarea name="content" placeholder="Content">${post.post.content}</textarea>
//             <button type="submit" onclick="updatePost(${id}, document.querySelector('input[name="title"]').value, document.querySelector('textarea[name="content"]').value)">Update</button>
//         </form>
//     `;
// };


// export default PostUpdate;

const PostUpdate = async (id) => {
    try {
        const { data } = await axios.get(`/api/posts/${id}`);
        const post = data.post;

        // Update URL
        history.pushState({}, '', `/posts/${id}/edit`);

        // Render edit form
        window.app.innerHTML = `
            <form id="update-post-form" class="post-form">
                <input type="text" name="title" placeholder="Title" value="${post.title}" required />
                <textarea name="content" placeholder="Content" required>${post.content}</textarea>
                <button type="submit">Update</button>
            </form>
        `;

        // Submit handler
        document.getElementById('update-post-form').onsubmit = async (e) => {
            e.preventDefault();

            const title = document.querySelector('input[name="title"]').value.trim();
            const content = document.querySelector('textarea[name="content"]').value.trim();

            if (!title || !content) {
                window.views.Dialog('Validation Error', 'Both title and content are required.');
                return;
            }

            try {
                const response = await axios.post(`/api/posts/update/${id}`, { title, content });
                console.info("Post updated:", response.data);

                // Show confirmation modal
                window.views.Dialog('Success', 'Post updated successfully!', () => {
                    history.pushState({}, '', `/posts/${id}`);
                    window.views.Post(id);
                });

            } catch (error) {
                console.error("Failed to update post:", error);
                window.views.Dialog('Error', 'Failed to update post.');
            }
        };

    } catch (error) {
        console.error("Failed to load post for editing:", error);
        window.app.innerHTML = `<p>Could not load post for editing.</p>`;
    }
};

export default PostUpdate;
