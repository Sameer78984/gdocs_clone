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

## Screenshots
Please see `docs/screenshots/` for visual references of:
- `login.png`, `dashboard.png`, `editor.png`, `share.png`, `upload.png`

## Seed Users
For easy reviewer evaluation, you can log in immediately with:
- **Alice**: `alice@example.com` / `password123`
- **Bob**: `bob@example.com` / `password123`

## Quick Setup (Docker)
Ensure Docker is installed, then from the root:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

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
- Migration to PostgreSQL for production deployments.
- Full End-to-End Cypress test coverage.
