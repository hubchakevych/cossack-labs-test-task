# Admin Dashboard

Vite + React + TypeScript app with [Feature-Sliced Design](https://feature-sliced.design/) (FSD) architecture.

## Tech stack

- **Vite** — build tool
- **TypeScript** — typing
- **React** — UI
- **MobX** — state management
- **Tailwind CSS** — styling
- **Radix UI** — components
- **Zod** — schema validation
- **react-hook-form** + **@hookform/resolvers** — forms

## FSD structure

```
src/
├── app/                 # App layer — entrypoint, styles, store, routes
│   ├── entrypoint/
│   ├── styles/
│   ├── store/
│   └── routes/
├── shared/              # Shared layer — ui, api, lib, config
│   ├── ui/
│   ├── api/
│   ├── lib/
│   └── config/
├── entities/            # Business entities
├── features/            # Reusable feature implementations
├── widgets/             # Large self-contained UI blocks
└── pages/               # Full pages (e.g. pages/home)
```

Import aliases: `@/app/*`, `@/shared/*`, `@/entities/*`, `@/features/*`, `@/widgets/*`, `@/pages/*`.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
