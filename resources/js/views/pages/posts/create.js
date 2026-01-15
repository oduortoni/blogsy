/*
 * description: This file is used to create a post.
 * author: toni
 * date: 2025-06-02
 * version: 1.0.0
 * license: MIT
 * copyright: 2025 toni
 * contact: oduortoni@gmail.com
 */

import api from '../../../lib/api.js';
import { PostForm } from '../../components/PostForm.js';
import Dialog from '../../components/dialog.js';

const PostCreate = (app, params) => {
    let errors = null;

    const render = () => {
        app.innerHTML = `
            <h2>Create New Post</h2>
            ${PostForm({
                onSubmit: handleSubmit,
                errors,
                submitText: 'Create Post'
            })}
        `;
    };

    const handleSubmit = async (data) => {
        const result = await api.createPost(data);

        if (!result.success) {
            errors = result.errors;
            render();
            return;
        }

        Dialog('Success', result.message, () => {
            window.router.navigate('/posts');
        });
    };

    render();
};

export default PostCreate;
