# widgets — reusable page sections

## What belongs here

- Large UI blocks composed from multiple features/entities
  (e.g., carousels, onboarding step sections)

## Rules

- Widgets can depend on features/entities/shared.
- Widgets must not import from pages.
- Keep widgets UI-focused; business decisions should live in features/entities.
- If a widget becomes route-specific, demote it to `pages/<Route>/ui`.
