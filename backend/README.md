# Sadhya ecommerce backend

React remains the storefront; `Sadhya.Api` is an ASP.NET Core 10 API using Identity, Entity Framework Core, and a persistent database. Product categories remain the existing twelve categories. Products, customers, addresses and orders are database-backed. There are no public admin-registration endpoints or default passwords.

## Run locally

Requirements: Node.js 22.12+ (or 24+), npm, .NET 10 SDK. SQLite is the zero-setup development default; SQL Server is supported through configuration.

From the repository root, in PowerShell:

```powershell
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:ASPNETCORE_URLS = "http://localhost:5050"
$env:BootstrapAdmin__Email = "your-admin-email@example.com"
$env:BootstrapAdmin__Password = Read-Host "Choose a strong admin password"
dotnet run --project backend/Sadhya.Api
```

Choose a unique password with at least 10 characters, uppercase, lowercase, digit and symbol. This creates the admin account on first startup (or grants the role to the configured existing account). No credentials belong in git. Remove the two `BootstrapAdmin__*` variables after initial setup. Bootstrap does not reset an existing account's password.

In a second terminal:

```powershell
npm ci
npm run dev
```

Vite proxies `/api` to `http://localhost:5050`, so cookies and CSRF protection work on the same origin. Open the URL printed by Vite.

1. Log in with the configured administrator and open **Admin**.
2. Click **Import existing products** once to copy the existing TypeScript catalog into an empty database. Older source records with blank descriptions use their tagline/name; default prices are aligned with the first pack size already shown by the storefront. Review this imported content. Imported stock is **zero**: enter real stock quantities before accepting orders. Public catalog images use stable `/catalog/` paths.
3. Edit names, descriptions, prices, pack sizes, stock, image URLs, benefits, nutrition and visibility. Stock is counted as packs across all variants, not grams. Use HTTPS image URLs or storefront-relative paths; image uploads are not included yet.
4. Customers can register, log in, save/remove addresses, and check out with cash on delivery. `/account` shows order history. Admin order statuses progress Pending → Confirmed → Shipped → Delivered.

## SQL Server

Set these before starting the API, using a **new dedicated database**:

```powershell
$env:DatabaseProvider = "SqlServer"
$env:ConnectionStrings__Store = "Server=localhost;Database=SadhyaStore;Trusted_Connection=True;TrustServerCertificate=True"
dotnet run --project backend/Sadhya.Api
```

The example uses local Windows integrated authentication. Use encrypted connections and a least-privileged database login on hosted SQL Server. Switching providers does not migrate existing SQLite data.

`EnsureCreatedAsync` initializes a new database. Introduce EF Core migrations before changing any deployed schema; it does not upgrade an existing schema. Back up production data before rollout. SQL Server configuration compiles but integration tests currently run against SQLite.

## Deployment

The current Cloudflare frontend cannot run .NET itself. Host the API separately (for example Azure App Service) with SQL Server/Azure SQL, then configure `STORE_API_ORIGIN` in the Cloudflare Worker's environment to the API's **HTTPS origin**, e.g. `https://your-api.example.com`. `src/server.ts` forwards `/api/*` to that origin with cookies and CSRF headers. The development Vite proxy remains local only. Do not put API secrets in `VITE_*` variables.

Set `AllowedHosts` to the API hostname, `DatabaseProvider=SqlServer`, the connection string, and `ASPNETCORE_ENVIRONMENT=Production` on the API host. Configure admin bootstrap via host secrets for initial setup, then remove it. Use HTTPS on the storefront and API. Persist ASP.NET Data Protection keys across restarts/replicas so encrypted login cookies survive deployments. Configure real client IP forwarding with trusted proxies before relying on per-client rate limits behind Cloudflare. No deployment or production database changes are performed by this branch.

For a different frontend host, route `/api/*` to the API under the same public origin; no permissive cross-origin CORS is enabled. Do not expose a cross-origin cookie-login frontend without revisiting authentication and CSRF settings.

## Validation

```powershell
dotnet build backend/Sadhya.Api
python tests/api_smoke.py
npm run build
npx tsc --noEmit
```

The smoke test launches a disposable API/database with random test credentials and checks registration, cookies, CSRF, admin authorization, private addresses/orders, server-calculated prices, variants, stock, duplicate submission protection and order transitions. It never targets a running store.

## Scope and follow-up

This is an initial ecommerce workflow, not a completed commerce platform. Cash on delivery is the only payment method and no delivery fee is currently added. Delivery-zone restrictions, tax/shipping rules, cancellation/refunds, per-variant inventory, email verification/password reset, payment gateway integration, image uploading, customer management and operational monitoring remain follow-up work. No email/SMS or WhatsApp order notification is sent; admins view received orders in the dashboard. Dashboard order list currently shows the latest 500 orders; pagination is future work. Before launch, verify business rules, SQL Server behavior, backups and the deployment end to end.
