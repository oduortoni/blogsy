/*
 * file: blogsy/resources/js/views/components/PostForm.ts
 * description: Reusable post form component
 * author: toni
 * date: 2026-01-14
 */

import { FormField, ValidationErrors } from './ui';
import { BlockEditor } from './BlockEditor';
import api from '../../lib/api';
import type { Post, PostInput, ContentBlock } from '../../lib/api';

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
    const formStateKey = `form-state-${formId}`;
    
    // Retrieve or initialize state
    if (!(window as any)[formStateKey]) {
        (window as any)[formStateKey] = {
            contentBlocks: post?.content || [{ type: 'text', content: '' }],
            featuredImageUrl: post?.featured_image || ''
        };
    }
    
    const state = (window as any)[formStateKey];
    let contentBlocks = state.contentBlocks;
    let featuredImageUrl = state.featuredImageUrl;
    
    setTimeout(() => {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (form && onSubmit) {
            form.onsubmit = async (e: Event) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data: PostInput = {
                    title: formData.get('title') as string,
                    slug: formData.get('slug') as string,
                    content: contentBlocks,
                    featured_image: featuredImageUrl,
                    is_published: (form.querySelector('[name="is_published"]') as HTMLInputElement).checked
                };
                await onSubmit(data);
            };
            
            const featuredInput = form.querySelector('#featured-image-input') as HTMLInputElement;
            
            featuredInput?.addEventListener('change', async () => {
                if (featuredInput.files?.[0]) {
                    const result = await api.uploadImage(featuredInput.files[0]);
                    if (result.success && result.data) {
                        featuredImageUrl = result.data.url;
                        state.featuredImageUrl = result.data.url;
                        const preview = form.querySelector('.featured-preview') as HTMLElement;
                        preview.innerHTML = `<img src="${result.data.url}" alt="Featured" />`;
                        form.querySelector('.featured-actions')!.innerHTML = `
                            <button type="button" class="btn-change-featured">Change</button>
                            <button type="button" class="btn-delete-featured">Delete</button>
                        `;
                    }
                }
            });
            
            form.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('btn-upload-featured') || target.classList.contains('btn-change-featured')) {
                    featuredInput?.click();
                }
                if (target.classList.contains('btn-delete-featured')) {
                    featuredImageUrl = '';
                    state.featuredImageUrl = '';
                    const preview = form.querySelector('.featured-preview') as HTMLElement;
                    preview.innerHTML = '<p>No featured image</p>';
                    form.querySelector('.featured-actions')!.innerHTML = '<button type="button" class="btn-upload-featured">Upload</button>';
                }
            });
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
            <div class="form-field">
                <label>Featured Image</label>
                <div class="featured-image-upload">
                    <div class="featured-preview">
                        ${featuredImageUrl ? `<img src="${featuredImageUrl}" alt="Featured" />` : '<p>No featured image</p>'}
                    </div>
                    <input type="file" id="featured-image-input" accept="image/*" style="display:none;" />
                    <div class="featured-actions">
                        ${featuredImageUrl ? '<button type="button" class="btn-change-featured">Change</button>' : '<button type="button" class="btn-upload-featured">Upload</button>'}
                        ${featuredImageUrl ? '<button type="button" class="btn-delete-featured">Delete</button>' : ''}
                    </div>
                </div>
            </div>
            <div class="form-field">
                <label>Content</label>
                ${BlockEditor({ 
                    blocks: contentBlocks, 
                    onChange: (blocks) => { contentBlocks = blocks; } 
                })}
            </div>
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
