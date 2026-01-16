/*
 * author: toni
 * date: 2026-01-16
 * file: blogsy/resources/js/views/pages/auth/login.ts
 * description: Login page
 */

import api from '../../../lib/api';

const Login = async (app: HTMLElement): Promise<void> => {
    app.innerHTML = `
        <div class="auth-container">
            <div class="auth-form">
                <h2>Login</h2>
                <div id="error-message" class="error" style="display: none;"></div>
                <form id="login-form">
                    <div class="form-field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-field">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn-primary">Login</button>
                </form>
                <p style="text-align: center; margin-top: 1rem; opacity: 0.7;">
                    Don't have an account? <a href="#" id="register-link" style="color: #111; text-decoration: underline;">Register</a>
                </p>
            </div>
        </div>
    `;

    const form = document.getElementById('login-form') as HTMLFormElement;
    const errorDiv = document.getElementById('error-message') as HTMLDivElement;
    const registerLink = document.getElementById('register-link') as HTMLAnchorElement;

    registerLink.onclick = (e) => {
        e.preventDefault();
        window.router.navigate('/register');
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.style.display = 'none';

        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        const result = await api.login(email, password);

        if (result.success) {
            window.router.navigate('/');
        } else {
            errorDiv.textContent = result.message || 'Login failed';
            errorDiv.style.display = 'block';
        }
    });
};

export default Login;
