# 📘 Blogsy API Documentation

**Base URL:** `http://localhost:8000/api`

---

## GET /

Returns a list of all available API endpoints.

**Sample cURL:**
```bash
curl http://localhost:8000/api/
```

---

## GET /posts

Fetch all blog posts.

**Response:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Example Post",
      "slug": "example-post",
      "content": "The first 100 characters...",
      "created_at": "14-01-2026 07:15:14",
      "updated_at": "14-01-2026 07:15:14"
    }
  ],
  "message": "Posts fetched successfully"
}
```

**Sample cURL:**
```bash
curl http://localhost:8000/api/posts
```

---

## GET /posts/{id}

Fetch a single post by ID.

**URL Parameters:**
- `id` (integer): The post ID

**Response:**
```json
{
  "post": {
    "id": 1,
    "title": "Example Post",
    "slug": "example-post",
    "content": "Full content here",
    "is_published": true,
    "views": 0,
    "likes": 0,
    "created_at": "14-01-2026 07:15:14",
    "updated_at": "14-01-2026 07:15:14"
  },
  "message": "Post fetched successfully"
}
```

**Sample cURL:**
```bash
curl http://localhost:8000/api/posts/1
```

---

## POST /posts/store

Create a new blog post.

**Required JSON Body:**
```json
{
  "title": "5 is the number of our fingers",
  "content": "Of course it is easier to count by five. We are humans after all.",
  "slug": "five-fingers",
  "is_published": true
}
```

**Response:**
```json
{
  "id": 1,
  "title": "5 is the number of our fingers",
  "slug": "five-fingers",
  "content": "Of course it is easier to count by five. We are humans after all.",
  "is_published": true,
  "views": 0,
  "likes": 0,
  "created_at": "14-01-2026 07:30:26",
  "updated_at": "14-01-2026 07:30:26"
}
```

**Sample cURL:**
```bash
curl -X POST http://localhost:8000/api/posts/store \
  -H "Content-Type: application/json" \
  -d '{
    "title": "5 is the number of our fingers",
    "content": "Of course it is easier to count by five. We are humans after all.",
    "slug": "five-fingers",
    "is_published": true
  }'
```

---

## POST /posts/update/{id}

Update an existing post by ID. All fields are optional.

**URL Parameters:**
- `id` (integer): The post ID

**Optional JSON Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content goes here.",
  "slug": "updated-title",
  "is_published": false
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "slug": "updated-title",
  "content": "Updated content goes here.",
  "is_published": false,
  "views": 5,
  "likes": 2,
  "created_at": "14-01-2026 07:15:14",
  "updated_at": "14-01-2026 07:35:00"
}
```

**Sample cURL:**
```bash
curl -X POST http://localhost:8000/api/posts/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content goes here."
  }'
```

---

## DELETE /posts/delete/{id}

Delete a post by ID.

**URL Parameters:**
- `id` (integer): The post ID

**Response:**
```json
{
  "message": "Post deleted"
}
```

**Sample cURL:**
```bash
curl -X DELETE http://localhost:8000/api/posts/delete/1
```
