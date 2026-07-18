# AI Workflow & Collaboration

This assessment heavily evaluated my ability to integrate AI into my software engineering lifecycle. This document outlines exactly how AI was leveraged to accelerate development, improve code quality, and make architectural decisions.

## AI Tools Used

- **Agentic Coding Assistant**: Google Antigravity(Gemini 3.1 pro, claude sonnet 4.6) natively integrated into the IDE.
- **Role**: Pair-programming partner, boilerplate generator, code reviewer.

## What AI Generated

- **Boilerplate**: Docker Compose configurations, standard Express setups, and Shadcn UI initializations.
- **Data Models**: The initial `schema.prisma` models (though heavily refined by human oversight).
- **Unit Tests**: Generated repetitive Vitest integration test assertions using Supertest.

## What I Rewrote & Adjusted

- **Authorization Boundaries**: The AI initially suggested placing permission checks directly in the Express Controllers. I explicitly rejected this and enforced moving all authorization checks (e.g., `documentPermissionService`) strictly into the Service layer to ensure controllers remain thin and business logic is centralized.
- **Frontend File Uploads**: AI initially struggled with `react-dropzone` event types inside Shadcn dialogs. I stepped in to correctly wire the event handlers and the `FormData` boundary.
- **Editor Autosaving**: AI suggested a simple `setInterval` for autosave. I rewrote this to use a custom debounced Zustand hook combined with React Query mutations to avoid spamming the backend with HTTP requests.

## How AI Accelerated Development

1. **Context Management**: By utilizing an agent that reads the entire codebase in real-time, I didn't need to copy-paste context. I could say "Update the sharing permissions to match the Document DTO" and it understood the entire dependency tree.
2. **Velocity**: Generating standard CRUD services and React Query hooks took seconds instead of hours.
3. **Refactoring**: When shifting from generic layered architecture to feature-based architecture (e.g., moving `src/controllers/auth` to `src/modules/auth`), the AI reliably updated all import paths project-wide.

## Verification Protocol

- No AI code was committed without strict compilation checks (`tsc --noEmit`).
- If an AI proposed a security-sensitive change (e.g., JWT cookie settings), I manually verified `HttpOnly`, `SameSite`, and `Secure` attributes.
