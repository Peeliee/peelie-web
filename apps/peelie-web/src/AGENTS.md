# src — FSD Constitution (do not violate)

We follow Feature-Sliced Design layers. Import direction is one-way:
app/pages/widgets/features/entities/shared (top -> bottom depends on bottom).

---

## 3) `src/shared/AGENTS.md`

```md
# shared — lowest layer (purity matters)

## What belongs here

- UI primitives / design system components
- utils, constants, config
- base API client (ky), query client setup, socket client scaffolding
- NO domain concepts (no "friend", "quiz", "onboarding" naming here)

## Rules

- No business logic. No feature state machines.
- Exports must be stable and reusable across the app.
- Prefer pure functions; avoid hidden side effects.
- If adding a component, add a Storybook story when it’s a reusable UI piece.
```
