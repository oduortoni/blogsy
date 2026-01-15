/*
 * file: blogsy/resources/js/views/pages/posts/delete.ts
 * description: Delete post page
 * author: toni
 * date: 2026-01-14
 */

import api from '../../../lib/api';
import Dialog from '../../components/dialog';

const PostDelete = async (app: HTMLElement, params: { id: string }): Promise<void> => {
    Dialog(
        'Delete Post',
        'Are you sure you want to delete this post?',
        async () => {
            const result = await api.deletePost(parseInt(params.id));

            if (!result.success) {
                Dialog('Error', result.message || 'Failed to delete post');
                return;
            }

            Dialog('Success', result.message || 'Post deleted successfully', () => {
                window.router.navigate('/posts');
            });
        },
        () => {
            window.router.navigate('/posts');
        }
    );
};

export default PostDelete;
