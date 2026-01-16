<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BLOGSY</title>

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
</head>
<body>
    <header>
        <nav>
            <div class="logo" id="nav-logo">BLOGSY</div>
            <ul>
                <li id="nav-home">Home</li>
                <li id="nav-posts">Posts</li>
                <li id="nav-about">About</li>
                <li id="nav-login" style="display: none;">Login</li>
                <li id="nav-logout" style="display: none;">Logout</li>
            </ul>
        </nav>
    </header>

    <main class="app">
        <div id="app"></div>
    </main>

    <footer>
        © {{ date('Y') }} copyright of toni
    </footer>

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.ts'])
    @endif
</body>
</html>
