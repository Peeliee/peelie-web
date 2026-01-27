# PEELIE Monorepo (Root)

This is a pnpm workspace monorepo:

- `apps/peelie-app` (Expo / React Native)
- `apps/peelie-web` (Vite / React)
- `packages/*` (shared libs)

## Non-negotiables

- Use **pnpm** (workspace). Do not use npm/yarn.
- Keep changes minimal and scoped.
- Do not introduce `any` without explicit reason.
- Do not modify `pnpm-lock.yaml` unless dependencies changed.

## Commands (run from repo root)

- Install: `pnpm install`
- Web dev: `pnpm dev:web`
- App dev: `pnpm dev:app`
- Web build: `pnpm build:web`
- Web lint: `pnpm --filter peelie-web lint`
- App lint: `pnpm --filter peelie-app lint`

## Where rules live

- Web rules: `apps/peelie-web/AGENTS.md` (+ `apps/peelie-web/src/AGENTS.md` for FSD)
- RN rules: `apps/peelie-app/AGENTS.md`
- Shared package rules: `packages/*/AGENTS.md`

## When unsure

Stop and ask with: (1) findings (2) risk/impact (3) 2–3 options.
