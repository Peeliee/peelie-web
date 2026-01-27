# entities — domain building blocks

## What belongs here

- Domain types (`model/`), entity API (`api/`), entity UI (`ui/`)
- Entity hooks are allowed if they are entity-scoped (not feature workflows)

## Rules

- Entities can depend on `shared` only.
- Do not include cross-entity orchestration here (that is `features`).
- Keep API and query keys co-located with the entity (you already do this with `*.queries.ts`).
- UI should be reusable across multiple features/pages.
