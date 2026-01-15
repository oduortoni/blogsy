/*
 * file: blogsy/resources/js/views/pages/posts/update.ts
 * description: Update post page
 * author: toni
 * date: 2026-01-14
 */

import api from '../../../lib/api';
import { PostForm } from '../../components/PostForm';
import { Loading, ErrorMessage } from '../../components/ui';
import Dialog from '../../components/dialog';
import type { Post, PostInput } from '../../../lib/api';

const PostUpdate = async (app: HTMLElement, params: { id: string }): Promise<void> => {
    app.innerHTML = Loading('Loading post...');
    
    const result = await api.getPost(parseInt(params.id));

    if (!result.success || !result.data) {
        app.innerHTML = ErrorMessage(result.message || 'Post not found');
        return;
    }

    let errors: Record<string, string[]> | null = null;
    const post: Post = result.data;

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

    const handleSubmit = async (data: PostInput): Promise<void> => {
        const updateResult = await api.updatePost(parseInt(params.id), data);

        if (!updateResult.success) {
            errors = updateResult.errors || null;
            render();
            return;
        }

        Dialog('Success', updateResult.message || 'Post updated successfully', () => {
            window.router.navigate(`/posts/post/${params.id}`);
        });
    };

    render();
};

export default PostUpdate;
