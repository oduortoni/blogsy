# Blogsy

**Blogsy** is a modular, framework-agnostic blog backend built with Laravel using principles from Domain-Driven Design (DDD) and Onion Architecture.  
This project focuses on clean architecture, decoupled components, and incremental development—where each feature is implemented as the smallest possible testable unit, verified via curl, and committed with meaningful messages.

The core business logic lives in a portable `blogsy/` folder, making it easy to migrate across different PHP frameworks or architectures in the future.

---

## Repository

[https://github.com/oduortoni/blogsy](https://github.com/oduortoni/blogsy)

---

## Goals

- Portable and maintainable backend structure  
- DDD-inspired domain isolation  
- Testable via HTTP (curl) before any frontend is introduced  
- Git history that reflects meaningful, step-by-step progress  

---

## Folder Structure

```
blogsy/
├── app/
│   └── Blogsy/                # Portable domain & application layer
│       ├── Domain/            # Entities, Value Objects, Interfaces
│       ├── Application/       # Use cases, Services
│       └── Infrastructure/    # Data access, external services
├── bootstrap/
├── config/
├── database/
├── public/
├── routes/
└── tests/
```

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/oduortoni/blogsy.git
cd blogsy
```

2. **Install dependencies**  
   Make sure you have Composer installed.

```bash
composer install
```

3. **Set up environment**  
   Copy `.env.example` to `.env` and configure your database and other settings.

```bash
cp .env.example .env
php artisan key:generate
```

4. **Run migrations**

```bash
php artisan migrate
```

5. **Start the development server**

```bash
php artisan serve
```

The backend will be accessible at `http://localhost:8000`.

---

## Incremental Development & Testing

This project embraces an incremental development approach where:

- Each feature is implemented as the smallest possible testable unit
- Every change is verified using HTTP calls (e.g., `curl`)
- Git commits are meaningful and reflect step-by-step progress

### Example curl test for creating a blog post

```bash
curl -X POST http://localhost:8000/api/posts/store   -H "Content-Type: application/json"   -d '{
    "title": "First After Second",
    "content": "This is a kool post",
    "slug": "first-after-second",
    "is_published": true
}'
```

with a result for example

```bash
{"title":"First After Second","content":"This is a kool post","slug":"first-after-second","is_published":"Yes","views":0,"likes":0,"updated_at":"01-06-2025 11:25:17","created_at":"01-06-2025 11:25:17","id":2}
```

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{ 
    "title": "5 is the number of our fingers",
    "content": "Of course it is easier to count by five. We are humans after all"
  }' \
  http://localhost:8000/api/posts/update/5

```

```bash
{"message":"Post updated"}
```

```
curl -X DELETE http://localhost:8000/api/posts/5
```

You can run similar curl commands for other endpoints as they are implemented.

---

## Contribution

Contributions are welcome! Please submit issues and pull requests via GitHub.

---

## License

MIT License

---

## Contact

For questions or feedback, please reach out to [oduortoni@gmail.com].