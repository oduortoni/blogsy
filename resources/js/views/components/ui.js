/*
 * file: blogsy/resources/js/views/components/ui.js
 * description: Reusable UI components
 * author: toni
 * date: 2026-01-14
 */

// Loading state component
export const Loading = (message = 'Loading...') => `<p class="loading">${message}</p>`;

// Error message component
export const ErrorMessage = (message) => `<p class="error">${message}</p>`;

// Success message component
export const SuccessMessage = (message) => `<p class="success">${message}</p>`;

// Empty state component
export const EmptyState = (message) => `<p class="empty">${message}</p>`;

// Button component
export const Button = ({ text, onClick, className = '', type = 'button' }) => {
    const id = `btn-${Math.random().toString(36).substr(2, 9)}`;
    setTimeout(() => {
        const btn = document.getElementById(id);
        if (btn && onClick) btn.onclick = onClick;
    }, 0);
    return `<button id="${id}" type="${type}" class="${className}">${text}</button>`;
};

// Form field component
export const FormField = ({ label, name, type = 'text', value = '', required = false, placeholder = '' }) => `
    <div class="form-field">
        <label for="${name}">${label}${required ? ' *' : ''}</label>
        ${type === 'textarea' 
            ? `<textarea id="${name}" name="${name}" ${required ? 'required' : ''} placeholder="${placeholder}">${value}</textarea>`
            : `<input type="${type}" id="${name}" name="${name}" value="${value}" ${required ? 'required' : ''} placeholder="${placeholder}" />`
        }
    </div>
`;

// Validation errors component
export const ValidationErrors = (errors) => {
    if (!errors) return '';
    return `
        <div class="validation-errors">
            ${Object.entries(errors).map(([field, messages]) => `
                <p class="error">${messages.join(', ')}</p>
            `).join('')}
        </div>
    `;
};
