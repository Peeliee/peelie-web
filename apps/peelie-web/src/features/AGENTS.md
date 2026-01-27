# features — user interactions / use-cases

## What belongs here

- UI + hooks + small libs that implement a user action flow
  (e.g., onboarding answering logic, auth code handling, typed text effect)

## Rules

- Features can depend on `entities` and `shared`.
- Do not create "mega features" that become mini apps.
- If logic needs cross-feature composition -> move composition up to `widgets` or `pages`.
- Avoid storing server state manually; use TanStack Query unless there is a strong reason.
