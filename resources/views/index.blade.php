<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BLOGSY</title>

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>
<body>
    <header>
        <nav>
            <div class="logo">BLOGSY</div>
            <ul>
                <li>Home</li>
                <li>Posts</li>
                <li>About</li>
            </ul>
            @if (Route::has('login'))
                @auth
                    <a href="{{ url('/dashboard') }}">Dashboard</a>
                @else
                    <a href="{{ route('login') }}">Log in</a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}">Register</a>
                    @endif
                @endauth
            @endif
        </nav>
    </header>

    <main class="hero">
        <h1>Blogsy</h1>
        <p>A modular, framework-agnostic blog backend built with Laravel using principles from Domain-Driven Design (DDD) and Onion Architecture.</p>
        <button class="btn">View Posts</button>
    </main>

    <footer>
        © {{ date('Y') }} copyright of toni
    </footer>
</body>
</html>
