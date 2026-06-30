# buildchange.org-app — Nepal Aid (LivaApp)

Geospatial earthquake damage-assessment app for the 2023 Jajarkot (Nepal) disaster.
Migration from SAP AppGyver → **React Native (Expo) + AWS Serverless + PostgreSQL/PostGIS**.

> Single source of truth: [`DEVELOPER_BOOK.md`](./DEVELOPER_BOOK.md). Read it before contributing.

## Monorepo layout

```
buildchange.org-app/
├── app/        # React Native (Expo, TypeScript) mobile client
├── backend/    # AWS Lambda handlers + SAM (TypeScript)
├── openapi.yaml
└── DEVELOPER_BOOK.md
```

## Architecture (one line)

```
React Native (Expo) → Axios → API Gateway → AWS Lambda → RDS PostgreSQL/PostGIS
```

The mobile app **never** connects to the database directly. REST only.

## Quick start — app

```bash
cd app
nvm use            # Node 22
npm install
cp .env.example .env   # set EXPO_PUBLIC_API_BASE_URL (or leave blank to use MSW mocks)
npx expo start         # press i / a, or scan QR with Expo Go
```

The app runs end-to-end against **mock data (MSW)** with no backend — open it, pick a damage group, browse the list, drill into a building, open the map.

## Quick start — backend

```bash
cd backend
npm install
npm run build
sam build && sam deploy --guided   # needs AWS creds + a DB secret ARN
```

## The five non-negotiable rules

1. The mobile app never connects to PostgreSQL directly — REST only.
2. Never hardcode secrets — DB creds come from Secrets Manager / env.
3. All client geometry is SRID 4326, serialized as plain numbers.
4. Preserve the existing UX — rebuild, never redesign.
5. Every architectural decision is recorded as an ADR in the Developer Book.

## Status

Scaffold `v0.1` — runnable app on mock data; backend handlers + IaC ready to deploy.
Proposal target for buildchange.org: Developer Book §23 phases 1–4.
