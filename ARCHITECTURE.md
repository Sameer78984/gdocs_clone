# Architecture Overview

This project implements a clean, feature-driven architecture across both the frontend (Next.js App Router) and backend (Express + Prisma).

## High-Level Architecture
```mermaid
graph TD
    Client[Web Browser] --> |HTTP/REST| API[Express API Gateway]
    API --> |Queries| DB[(SQLite Database)]
    API --> |Auth| JWT[JWT + HttpOnly Cookies]
    
    subgraph Frontend [Next.js App Router]
        Zustand[Zustand State]
        ReactQuery[React Query Cache]
        Components[Shadcn + Tailwind UI]
        Editor[Tiptap Rich Text]
    end

    subgraph Backend [Express Server]
        Routers[Express Routers]
        Controllers[Thin Controllers]
        Services[Business Logic & Permissions]
        Prisma[Prisma ORM]
    end
```

## Feature-Based Folder Structure
Instead of a monolithic layered architecture (e.g. all controllers together, all services together), both codebases group files by **Feature**.

### Backend Features Example: `src/modules/documents`
- `document.schema.ts` (Zod schemas)
- `document.service.ts` (Business logic)
- `document.controller.ts` (Request/Response orchestration)
- `document.routes.ts` (Express routing)

### Frontend Features Example: `src/features/documents`
- `/api/` (Axios calls)
- `/hooks/` (React Query mutations)
- `/components/` (Feature-specific UI)
- `/store/` (Zustand state slices)

## Database Schema
```mermaid
erDiagram
    User ||--o{ Document : owns
    User ||--o{ DocumentShare : receives
    Document ||--o{ DocumentShare : has
    
    User {
        String id PK
        String email
        String name
    }
    Document {
        String id PK
        String title
        String content
        String ownerId FK
    }
    DocumentShare {
        String id PK
        String permission "READ | EDIT"
    }
```
