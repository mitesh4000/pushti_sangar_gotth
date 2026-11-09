# Pusti Shangar

Pusti Shangar is a three-application monorepo:

| Workspace | Application | URL in development |
| --- | --- | --- |
| `client` | Customer storefront (React + Create React App) | http://localhost:3000 |
| `adminpanel` | Admin / back-office panel (React + Create React App) | http://localhost:3001 |
| `server` | REST API (Express + Prisma + SQLite) | http://localhost:5000 |

The two React applications stay independent. The root `package.json` only
orchestrates them and the API with npm workspaces.

> Migrating from the old MongoDB/Mongoose backend? See
> [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for the model mapping and
> compatibility details.

## Requirements

- Node.js `>= 18.18` (tested with Node 26)
- npm 7+ (tested with npm 12)

The repository contains a root `.npmrc` with `legacy-peer-deps=true`. The admin
panel still uses several React 16-era libraries whose peer ranges do not accept
React 18, even though the app builds and runs correctly.

## Quick start

From the repository root:

```bash
npm install
```

Create the local environment files once, using
[`.env.example`](./.env.example) as the reference. The two frontends only need
the API URL:

```bash
printf 'REACT_APP_BASE_URL=http://localhost:5000\n' > client/.env
printf 'REACT_APP_BASE_URL=http://localhost:5000\n' > adminpanel/.env
```

`server/.env` must contain at least:

```dotenv
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=change-me-development-only
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

Then create the SQLite database and seed it:

```bash
npm run db:migrate
npm run db:seed
```

Start everything at once:

```bash
npm run dev
```

Expected output is prefixed by `[server]`, `[client]`, and `[admin]`. The admin
panel can take around 90–100 seconds to compile on a cold cache.

## Root commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs all workspaces and generates the Prisma client. |
| `npm run dev` | Runs server, customer storefront, and admin panel concurrently. |
| `npm run dev:client` | Runs only the customer storefront on port 3000. |
| `npm run dev:admin` | Runs only the admin panel on port 3001. |
| `npm run dev:server` | Runs only the API with nodemon on port 5000. |
| `npm run build` | Production build for both React apps and `prisma generate`. |
| `npm run start` | Starts the API without nodemon. |
| `npm run lint` | Runs ESLint in the admin panel. |
| `npm run db:migrate` | Generates the Prisma client and applies committed migrations. |
| `npm run db:seed` | Runs the idempotent seed script. |
| `npm run db:reset` | Drops and recreates the database, then seeds it. |
| `npm run db:studio` | Opens Prisma Studio for the SQLite database. |

### Individual workspaces

```bash
npm --workspace client run start
npm --workspace adminpanel run start
npm --workspace server run dev
```

## Environment variables

A single reference file lives at `.env.example`. Real `.env` files are
gitignored and must not be committed.

### `server/.env`

| Variable | Purpose | Default / notes |
| --- | --- | --- |
| `PORT` | API port | `5000` |
| `NODE_ENV` | Runtime mode | `development` |
| `DATABASE_URL` | Prisma SQLite URL | `file:./dev.db`, resolved to `server/prisma/dev.db` |
| `JWT_SECRET` | Signs customer/user JWTs | Use a long random value outside local development |
| `FRONTEND_URL` | Storefront URL used in password-reset links | `http://localhost:3000` |
| `ADMIN_URL` | Admin URL used in password-reset links | `http://localhost:3001` |
| `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` | Optional SMTP delivery | Leave empty to skip email delivery |
| `CORS_ORIGINS` | Comma-separated origin allow-list | Empty keeps the original permissive CORS behavior |

### `client/.env` and `adminpanel/.env`

| Variable | Purpose |
| --- | --- |
| `REACT_APP_BASE_URL` | API origin, normally `http://localhost:5000` |

## Database

- **Provider:** SQLite through Prisma.
- **Schema:** [`server/prisma/schema.prisma`](./server/prisma/schema.prisma).
- **Migrations:**
  [`20261109064924_init`](./server/prisma/migrations/20261109064924_init)
  (tables and unique constraints) and
  [`20261109072516_add_relation_indexes`](./server/prisma/migrations/20261109072516_add_relation_indexes)
  (foreign-key and query indexes).
- **Database file:** `server/prisma/dev.db` (gitignored).
- **Seed:** [`server/prisma/seed.js`](./server/prisma/seed.js).

The seed is safe to run repeatedly. It upserts roles, users, customers,
catalog data, content, gallery entries, coupons, orders, carts, and the invoice
counter. Passwords are hashed with `bcryptjs`.

### Seeded logins

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@pushtishangar.com` | `Admin@123` |
| Manager | `manager@pushtishangar.com` | `Manager@123` |
| Support user | `user@pushtishangar.com` | `User@123` |
| Customer | `aarohi@example.com` | `Customer@123` |

Additional seeded customers use `Customer@123`:
`vihaan@example.com`, `diya@example.com`.

## API overview

The API is served from port 5000. Useful entry points:

| Path | Description |
| --- | --- |
| `GET /` | Health response (`Home Page`) |
| `/api/*` | Authentication, users, roles, dashboard, payment routes |
| `/category`, `/subcategory`, `/subsubcategory` | Catalog hierarchy |
| `/product` | Products and variants |
| `/customer` | Customer registration, login, cart, wishlist |
| `/orders` | Order creation, history, reports |
| `/content`, `/banner`, `/blog`, `/gallery` | CMS content |
| `/stocks`, `/gst`, `/dailyrates` | Inventory and pricing |
| `/coupons`, `/material`, `/season`, `/color`, `/size` | Master data |
| `/uploads/*` | Uploaded images (local filesystem) |

Response payloads preserve the original `_id` field expected by both frontends,
while also returning `id`. See `server/utils/serialize.js`.

## Production build

```bash
npm run build
```

This creates `client/build`, `adminpanel/build`, and regenerates the Prisma
client. Serve each `build` directory with your preferred static host and point
`REACT_APP_BASE_URL` at the deployed API before building.

## Project layout

```text
.
├── adminpanel/            # Admin React app (port 3001)
│   ├── public/
│   └── src/
├── client/                # Customer React app (port 3000)
│   ├── public/
│   └── src/
├── server/                # Express API
│   ├── controllers/
│   ├── lib/prisma.js      # Shared Prisma client
│   ├── middlewares/
│   ├── prisma/            # Schema, migration, seed, dev.db
│   ├── routes/
│   ├── uploads/           # Local image uploads
│   ├── utils/
│   ├── app.js             # Express app export
│   └── server.js          # HTTP listener and Prisma lifecycle
├── .env.example
├── .gitignore
├── .npmrc
├── package.json           # npm workspaces and root scripts
└── README.md
```

## Troubleshooting

- **`@prisma/client` is missing after install.** npm may skip lifecycle
  scripts. Run `npm --workspace server run build` to regenerate the client.
- **`npm run db:seed` fails with “table does not exist”.** Run
  `npm run db:migrate` first, or use `npm run db:reset`.
- **Admin dev server takes a long time.** The first webpack compile is slow;
  subsequent compiles are cached.
- **Build warns about unused variables, hooks, or Sass deprecations.** These
  are pre-existing warnings from both React applications and do not fail the
  build.
- **Ports are already in use.** Change `PORT` in `server/.env` and the
  `PORT=...` values in the `start` scripts of `client`/`adminpanel`, then update
  `REACT_APP_BASE_URL`/CORS settings as needed.
# pushti_sangar_gotth
# pushti_sangar_gotth
