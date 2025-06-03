/*
* file: blogsy/resources/js/views/post-delete.js
* description: This file is used to delete a post.
* author: toni
* date: 2025-06-02
* version: 1.0.0
* license: MIT
* copyright: 2025 toni
* contact: oduortoni@gmail.com
*/ 

const PostDelete = async (id) => {
    window.views.Dialog(
        'Delete Post',
        'Are you sure you want to delete this post?',
        async () => {
            try {
                const response = await axios.delete(`/api/posts/delete/${id}`);
                console.info("Post deleted:", response.data);

                window.views.Dialog('Deleted', 'Post deleted successfully.', () => {
                    history.pushState({}, '', '/posts');
                    window.views.Posts();
                });

            } catch (error) {
                console.error("Failed to delete post:", error);
                window.views.Dialog('Error', 'Failed to delete post.');
            }
        }
    );
};

export default PostDelete;

