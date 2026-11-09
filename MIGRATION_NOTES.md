# MongoDB → SQLite Migration Notes

This document records how the Pusti Shangar backend moved from
MongoDB/Mongoose to SQLite with Prisma, what stayed compatible, and what must be
reviewed before deploying.

## Summary

- The API is still Express and the route paths are unchanged.
- Mongoose was removed completely; all data access goes through Prisma.
- SQLite stores the database at `server/prisma/dev.db` (gitignored).
- The schema and migrations live in `server/prisma/`.
- API serializers still expose `_id`, so the existing React apps did not need a
  response-shape rewrite.
- Sample data is created by an idempotent seed script.

## Model mapping

The original Mongo/Mongoose models were removed. Their data now lives in the
following Prisma models:

| Original Mongo/Mongoose model | Prisma model / table | Notes |
| --- | --- | --- |
| `User` | `User` | Roles moved to the `UserRole` join table. |
| `Role` | `Role` | `permissions` array stored as JSON text. |
| — (embedded roles array) | `UserRole` | Explicit many-to-many relation with cascade delete. |
| `Customer` | `Customer` | `address`, `paymentMethods`, and `preferences` stored as JSON text. |
| — (embedded cart items) | `CartItem` | One row per customer/product pair. |
| — (embedded wishlist) | `WishlistItem` | One row per customer/product pair. |
| `Product` | `Product` | Category/subcategory/GST/weight-type references are FKs. |
| `Category` | `Category` | Legacy IDs preserved for dashboard hard-coding. |
| `SubCategory` | `SubCategory` | `Category` field serialized back from `categoryId`. |
| `SubSubCategory` | `SubSubCategory` | `Category` and `SubCategory` serialized back. |
| `Gst` | `Gst` | |
| `PriceUpdate` | `PriceUpdate` | Daily gold/silver rate data. |
| `Color`, `Material`, `Season`, `Size` | Same names | Master data. |
| `Order` | `Order` | Customer and coupon are FKs. |
| — (embedded order products) | `OrderItem` | One row per product line. |
| `Cart` | `Cart` | |
| — (embedded cart products) | `CartProduct` | One row per product in a cart. |
| `Stock` | `Stock` | `ProductId` serialized back from `productId`. |
| `Banner` | `Banner` | |
| `BlogCategory` | `BlogCategory` | |
| `Blog` | `Blog` | `blogCategory` and `blogCategoryData` serialized back. |
| `Contact` | `Contact` | |
| `Content` | `Content` | Legacy content IDs preserved. |
| `Coupon` | `Coupon` | |
| `GalleryCategory` | `GalleryCategory` | |
| `GalleryDetails` | `GalleryDetails` | |
| `LatestInvoice` | `LatestInvoice` | Legacy counter ID preserved. |
| `Subscribe` | `Subscribe` | |
| `Token` | `Token` | User/customer tokens are separate rows. |

MongoDB embedded arrays and objects became either child tables (cart items,
wishlist, order lines, cart products, user roles) or JSON-encoded text columns
(`tags`, `imageGallery`, `filters`, `otherVariations`, `address`,
`paymentMethods`, `preferences`, `permissions`). Serializers parse those fields
back into arrays/objects before sending responses.

### Migrations and indexes

Two migrations are committed:

1. `20261109064924_init` creates all tables, foreign keys, and unique indexes.
2. `20261109072516_add_relation_indexes` adds indexes for relation columns and
   common filters (catalog FKs, order status/customer/date, cart/order line
   relations, token lookups, soft-delete flags, and coupon expiry).

## IDs and response compatibility

- Prisma IDs are strings. Most records use `cuid()` by default.
- Records hard-coded by the frontends keep their legacy 24-hex IDs:
  - dashboard categories (`650837d4…`, `650837fa…`, `65083812…`, etc.);
  - client-managed content documents (`65129936…`, `6543bb26…`, etc.);
  - the invoice counter `652f8866c509652ac19e0e8b`.
- `server/utils/serialize.js` adds `_id` to every serialized record while also
  keeping `id`. Existing frontend code that reads `_id` continues to work.
- Response-only fields are reconstructed:
  - Product `prices.original`, `prices.discounted`,
    `prices.calculatedPrice`, `stock.quantity`, `OtherVariations`,
    `categoryData`, and `gstData`.
  - Subcategory `Category` / `CategoryTitle` and sub-subcategory
    `Category`, `SubCategory`, `CategoryTitle`, `subCategoryTitle`.
  - Order `customer`, `couponCode`, and `products` (from `OrderItem`).
  - Customer `orderHistory`, `cartItems`, and `wishlist`.
  - Stock `ProductId`.
  - Blog `blogCategory`, `blogCategoryData`.
  - Role `permissions` as an array.
  - User `roles` as role-name strings.
- User and customer serializers strip `password`; do not add it back when
  adding new endpoints.

## Backend refactor

- `server/app.js` now only builds and exports the Express app.
- `server/server.js` is the process entry point. It connects Prisma, starts the
  HTTP listener, and disconnects Prisma on `SIGINT`/`SIGTERM`.
- `server/lib/prisma.js` exports a singleton Prisma client. The singleton is
  cached on `globalThis` outside production so nodemon reloads do not create
  multiple clients.
- `server/db.js` is now a small compatibility helper that returns the shared
  Prisma client. The old Mongo connection code and credentials were removed.
- Every controller under `server/controllers/` uses Prisma queries. MongoDB
  aggregation pipelines were replaced with Prisma queries plus JavaScript
  aggregation for dashboard/report endpoints.
- `server/models/` (all Mongoose models) was deleted.
- Dependencies removed from `server/package.json`: `mongoose`, `mongodb`, and
  the native `bcrypt` package. Passwords now use `bcryptjs`; existing bcrypt
  hashes remain compatible.

## Packages and build changes

- Root npm workspaces: `client`, `adminpanel`, `server`.
- The actual folder previously named `admin client` was renamed to
  `adminpanel`. Any local scripts, IDE workspaces, or deployment paths that
  refer to the old name must be updated.
- `node-sass` was replaced by the pure-JavaScript `sass` package.
- The admin panel pins `bootstrap` to `5.2.3`; the Velzon theme SCSS does not
  build correctly against Bootstrap 5.3.
- Bootstrap SCSS imports now use package paths (`bootstrap/...`) so
  `sass-loader` resolves them from the hoisted `node_modules`.
- Admin-only legacy libraries keep React 16-era peer ranges, so the root
  `.npmrc` sets `legacy-peer-deps=true`.
- `mongoose`/`mongodb` and unused React Native packages were removed from the
  workspaces.
- Nested workspace lockfiles were removed; the root `package-lock.json` is the
  single lockfile.

## Environment changes

| Before | After |
| --- | --- |
| `MONGO_URI` / Mongo connection string in `server/db.js` | `DATABASE_URL` in `server/.env` |
| Untracked JWT secret fallback | `JWT_SECRET`; local fallback remains `"everything"` if unset |
| No CORS allow-list | Optional `CORS_ORIGINS` comma-separated allow-list |
| Frontend API URL | `REACT_APP_BASE_URL` unchanged |

`DATABASE_URL="file:./dev.db"` is resolved relative to
`server/prisma/schema.prisma`, so the database is created at
`server/prisma/dev.db`.

## Breaking changes and caveats

1. **Existing Mongo data is not migrated automatically.** The project ships
   with seed data only. A production cut-over needs an export/transform/import
   step for each collection table above.
2. **IDs are no longer guaranteed to be 24-character hex strings.** Seed data
   preserves the IDs the frontends hard-code, but newly created records use
   `cuid()`. Code that validates ObjectId format will reject new IDs.
3. **Relational constraints are stricter.** Unique indexes now exist for user
   email, customer email, role name, coupon name, contact email, subscribe
   email, and customer/product pairs in carts and wishlists. Data that was
   duplicated in Mongo will fail to import.
4. **Foreign-key behavior is explicit.** Deleting a customer cascades to cart
   items, wishlist rows, and tokens; products set null on order items/stocks;
   orders cascade to order items. Review any workflow that relied on Mongo's
   lack of foreign keys.
5. **Mongo query features are gone.** ObjectId casting, `$regex`, aggregation
   stages, `$lookup`, text indexes, and collation-specific matching are not
   available. The controllers use Prisma `contains`, relations, and in-process
   aggregation instead.
6. **SQLite is a single-file, single-writer database.** It is suitable for
   local development and small deployments, but not for horizontal scaling or
   high-concurrency writes. Use a Prisma-supported server database if those are
   requirements.
7. **Uploads remain local filesystem files.** `server/uploads/` is still served
   by Express; there is no GridFS replacement. Multi-instance deployments need
   shared storage or object storage.
8. **Password reset email is optional.** Without SMTP settings, reset flows
   that send email will not deliver messages.
9. **`db:reset` is destructive.** It drops the SQLite database, reapplies
   migrations, and reseeds it.
10. **Legacy credentials must be treated as exposed.** The original
    `server/db.js` contained a real-looking Atlas connection string before it
    was replaced. If that file was ever committed or shared, rotate the
    database user's credentials; deleting the file is not enough.
11. **Build warnings are pre-existing.** Both Create React App projects emit
    unused-variable, hook-dependency, accessibility, and Sass deprecation
    warnings. They do not fail `npm run build` in a normal local shell.

## Fresh setup after cloning

```bash
npm install
# create server/.env, client/.env, adminpanel/.env from .env.example
npm run db:migrate
npm run db:seed
npm run dev
```

If npm skips lifecycle scripts, regenerate the Prisma client explicitly:

```bash
npm --workspace server run build
```

## Manual steps before production

1. Set a strong `JWT_SECRET`; never use the `"everything"` fallback.
2. Configure `EMAIL_*` if password-reset delivery is required.
3. Set `CORS_ORIGINS` to the deployed storefront/admin origins.
4. Point `DATABASE_URL` at a backed-up, access-controlled database file and
   schedule backups.
5. Set `REACT_APP_BASE_URL` before building either frontend.
6. If importing real Mongo data, write and test an ETL script, preserve the
   legacy IDs needed by the UI, and deduplicate before applying unique indexes.
7. Move `server/uploads/` to durable/shared storage if the API runs on more
   than one instance.
8. Run `npm run build` in CI and smoke-test login, catalog, cart, orders, and
   admin CRUD against the migrated database.

## Verification performed

The following were exercised locally on Node 26 / npm 12:

- Root `npm install` completed (1,887 packages).
- `npm run db:migrate` applied the initial migration.
- `npm run db:seed` completed and remained successful on a second run.
- `npm run dev` brought up ports 3000, 3001, and 5000 simultaneously; all
  returned HTTP 200.
- Admin and customer login, catalog/category reads, dashboard data, orders,
  roles, content, users, colors, and coupons were exercised through the API.
- `npm run build` completed for `client`, `adminpanel`, and the Prisma client.
