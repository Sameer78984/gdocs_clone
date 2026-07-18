# Environment Configuration

## Backend (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database (SQLite for local dev)
DATABASE_URL="file:./dev.db"

# Security
JWT_SECRET=supersecret_jwt_key_for_development
JWT_EXPIRES_IN=1d

# CORS
FRONTEND_URL=http://localhost:3000
```

## Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
