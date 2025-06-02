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

// const PostDelete = async (id) => {
//     // Create overlay if not already in DOM
//     if (!document.getElementById('confirm-overlay')) {
//         const overlay = document.createElement('div');
//         overlay.id = 'confirm-overlay';
//         overlay.innerHTML = `
//             <div class="modal">
//                 <h3>Delete Post</h3>
//                 <p>Are you sure you want to delete this post?</p>
//                 <div class="actions">
//                     <button id="confirm-yes">Yes, Delete</button>
//                     <button id="confirm-no">Cancel</button>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(overlay);
//     }

//     // Show overlay
//     const overlay = document.getElementById('confirm-overlay');
//     overlay.style.display = 'flex';

//     // Attach events
//     document.getElementById('confirm-no').onclick = () => {
//         overlay.style.display = 'none';
//     };

//     document.getElementById('confirm-yes').onclick = async () => {
//         try {
//             const response = await axios.delete(`/api/posts/delete/${id}`);
//             console.info("Post deleted:", response.data);
//             overlay.style.display = 'none';
//             history.pushState({}, '', '/posts');
//             window.views.Posts(); // Navigate to posts list
//         } catch (error) {
//             console.error("Failed to delete post:", error);
//             window.views.Dialog('Error', 'Failed to delete post.');
//         }
//     };
// };

// export default PostDelete;


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

