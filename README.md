# Blogsy

A blog backend built with Laravel. This project emphasizes clean architecture, decoupled components, and incremental development where each feature is implemented as the smallest testable unit.

## Features

- Portable domain logic in isolated `blogsy/` folder
- DDD-inspired architecture with entities, services, and repositories
- RESTful API with v1 response structure
- Block-based content editor (text, headings, images)
- Featured image support with upload functionality
- Incremental development verified via HTTP before frontend integration

## Tech Stack

- Backend: Laravel 11, PHP 8.2+
- Frontend: Vanilla TypeScript SPA with client-side routing
- Database: SQLite (configurable)
- Architecture: Domain-Driven Design, Onion Architecture

## Installation

```bash
git clone https://github.com/oduortoni/blogsy.git
cd blogsy
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Access at `http://localhost:8000`

## Project Structure

```
blogsy/
├── app/                    # Laravel application layer
├── blogsy/                 # Portable domain layer
│   ├── Domain/            # Entities, interfaces
│   └── Application/       # Services, repositories
├── resources/
│   ├── js/                # TypeScript SPA
│   └── css/               # Styles
└── routes/api.php         # API routes
```

## API Examples

### Create Post

```bash
curl -X POST http://localhost:8000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "slug": "my-first-post",
    "content": [{"type": "text", "content": "Hello world"}],
    "is_published": true
  }'
```

### Update Post

```bash
curl -X PUT http://localhost:8000/api/v1/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Delete Post

```bash
curl -X DELETE http://localhost:8000/api/v1/posts/1
```

## Development Philosophy

- Each feature is the smallest testable unit
- HTTP verification before frontend integration
- Meaningful git commits reflecting incremental progress
- Clean separation between domain logic and framework

## License

MIT

## Contact

oduortoni@gmail.com
