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

import api from '../../../lib/api.js';
import { PostForm } from '../../components/PostForm.js';
import { Loading, ErrorMessage } from '../../components/ui.js';
import Dialog from '../../components/dialog.js';

const PostUpdate = async (app, params) => {
    app.innerHTML = Loading('Loading post...');
    
    const result = await api.getPost(params.id);

    if (!result.success) {
        app.innerHTML = ErrorMessage(result.message);
        return;
    }

    let errors = null;
    const post = result.data;

    const render = () => {
        app.innerHTML = `
            <h2>Edit Post</h2>
            ${PostForm({
                post,
                onSubmit: handleSubmit,
                errors,
                submitText: 'Update Post'
            })}
        `;
    };

    const handleSubmit = async (data) => {
        const updateResult = await api.updatePost(params.id, data);

        if (!updateResult.success) {
            errors = updateResult.errors;
            render();
            return;
        }

        Dialog('Success', updateResult.message, () => {
            window.router.navigate(`/posts/post/${params.id}`);
        });
    };

    render();
};

export default PostUpdate;
