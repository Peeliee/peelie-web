# app — application shell

## What belongs here

- Router (`router/`), Providers (`provider/`), global layouts (`layout/`)
- App-level composition and initialization

## Rules

- app can import any lower layer.
- Keep app "thin": no domain logic; just wiring and global concerns.
- Providers should be deterministic; avoid per-render side effects.
