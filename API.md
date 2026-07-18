# API Documentation

Base URL: `/api`

## Auth Endpoints

### POST `/auth/register`
**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```
**Response (201 Created):** Sets `HttpOnly` Cookie.
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "email": "user@example.com", "name": "John Doe" }
  }
}
```

### POST `/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Document Endpoints (Requires Cookie)

### GET `/documents`
**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "uuid",
        "title": "My Doc",
        "content": "Hello",
        "updatedAt": "2024-01-01T00:00:00Z",
        "owner": { "id": "uuid", "name": "John" }
      }
    ]
  }
}
```

### POST `/documents`
**Request Body:**
```json
{
  "title": "New Doc",
  "content": ""
}
```

### PATCH `/documents/:id`
Updates content only.
**Request Body:**
```json
{
  "content": "Updated content"
}
```

### PATCH `/documents/:id/title`
Updates title only.
**Request Body:**
```json
{
  "title": "Updated title"
}
```

---

## Sharing Endpoints (Requires Cookie & Ownership)

### POST `/documents/:id/shares`
**Request Body:**
```json
{
  "email": "bob@example.com",
  "permission": "READ"
}
```

### GET `/documents/:id/shares`
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "share-uuid",
      "permission": "READ",
      "user": { "id": "user-uuid", "email": "bob@example.com", "name": "Bob" }
    }
  ]
}
```

---

## Uploads

### POST `/documents/import`
Accepts `multipart/form-data` with a `file` field (.txt or .md).
**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "imported.txt",
    "content": "File contents here...",
    "owner": { "id": "uuid" }
  }
}
```
