# mocks — MSW only

## Purpose

- Provide deterministic mock responses for local dev, Storybook, and tests.

## Rules

- Keep handlers aligned with real API contracts (types in entities/shared).
- Prefer `handlers/<domain>Handlers.ts` and central export in `handlers.ts`.
- If you change API shape, update mock data + handlers in the same PR.
- Do not leak mocks into production build paths.
