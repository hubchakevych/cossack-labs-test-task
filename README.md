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
- **Axios** — HTTP client
- **React Router** — routing and URL query params

## FSD structure

```
src/
├── app/                 # App layer — entrypoint, styles, global routes, app stores
│   ├── entrypoint/
│   ├── styles/
│   ├── store/
│   └── routes/
├── shared/              # Shared layer — reusable ui, api, lib, config
│   ├── ui/
│   ├── api/
│   ├── lib/
│   └── config/
├── entities/            # Domain entities (product, user)
│   ├── product/         # Product API, model types, store, hooks
│   └── user/
├── features/            # User interactions/use-cases
│   ├── auth/
│   ├── add-product/
│   ├── edit-product/
│   ├── delete-product/
│   └── products-list-controls/  # Search/filter/load-more controls
├── widgets/             # Large UI blocks composed from features/entities
│   ├── header/
│   └── products-table/
└── pages/               # Route-level pages
    ├── auth/
    └── home/
```

Import aliases: `@/app/*`, `@/shared/*`, `@/entities/*`, `@/features/*`, `@/widgets/*`, `@/pages/*`.

## Product list behavior

Product list on Home page supports:

- search
- sorting by table columns (`title`, `price`, `stock`, `rating`)
- category filtering
- incremental loading (`Show more`)

All list state is synced with browser query params:

- `q` — search term
- `category` — selected category
- `sortBy` — sort field
- `order` — sort order (`asc` / `desc`)
- `take` — page size
- `skip` — offset

Example:

`/home?q=phone&category=smartphones&sortBy=price&order=asc&take=20&skip=0`

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npx tsc --noEmit` — type check
