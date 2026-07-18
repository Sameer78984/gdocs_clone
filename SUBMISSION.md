# Submission Notes

Thank you for reviewing my assessment. This project implements all requested requirements with an emphasis on clean architecture, maintainability, and production-oriented engineering practices.

## How to Review

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### 3. Configure environment variables

Create the required `.env` files by following the provided `.env.example` files.

### 4. Run the backend

```bash
cd backend
npm run dev
```

### 5. Run the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

### 6. Open the application

Visit:

```
http://localhost:3000
```

### 7. Test the application

You may register a new account or use the seeded demo account:

**Email:** alice@example.com

**Password:** password123

---

# Highlights

- **Clean Architecture** — Feature-based modular structure with clear separation of concerns.
- **Thin Controllers** — Controllers handle only HTTP orchestration while services encapsulate business logic.
- **Security** — JWT authentication using secure HttpOnly cookies instead of localStorage.
- **Validation** — Zod validation at every API boundary.
- **Persistence** — PostgreSQL with Prisma ORM.
- **Rich Text Editing** — Tiptap editor supporting headings, bold, italic, underline, numbered lists, and bullet lists.
- **User Experience** — Debounced autosave, optimistic UI updates, loading states, empty states, and toast notifications.
- **Documentation** — Comprehensive project documentation covering architecture, API, environment configuration, engineering decisions, and AI workflow.

---

# Testing

Backend integration tests cover:

- Authentication
- Registration & Login
- Document CRUD
- Sharing
- Uploads
- Permission checks

Run the backend test suite:

```bash
cd backend
npm install
npm run test
```

---

# If Given More Time

Some enhancements I would prioritize next include:

- Real-time collaboration using WebSockets/Yjs
- Collaborative cursors and presence indicators
- Document version history
- Comments and suggestion mode
- Export to PDF and Markdown
- Additional end-to-end testing
- CI/CD improvements for automated deployments

---

Thank you for taking the time to review my submission. I appreciate your consideration and hope you enjoy exploring the application.
