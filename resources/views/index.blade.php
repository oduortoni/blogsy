<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Blogsy</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
            <style>
                /* Fallback styles */
                body {
                    font-family: 'Instrument Sans', sans-serif;
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                header {
                    margin-bottom: 2rem;
                }
                nav {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                }
                a {
                    padding: 0.5rem 1rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    text-decoration: none;
                    color: #333;
                }
                main {
                    margin-top: 2rem;
                }
                h1 {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }
                p {
                    font-size: 1.1rem;
                    color: #555;
                }
            </style>
        @endif
    </head>
    <body>
        <header>
            @if (Route::has('login'))
                <nav>
                    @auth
                        <a href="{{ url('/dashboard') }}">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </nav>
            @endif
        </header>
        <main>
            <div>
                <h1>Blogsy</h1>
                <p>A modular, framework-agnostic blog backend built with Laravel using principles from Domain-Driven Design (DDD) and Onion Architecture.</p>
            </div>
        </main>
    </body>
</html>
