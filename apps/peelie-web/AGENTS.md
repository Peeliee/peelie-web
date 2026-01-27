# peelie-web (Vite + React) — Agent Instructions

## Mission

- Keep changes small, verifiable, and aligned with FSD structure under `src/`.
- Prefer deleting/rewriting legacy patterns over patching hacks (this project is being redesigned).

## Commands (run inside `apps/peelie-web`)

- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Storybook: `pnpm storybook`
- Tests: (use repo config) prefer `pnpm test` / `pnpm vitest` only if defined

## Tooling

- React 19, TypeScript
- React Router DOM
- TanStack Query
- HTTP: ky (`src/shared/api/ky.ts`)
- Mocking: MSW (`src/mocks`, worker in `public/mockServiceWorker.js`)
- Storybook lives in `.storybook/` and component stories in `src/stories/`

## Non-negotiables

- No `any` unless explicitly justified.
- Do not reformat unrelated files.
- Do not add dependencies without asking first.
- If touching API calls: update MSW handlers (or explain why not).

## Where rules live

- FSD boundaries: `src/AGENTS.md`
- Layer rules: `src/{shared,entities,features,widgets,pages}/AGENTS.md`
