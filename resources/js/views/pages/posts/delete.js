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

import api from '../../../lib/api.js';
import Dialog from '../../components/dialog.js';

const PostDelete = async (app, params) => {
    Dialog(
        'Delete Post',
        'Are you sure you want to delete this post?',
        async () => {
            const result = await api.deletePost(params.id);

            if (!result.success) {
                Dialog('Error', result.message);
                return;
            }

            Dialog('Success', result.message, () => {
                window.router.navigate('/posts');
            });
        },
        () => {
            window.router.navigate('/posts');
        }
    );
};

export default PostDelete;
