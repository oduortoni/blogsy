/*
 * file: blogsy/resources/js/views/components/PostForm.js
 * description: Reusable post form component
 * author: toni
 * date: 2026-01-14
 */

import { FormField, ValidationErrors } from './ui.js';

export const PostForm = ({ post = null, onSubmit, errors = null, submitText = 'Submit' }) => {
    const formId = 'post-form';
    
    setTimeout(() => {
        const form = document.getElementById(formId);
        if (form && onSubmit) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                data.is_published = form.querySelector('[name="is_published"]').checked;
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
