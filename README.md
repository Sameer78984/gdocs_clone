# Ajaia Document Editor

A production-ready, highly modular, real-time collaborative-ready rich text editor.

## Project Overview
This project fulfills the Ajaia Full-Stack Engineering Assessment requirements. It features a Next.js (App Router) frontend utilizing a custom Tiptap-based modular editor, and a Node.js (Express) backend driven by Prisma ORM.

## Tech Stack
**Frontend:**
- React 18 + Next.js 14 (App Router)
- Tailwind CSS v4 + Shadcn UI
- Tiptap (Headless Rich Text Editor)
- Zustand (Transient Editor State)
- React Query (Server State & Autosave)

**Backend:**
- Node.js + Express
- Prisma ORM + SQLite (Easily migratable to PostgreSQL)
- JWT + HttpOnly Cookies (Secure Auth)
- Vitest + Supertest (Integration Testing)

## Features
- **Secure Authentication**: HttpOnly JWT cookies.
- **Rich Text Editing**: Modular Tiptap editor with Bubble/Floating menus.
- **Debounced Autosave**: Smooth experience preventing network flooding.
- **File Import**: Drag-and-drop `.txt` and `.md` file parsing directly into new documents.
- **Document Sharing**: Granular `READ` and `EDIT` permissions.
- **Strict Authorization**: Service-layer isolated permission boundaries.

## Database & Data Persistence
This project defaults to **PostgreSQL** in both development and production (using Neon or Docker).

### Switching to SQLite (Local Dev Only)
If you prefer to run a lightweight local setup without Docker or a cloud database:
1. Open `backend/prisma/schema.prisma`
2. Change `provider = "postgresql"` to `provider = "sqlite"`
3. Open `backend/.env` and set: `DATABASE_URL="file:./dev.db"`
4. Run `npx prisma migrate dev --name init` to generate the new SQLite database.

## Screenshots
Please see `docs/screenshots/` for visual references of:
- `login.png`, `dashboard.png`, `editor.png`, `share.png`, `upload.png`

## Seed Users
For easy reviewer evaluation, you can log in immediately with:
- **Alice**: `alice@example.com` / `Password123!`
- **Bob**: `bob@example.com` / `Password123!`

## Getting Started (Local Development)

To run the project locally without Docker, follow these steps:

### 1. Prerequisites
- Node.js (v20+ recommended)
- A running PostgreSQL instance (or switch to SQLite as described above)

### 2. Environment Setup
Create the required environment files based on the `.env.example` (or provided configurations).

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/ajaia?schema=public"
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
FRONTEND_URL=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start the Backend
Open a terminal and run:
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
The backend will start on `http://localhost:5000`.

### 4. Start the Frontend
Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:3000`.

## Quick Setup (Docker Production Mode)
The application includes a production-ready Docker configuration. Ensure Docker is installed, then from the root:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md): System architecture and data flow.
- [AI_WORKFLOW.md](./AI_WORKFLOW.md): How AI accelerated this project.
- [DECISIONS.md](./DECISIONS.md): Engineering justifications.
- [API.md](./API.md): Endpoint payloads.
- [ENV.md](./ENV.md): Environment configs.

## Testing
Run the comprehensive backend integration test suite:
```bash
cd backend
npm install
npm run test
```

## Future Improvements
- WebSockets/Yjs integration for true real-time multiplayer editing.
- Full End-to-End Cypress test coverage.
