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
            <h2 style="text-align: center; color: var(--color-foreground-muted); font-weight: 400; margin-bottom: 2rem;">Create New Post</h2>
            ${PostForm({
                onSubmit: handleSubmit,
                errors,
                submitText: 'Create Post'
            })}
        `;
    };

    const handleSubmit = async (data: PostInput): Promise<void> => {
        const result = await api.createPost(data);

        if (!result.success || !result.data) {
            errors = result.errors || null;
            render();
            return;
        }

        window.router.navigate(`/posts/post/${result.data.id}`);
    };

    render();
};

export default PostCreate;
