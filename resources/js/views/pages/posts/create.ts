/*
 * description: Create post page
 * author: toni
 * date: 2026-01-14
 */

import api from '../../../lib/api';
import { PostForm } from '../../components/PostForm';
import Dialog from '../../components/dialog';
import type { PostInput } from '../../../lib/api';

const PostCreate = (app: HTMLElement): void => {
    let errors: Record<string, string[]> | null = null;

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

    const handleSubmit = async (data: PostInput): Promise<void> => {
        const result = await api.createPost(data);

        if (!result.success) {
            errors = result.errors || null;
            render();
            return;
        }

        Dialog('Success', result.message || 'Post created successfully', () => {
            window.router.navigate('/posts');
        });
    };

    render();
};

export default PostCreate;
