# CLAUDE.md — agent working context for buildchange.org-app

You are building the Nepal Aid (LivaApp) mobile app and its serverless backend.
**Read `DEVELOPER_BOOK.md` before writing code. Obey it.**

## Hard rules (MUST)
1. The mobile app never connects to PostgreSQL directly — REST only.
2. Never hardcode secrets — DB creds come from Secrets Manager / env.
3. All client geometry is SRID 4326, serialized as plain numbers.
4. Preserve the existing UX — rebuild, never redesign.
5. TypeScript only; functional components; async/await; max 200 lines/component.
6. Centralize REST in `app/src/services`; components never call axios directly.
7. Any new architectural decision → add an ADR to Developer Book §4 before implementing.

## Layout
- `app/` — React Native (Expo, TS). Runs on MSW-style mock adapter when `EXPO_PUBLIC_API_BASE_URL` is empty.
- `backend/` — Lambda handlers (`src/handlers`), shared `src/lib`, SQL view `src/sql`, SAM `template.yaml`.
- `openapi.yaml` — the API contract. Keep it in sync with handlers.

## When unsure, ask. Prefer readability. Document public functions. Prepare for offline sync.

## Keep in sync
The damage-group bands appear in three places and MUST match:
`app/src/utils/damage.ts`, `backend/src/lib/damage.ts`, `backend/src/sql/locations.sql`.
See Developer Book §15.3.
