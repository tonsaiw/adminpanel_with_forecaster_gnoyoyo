## TAO BIN Forecaster Dashboard

This project bootstraps a Next.js (Pages Router) frontend that will simulate TAO BIN vending machine operations and forecast profit or loss using Bangkok weather data. The stack includes TypeScript, TailwindCSS, React Query, and Zod to emphasize clean architecture and maintainability.

<!-- ใช้ font และ สี จากใน website หลัก -->

### Getting Started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the scaffolded dashboard shell.

### Folder Overview

- `src/pages/` – Routing entry points; `_app.tsx` wires the React Query provider and `index.tsx` hosts the combined admin and forecast dashboard.
- `src/components/` – Presentational building blocks split into `machines/` (CRUD UI) and `dashboard/` (forecast visualizations).
- `src/hooks/` – Reusable React hooks for orchestrating state and data fetching, e.g., `useMachines` and `useWeather`.
- `src/lib/` – Domain-specific utilities for persistence, forecasting, and weather API integration.
- `src/schemas/` – Zod validation schemas to guard form inputs and domain contracts.
- `src/types/` – Shared TypeScript types for machines, weather, and forecast results.
- `src/utils/` – Small, framework-agnostic helpers such as number formatting.
- `src/styles/` – Global TailwindCSS configuration and styles.

Future steps will flesh out business logic, UI components, and automated tests to deliver the complete TAO BIN Forecaster Dashboard experience.
