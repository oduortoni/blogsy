/*
 * file: blogsy/resources/js/views/components/PostForm.ts
 * description: Reusable post form component
 * author: toni
 * date: 2026-01-14
 */

import { FormField, ValidationErrors } from './ui';
import type { Post, PostInput } from '../../lib/api';

interface PostFormConfig {
    post?: Post | null;
    onSubmit: (data: PostInput) => Promise<void>;
    errors?: Record<string, string[]> | null;
    submitText?: string;
}

export const PostForm = ({ 
    post = null, 
    onSubmit, 
    errors = null, 
    submitText = 'Submit' 
}: PostFormConfig): string => {
    const formId = 'post-form';
    
    setTimeout(() => {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (form && onSubmit) {
            form.onsubmit = async (e: Event) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data: PostInput = {
                    title: formData.get('title') as string,
                    slug: formData.get('slug') as string,
                    content: formData.get('content') as string,
                    is_published: (form.querySelector('[name="is_published"]') as HTMLInputElement).checked
                };
                await onSubmit(data);
            };
        }
    }, 0);

    return `
        <form id="${formId}" class="post-form">
            ${ValidationErrors(errors)}
            ${FormField({ 
                label: 'Title', 
                name: 'title', 
                value: post?.title || '', 
                required: true,
                placeholder: 'Enter post title'
            })}
            ${FormField({ 
                label: 'Slug', 
                name: 'slug', 
                value: post?.slug || '', 
                required: true,
                placeholder: 'post-slug'
            })}
            ${FormField({ 
                label: 'Content', 
                name: 'content', 
                type: 'textarea',
                value: post?.content || '', 
                required: true,
                placeholder: 'Write your post content...'
            })}
            <div class="form-field">
                <label>
                    <input type="checkbox" name="is_published" ${post?.is_published ? 'checked' : ''} />
                    Published
                </label>
            </div>
            <button type="submit" class="btn-primary">${submitText}</button>
        </form>
    `;
};
