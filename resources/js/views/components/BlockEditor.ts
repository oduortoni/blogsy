/*
 * file: blogsy/resources/js/views/components/BlockEditor.ts
 * description: Block-based content editor
 * author: toni
 * date: 2026-01-15
 */

import type { ContentBlock } from '../../lib/api';
import api from '../../lib/api';

interface BlockEditorConfig {
    blocks: ContentBlock[];
    onChange: (blocks: ContentBlock[]) => void;
}

export const BlockEditor = ({ blocks, onChange }: BlockEditorConfig): string => {
    const editorId = 'block-editor';
    
    setTimeout(() => {
        setupEditor(editorId, blocks, onChange);
    }, 0);

    return `
        <div id="${editorId}" class="block-editor">
            ${blocks.map((block, index) => renderBlock(block, index)).join('')}
            <div class="block-actions">
                <button type="button" class="btn-add-text" data-type="text">+ Text</button>
                <button type="button" class="btn-add-heading" data-type="heading">+ Heading</button>
                <button type="button" class="btn-add-image" data-type="image">+ Image</button>
            </div>
        </div>
    `;
};

const renderBlock = (block: ContentBlock, index: number): string => {
    switch (block.type) {
        case 'heading':
            return `
                <div class="block block-heading" data-index="${index}">
                    <input type="text" class="block-input" value="${block.content || ''}" placeholder="Heading..." />
                    <button type="button" class="btn-remove">✕</button>
                </div>
            `;
        case 'text':
            return `
                <div class="block block-text" data-index="${index}">
                    <textarea class="block-input" placeholder="Write your content...">${block.content || ''}</textarea>
                    <button type="button" class="btn-remove">✕</button>
                </div>
            `;
        case 'image':
            return `
                <div class="block block-image" data-index="${index}" data-image-id="${block.image_id || ''}">
                    ${block.image_url ? `<img src="${block.image_url}" alt="Block image" />` : '<p>No image</p>'}
                    <input type="file" class="block-image-input" accept="image/*" style="display:none;" />
                    <div class="image-actions">
                        ${block.image_url ? `<button type="button" class="btn-change-image">Change</button>` : ''}
                        ${block.image_url ? `<button type="button" class="btn-delete-image">Delete</button>` : '<button type="button" class="btn-upload-image">Upload</button>'}
                    </div>
                    <button type="button" class="btn-remove">✕</button>
                </div>
            `;
        default:
            return '';
    }
};

const setupEditor = (editorId: string, initialBlocks: ContentBlock[], onChange: (blocks: ContentBlock[]) => void) => {
    const editor = document.getElementById(editorId);
    if (!editor) return;

    let blocks = [...initialBlocks];

    const updateBlocks = () => {
        blocks = [];
        editor.querySelectorAll('.block').forEach((blockEl) => {
            const index = parseInt((blockEl as HTMLElement).dataset.index || '0');
            const input = blockEl.querySelector('.block-input') as HTMLInputElement | HTMLTextAreaElement;
            
            if (blockEl.classList.contains('block-heading')) {
                blocks.push({ type: 'heading', content: input?.value || '' });
            } else if (blockEl.classList.contains('block-text')) {
                blocks.push({ type: 'text', content: input?.value || '' });
            } else if (blockEl.classList.contains('block-image')) {
                const img = blockEl.querySelector('img');
                const imageId = (blockEl as HTMLElement).dataset.imageId;
                if (img && imageId) {
                    blocks.push({ 
                        type: 'image', 
                        image_id: parseInt(imageId),
                        image_url: img.src 
                    });
                }
            }
        });
        onChange(blocks);
    };

    editor.addEventListener('input', updateBlocks);

    editor.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        
        if (target.classList.contains('btn-remove')) {
            target.closest('.block')?.remove();
            updateBlocks();
        }
        
        if (target.classList.contains('btn-add-text') || 
            target.classList.contains('btn-add-heading') || 
            target.classList.contains('btn-add-image')) {
            const type = target.dataset.type as 'text' | 'heading' | 'image';
            const newBlock: ContentBlock = { type, content: '' };
            blocks.push(newBlock);
            
            const actionsDiv = editor.querySelector('.block-actions');
            actionsDiv?.insertAdjacentHTML('beforebegin', renderBlock(newBlock, blocks.length - 1));
            updateBlocks();
        }
        
        if (target.classList.contains('btn-upload-image') || target.classList.contains('btn-change-image')) {
            const blockEl = target.closest('.block-image');
            const fileInput = blockEl?.querySelector('.block-image-input') as HTMLInputElement;
            fileInput?.click();
        }
        
        if (target.classList.contains('btn-delete-image')) {
            const blockEl = target.closest('.block-image') as HTMLElement;
            const imageId = blockEl.dataset.imageId;
            if (imageId) {
                await api.deleteImage(parseInt(imageId));
            }
            blockEl.dataset.imageId = '';
            const img = blockEl.querySelector('img');
            if (img) {
                const p = document.createElement('p');
                p.textContent = 'No image';
                img.replaceWith(p);
            }
            blockEl.querySelector('.image-actions')!.innerHTML = '<button type="button" class="btn-upload-image">Upload</button>';
            updateBlocks();
        }
    });

    editor.addEventListener('change', async (e) => {
        const target = e.target as HTMLInputElement;
        
        if (target.classList.contains('block-image-input') && target.files?.[0]) {
            const file = target.files[0];
            const result = await api.uploadImage(file);
            
            if (result.success && result.data) {
                const blockEl = target.closest('.block') as HTMLElement;
                blockEl.dataset.imageId = result.data.id.toString();
                const img = blockEl.querySelector('img');
                if (img) {
                    img.src = result.data.url;
                } else {
                    blockEl.querySelector('p')?.replaceWith(
                        Object.assign(document.createElement('img'), { 
                            src: result.data.url, 
                            alt: 'Block image' 
                        })
                    );
                }
                updateBlocks();
            }
        }
    });
};
