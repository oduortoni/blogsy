/*
 * file: blogsy/resources/js/views/components/ui.ts
 * description: Reusable UI components
 * author: toni
 * date: 2026-01-14
 */

export const Loading = (message: string = 'Loading...'): string => 
    `<p class="loading">${message}</p>`;

export const ErrorMessage = (message: string): string => 
    `<p class="error">${message}</p>`;

export const SuccessMessage = (message: string): string => 
    `<p class="success">${message}</p>`;

export const EmptyState = (message: string): string => 
    `<p class="empty">${message}</p>`;

interface ButtonConfig {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ text, onClick, className = '', type = 'button' }: ButtonConfig): string => {
    const id = `btn-${Math.random().toString(36).substr(2, 9)}`;
    setTimeout(() => {
        const btn = document.getElementById(id);
        if (btn && onClick) btn.onclick = onClick;
    }, 0);
    return `<button id="${id}" type="${type}" class="${className}">${text}</button>`;
};

interface FormFieldConfig {
    label: string;
    name: string;
    type?: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
}

export const FormField = ({ 
    label, 
    name, 
    type = 'text', 
    value = '', 
    required = false, 
    placeholder = '' 
}: FormFieldConfig): string => `
    <div class="form-field">
        <label for="${name}">${label}${required ? ' *' : ''}</label>
        ${type === 'textarea' 
            ? `<textarea id="${name}" name="${name}" ${required ? 'required' : ''} placeholder="${placeholder}">${value}</textarea>`
            : `<input type="${type}" id="${name}" name="${name}" value="${value}" ${required ? 'required' : ''} placeholder="${placeholder}" />`
        }
    </div>
`;

export const ValidationErrors = (errors: Record<string, string[]> | null): string => {
    if (!errors) return '';
    return `
        <div class="validation-errors">
            ${Object.entries(errors).map(([field, messages]) => `
                <p class="error">${messages.join(', ')}</p>
            `).join('')}
        </div>
    `;
};
