# 📘 Blogsy Posts API Documentation (v1)

**Base URL:** `http://localhost:8000/api/v1`

All responses follow the standardized v1 API structure. See [api-v1.md](./api-v1.md) for complete API standards.

---

## GET /posts

Fetch all blog posts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Example Post",
      "slug": "example-post",
      "content": "The first 100 characters...",
      "is_published": true,
      "views": 0,
      "likes": 0,
      "created_at": "14-01-2026 07:15:14",
      "updated_at": "14-01-2026 07:15:14"
    }
  ],
  "message": "Posts fetched successfully",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Error Response (No posts found):**
```json
{
  "success": false,
  "message": "No posts found",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Sample cURL:**
```bash
curl http://localhost:8000/api/v1/posts
```

---

## GET /posts/{id}

Fetch a single post by ID.

**URL Parameters:**
- `id` (integer): The post ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Example Post",
    "slug": "example-post",
    "content": "Full content here",
    "is_published": true,
    "views": 0,
    "likes": 0,
    "user": {
      "name": "John Doe"
    },
    "created_at": "14-01-2026 07:15:14",
    "updated_at": "14-01-2026 07:15:14"
  },
  "message": "Post fetched successfully",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Error Response (Not found):**
```json
{
  "success": false,
  "message": "Post not found",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Sample cURL:**
```bash
curl http://localhost:8000/api/v1/posts/1
```

---

## POST /posts

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

**Field Validation:**
- `title` (required, string, max 255 characters)
- `content` (required, string)
- `slug` (required, string, unique, max 255 characters)
- `is_published` (optional, boolean)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "5 is the number of our fingers",
    "slug": "five-fingers",
    "content": "Of course it is easier to count by five. We are humans after all.",
    "is_published": true,
    "views": 0,
    "likes": 0,
    "created_at": "14-01-2026 07:30:26",
    "updated_at": "14-01-2026 07:30:26"
  },
  "message": "Post created successfully",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Error Response (Validation failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["The title field is required"],
    "slug": ["The slug has already been taken"]
  },
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

**Sample cURL:**
```bash
curl -X POST http://localhost:8000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "5 is the number of our fingers",
    "content": "Of course it is easier to count by five. We are humans after all.",
    "slug": "five-fingers",
    "is_published": true
  }'
```

---

## PUT /posts/{id}

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

**Field Validation:**
- `title` (optional, string, max 255 characters)
- `content` (optional, string)
- `slug` (optional, string, unique, max 255 characters)
- `is_published` (optional, boolean)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "slug": "updated-title",
    "content": "Updated content goes here.",
    "is_published": false,
    "views": 5,
    "likes": 2,
    "created_at": "14-01-2026 07:15:14",
    "updated_at": "14-01-2026 07:35:00"
  },
  "message": "Post updated successfully",
  "meta": {
    "timestamp": "2026-01-14T07:35:00Z"
  }
}
```

**Error Response (Not found):**
```json
{
  "success": false,
  "message": "Post not found",
  "meta": {
    "timestamp": "2026-01-14T07:35:00Z"
  }
}
```

**Sample cURL:**
```bash
curl -X PUT http://localhost:8000/api/v1/posts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content goes here."
  }'
```

---

## DELETE /posts/{id}

Delete a post by ID.

**URL Parameters:**
- `id` (integer): The post ID

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Post deleted successfully",
  "meta": {
    "timestamp": "2026-01-14T07:40:00Z"
  }
}
```

**Sample cURL:**
```bash
curl -X DELETE http://localhost:8000/api/v1/posts/1
```

---

## Migration from Legacy Endpoints

The following legacy endpoints are deprecated. Please migrate to v1:

| Legacy Endpoint | v1 Endpoint | Method Change |
|----------------|-------------|---------------|
| `POST /api/posts/store` | `POST /api/v1/posts` | ✓ |
| `POST /api/posts/update/{id}` | `PUT /api/v1/posts/{id}` | ✓ |
| `DELETE /api/posts/delete/{id}` | `DELETE /api/v1/posts/{id}` | ✓ |

---

**API Version:** v1  
**Last Updated:** 2026-01-14  
**See also:** [API v1 Standards](./api-v1.md)
