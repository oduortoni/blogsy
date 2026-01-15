# Blogsy API v1 Standard

This document defines the standardized response structure for all API endpoints in Blogsy. All future features must follow this specification.

---

## Base URL

```
http://localhost:8000/api/v1
```

---

## Response Structure

### Success Response (Single Resource)

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

### Success Response (Collection)

```json
{
  "success": true,
  "data": [...],
  "message": "Resources fetched successfully",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

### Success Response (Collection with Pagination)

```json
{
  "success": true,
  "data": [...],
  "message": "Resources fetched successfully",
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 100,
    "last_page": 7,
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field_name": ["Error message 1", "Error message 2"]
  },
  "meta": {
    "timestamp": "2026-01-14T07:30:26Z"
  }
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid request format |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server error |

---

## Implementation Guide

### Using the ApiResponse Trait

All controllers should use the `App\Http\Responses\ApiResponse` trait:

```php
use App\Http\Responses\ApiResponse;

class YourController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $data = YourService::all();
        return $this->success($data, 'Resources fetched successfully');
    }

    public function store(Request $request)
    {
        $resource = YourService::create($request->validated());
        return $this->success($resource, 'Resource created successfully', 201);
    }

    public function show($id)
    {
        $resource = YourService::find($id);
        if (!$resource) {
            return $this->error('Resource not found', null, 404);
        }
        return $this->success($resource, 'Resource fetched successfully');
    }
}
```

### Available Methods

#### success($data, $message = '', $status = 200)
Returns a successful response with data.

#### successWithPagination($data, $pagination, $message = '')
Returns a successful response with pagination metadata.

**Pagination array structure:**
```php
[
    'current_page' => 1,
    'per_page' => 15,
    'total' => 100,
    'last_page' => 7
]
```

#### error($message, $errors = null, $status = 400)
Returns an error response. Include `$errors` array for validation errors.

---

## RESTful Conventions

### Resource Naming
- Use plural nouns: `/posts`, `/users`, `/comments`
- Use kebab-case for multi-word resources: `/blog-posts`

### HTTP Methods
- **GET** - Retrieve resource(s)
- **POST** - Create new resource
- **PUT/PATCH** - Update existing resource
- **DELETE** - Delete resource

### Standard Endpoints Pattern

```
GET    /api/v1/resources       - List all resources
GET    /api/v1/resources/{id}  - Get single resource
POST   /api/v1/resources       - Create new resource
PUT    /api/v1/resources/{id}  - Update resource
DELETE /api/v1/resources/{id}  - Delete resource
```

---

## Versioning

All API endpoints must be versioned using URL prefix:
- Current version: `/api/v1/`
- Future versions: `/api/v2/`, `/api/v3/`, etc.

When introducing breaking changes, create a new version while maintaining backward compatibility with previous versions.

---

## Best Practices

1. **Always return consistent structure** - Use the ApiResponse trait methods
2. **Include meaningful messages** - Help clients understand what happened
3. **Use appropriate HTTP status codes** - Match the response status to the outcome
4. **Validate input** - Always validate request data before processing
5. **Handle errors gracefully** - Return structured error responses
6. **Document all endpoints** - Keep API documentation up to date
7. **Test with curl** - Verify each endpoint works as expected before committing

---

## Example: Complete CRUD Implementation

```php
<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\Request;

class ExampleController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $items = ExampleService::all();
        return $this->success($items, 'Items fetched successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $item = ExampleService::create($validated);
        return $this->success($item, 'Item created successfully', 201);
    }

    public function show($id)
    {
        $item = ExampleService::find($id);
        if (!$item) {
            return $this->error('Item not found', null, 404);
        }
        return $this->success($item, 'Item fetched successfully');
    }

    public function update(Request $request, $id)
    {
        $item = ExampleService::find($id);
        if (!$item) {
            return $this->error('Item not found', null, 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
        ]);

        $updated = ExampleService::update($id, $validated);
        return $this->success($updated, 'Item updated successfully');
    }

    public function destroy($id)
    {
        ExampleService::delete($id);
        return $this->success(null, 'Item deleted successfully');
    }
}
```

---

## Migration from Legacy API

If migrating from a non-versioned API:
1. Keep old routes functional (if needed for backward compatibility)
2. Create new v1 routes with standardized responses
3. Update documentation to reflect v1 as the recommended version
4. Deprecate old routes with a timeline for removal

---

**Last Updated:** 2026-01-14  
**Version:** 1.0
