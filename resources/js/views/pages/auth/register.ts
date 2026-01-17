/*
 * author: toni
 * date: 2026-01-16
 * file: blogsy/resources/js/views/pages/auth/register.ts
 * description: Register page
 */

import api from '../../../lib/api';

const Register = async (app: HTMLElement): Promise<void> => {
    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-form">
                <h2>Register</h2>
                <div id="error-message" class="error" style="display: none;"></div>
                <form id="register-form">
                    <div class="form-field">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-field">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required minlength="8">
                    </div>
                    <button type="submit" class="btn-primary">Register</button>
                </form>
                <p style="text-align: center; margin-top: 1rem; opacity: 0.7;">
                    Already registered? <a href="#" id="login-link" style="color: var(--color-link); text-decoration: underline;">Login</a>
                </p>
            </div>
        </div>
    `;

    const form = document.getElementById('register-form') as HTMLFormElement;
    const errorDiv = document.getElementById('error-message') as HTMLDivElement;
    const loginLink = document.getElementById('login-link') as HTMLAnchorElement;

    loginLink.onclick = (e) => {
        e.preventDefault();
        window.router.navigate('/login');
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.style.display = 'none';

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        const result = await api.register(name, email, password);

        if (result.success) {
            window.router.navigate('/');
        } else {
            errorDiv.textContent = result.message || 'Registration failed';
            errorDiv.style.display = 'block';
        }
    });
};

export default Register;
