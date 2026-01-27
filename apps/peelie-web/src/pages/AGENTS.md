# pages — route-level composition only

## What belongs here

- Route components and route-only UI wrappers
- Wiring widgets/features into a screen
- Minimal state: only for view composition (tabs, local UI toggles)

## Rules

- Pages must not contain reusable business logic.
- If logic is reusable -> move down to `widgets`/`features`/`entities`.
- Pages should not call low-level APIs directly; go through entities/features patterns.
