# Frontend Component Architecture

## Overview

The frontend follows a component-based architecture with clear separation of concerns. Components are isolated, reusable, and have minimal external dependencies.

---

## Architecture Principles

### 1. Component Isolation
Each component is self-contained with a clear API. Internal changes don't affect external consumers.

### 2. Single Responsibility
Each component does one thing well. Complex features are composed from simple components.

### 3. Minimal Coupling
Components communicate through well-defined interfaces (props/callbacks), not global state.

### 4. Reusability
Components are generic and can be used across different features.

---

## Directory Structure

```
resources/js/
├── lib/
│   ├── api.js           # Centralized API service
│   ├── router.js        # Client-side routing
│   └── bootstrap.js     # App initialization
├── views/
│   ├── components/      # Reusable UI components
│   │   ├── ui.js        # Basic UI elements
│   │   ├── PostCard.js  # Post card component
│   │   ├── PostForm.js  # Post form component
│   │   └── dialog.js    # Modal dialog
│   └── pages/           # Page-level components
│       ├── main/
│       └── posts/
└── app.js               # Entry point
```

---

## Core Components

### API Service (`lib/api.js`)

Centralizes all API calls. Handles v1 response structure.

**API:**
```javascript
api.getPosts()           // GET /api/v1/posts
api.getPost(id)          // GET /api/v1/posts/{id}
api.createPost(data)     // POST /api/v1/posts
api.updatePost(id, data) // PUT /api/v1/posts/{id}
api.deletePost(id)       // DELETE /api/v1/posts/{id}
```

**Response Format:**
```javascript
{
  success: true|false,
  data: {...},
  message: "...",
  errors: {...}  // Only on validation errors
}
```

**Usage:**
```javascript
import api from '../lib/api.js';

const result = await api.getPosts();
if (result.success) {
  // Handle data
} else {
  // Handle error
}
```

---

### UI Components (`components/ui.js`)

Basic reusable UI elements.

**Components:**
- `Loading(message)` - Loading indicator
- `ErrorMessage(message)` - Error display
- `SuccessMessage(message)` - Success display
- `EmptyState(message)` - Empty state display
- `FormField(config)` - Form input field
- `ValidationErrors(errors)` - Validation error display

**Example:**
```javascript
import { Loading, ErrorMessage } from './components/ui.js';

app.innerHTML = Loading('Loading posts...');
// or
app.innerHTML = ErrorMessage('Failed to load');
```

---

### PostCard Component (`components/PostCard.js`)

Displays a single post in card format.

**API:**
```javascript
PostCard(post, onClick)
```

**Parameters:**
- `post` (object) - Post data
- `onClick` (function) - Click handler, receives post ID

**Example:**
```javascript
import { PostCard } from './components/PostCard.js';

const html = PostCard(post, (id) => {
  router.navigate(`/posts/post/${id}`);
});
```

**Internal Changes:** Styling, layout, displayed fields can change without affecting consumers.

---

### PostForm Component (`components/PostForm.js`)

Reusable form for creating/editing posts.

**API:**
```javascript
PostForm({ post, onSubmit, errors, submitText })
```

**Parameters:**
- `post` (object|null) - Post data for editing, null for create
- `onSubmit` (function) - Submit handler, receives form data
- `errors` (object|null) - Validation errors
- `submitText` (string) - Submit button text

**Example:**
```javascript
import { PostForm } from './components/PostForm.js';

const html = PostForm({
  post: existingPost,  // or null for create
  onSubmit: async (data) => {
    const result = await api.updatePost(id, data);
    // Handle result
  },
  errors: validationErrors,
  submitText: 'Update Post'
});
```

**Internal Changes:** Form fields, validation display, layout can change without affecting consumers.

---

## Page Components

Page components orchestrate UI components and handle business logic.

### Pattern:

```javascript
import api from '../../../lib/api.js';
import { Component1, Component2 } from '../../components/index.js';

const PageName = async (app, params) => {
  // 1. Show loading
  app.innerHTML = Loading();
  
  // 2. Fetch data
  const result = await api.getData();
  
  // 3. Handle errors
  if (!result.success) {
    app.innerHTML = ErrorMessage(result.message);
    return;
  }
  
  // 4. Render with components
  app.innerHTML = `
    <h2>Title</h2>
    ${Component1(result.data)}
    ${Component2(result.data)}
  `;
};

export default PageName;
```

---

## Adding New Features

### 1. Add API Method

```javascript
// lib/api.js
getComments(postId) {
  return this.request('GET', `/posts/${postId}/comments`);
}
```

### 2. Create Component (if needed)

```javascript
// components/CommentCard.js
export const CommentCard = (comment) => `
  <div class="comment">
    <p>${comment.content}</p>
  </div>
`;
```

### 3. Create Page

```javascript
// pages/comments/list.js
import api from '../../../lib/api.js';
import { CommentCard } from '../../components/CommentCard.js';

const Comments = async (app, params) => {
  const result = await api.getComments(params.postId);
  app.innerHTML = result.data.map(c => CommentCard(c)).join('');
};

export default Comments;
```

### 4. Register Route

```javascript
// app.js
router.register('/posts/:postId/comments', Comments);
```

---

## Component Design Guidelines

### Good Component

```javascript
// Clear API, isolated functionality
export const UserCard = (user, onEdit) => {
  const id = `user-${user.id}`;
  setTimeout(() => {
    document.getElementById(id).onclick = () => onEdit(user.id);
  }, 0);
  
  return `<div id="${id}">${user.name}</div>`;
};
```

**Why:** Single responsibility, clear inputs/outputs, no global dependencies.

### Bad Component

```javascript
// Tightly coupled, unclear API
export const UserCard = (user) => {
  return `<div onclick="window.editUser(${user.id}, '${user.name}', '${user.email}')">${user.name}</div>`;
};
```

**Why:** Depends on global function, passes too much data inline, hard to change.

---

## Testing Strategy

### Manual Testing with curl

Test API endpoints before integrating:

```bash
# Test API
curl http://localhost:8000/api/v1/posts

# Then integrate in frontend
const result = await api.getPosts();
```

### Component Testing

Test components in isolation by rendering them directly:

```javascript
// In browser console
document.getElementById('app').innerHTML = PostCard({
  id: 1,
  title: 'Test',
  content: 'Test content'
}, (id) => console.log('Clicked:', id));
```

---

## Benefits

1. **Minimal Change Radius** - Internal component changes don't affect consumers
2. **Easy Testing** - Components can be tested in isolation
3. **Reusability** - Components work across different features
4. **Maintainability** - Clear structure and responsibilities
5. **Scalability** - Easy to add new features without breaking existing ones

---

**Last Updated:** 2026-01-14  
**Version:** 1.0
