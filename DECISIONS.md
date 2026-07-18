# Engineering Decisions

This document justifies the core technical choices made during the development of the Ajaia Document Editor.

## 1. Why Next.js (App Router) instead of React (Vite)?
Next.js provides a robust routing system, SSR out of the box (for potential SEO or initial load performance), and built-in optimizations. Although this project relies heavily on Client Components due to the interactive nature of a rich text editor, having Next.js allows seamless API route integration in the future, simpler layout management with `layout.tsx`, and a proven production-ready deployment model on platforms like Vercel.

## 2. Why Express instead of NestJS?
For a focused MVP or assessment, Express provides the perfect balance of flexibility and speed. NestJS often requires significant boilerplate (modules, providers, decorators) that obscures the core logic for a project of this size. By implementing a strict feature-based architecture (Services, Controllers, Routers) over Express, we achieve the organizational benefits of NestJS without the overhead.

## 3. Why Prisma?
Prisma provides unmatched type-safety and developer experience. The auto-generated Prisma Client ensures that our database queries are strictly typed against our Prisma schema. This eliminates an entire class of runtime errors associated with raw SQL or traditional ORMs like TypeORM or Sequelize.

## 4. Why React Query?
Managing remote server state (documents, shares) inside a global state manager like Redux or Zustand leads to complex boilerplate involving `isFetching`, `error`, and caching logic. React Query solves this natively, handling caching, background updates, and invalidation effortlessly. 

## 5. Why Zustand for the Editor State?
While React Query handles server state, the Editor needs highly responsive, transient client state (e.g., "is saving", "character count", "last saved timestamp"). Zustand provides a boilerplate-free, highly performant store that can be accessed from outside React components (useful for autosave triggers in utility functions).

## 6. Why Tiptap?
Tiptap is a headless wrapper around ProseMirror. It provides the extreme reliability of ProseMirror's document model while allowing complete control over the UI using our own Shadcn components. Traditional editors (like Quill or TinyMCE) dictate the UI, which would compromise the custom, premium aesthetic required for this assessment.

## 7. Why JWT in HttpOnly Cookies?
Storing JWTs in `localStorage` makes them vulnerable to Cross-Site Scripting (XSS) attacks. By setting the JWT as an `HttpOnly` cookie directly from the backend, the token is automatically attached to requests without exposing it to the frontend Javascript engine, vastly improving security.

## 8. Why Debounced Autosave?
Executing an API call on every keystroke (`onChange`) would overwhelm the backend and Database. By wrapping the save trigger in a 1500ms debounce, we batch changes together. The Zustand store keeps track of the "Saving..." vs "Saved" UI states instantly, masking the network latency from the user.
