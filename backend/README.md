# Sadhya ecommerce backend

React remains the storefront; `Sadhya.Api` is an ASP.NET Core 10 API using Identity, Entity Framework Core, and a persistent database. Collections are database-backed and editable in Admin → Categories. Products, customers, addresses and orders are database-backed. There are no public admin-registration endpoints or default passwords.

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
3. Edit names, descriptions, prices, pack sizes, stock, image URLs, benefits, nutrition and visibility. Stock is counted as packs across all variants, not grams. Use image uploads, HTTPS image URLs, or storefront-relative paths.
4. Customers can register, log in, save/remove addresses, and check out with cash on delivery. `/account` shows order history. Admin order statuses progress Pending → Confirmed → Shipped → Delivered.

## SQL Server

Set these before starting the API, using a **new dedicated database**:

```powershell
$env:DatabaseProvider = "SqlServer"
$env:ConnectionStrings__Store = "Server=localhost;Database=SadhyaStore;Trusted_Connection=True;TrustServerCertificate=True"
dotnet run --project backend/Sadhya.Api
```

The example uses local Windows integrated authentication. Use encrypted connections and a least-privileged database login on hosted SQL Server. Switching providers does not migrate existing SQLite data.

`EnsureCreatedAsync` initializes a new database. The collections update adds a versioned additive upgrade for existing databases, described below. Plan EF Core migrations for other future schema changes. Back up production data before rollout. SQL Server configuration compiles but integration tests currently run against SQLite.

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

This is an initial ecommerce workflow, not a completed commerce platform. Cash on delivery is the only payment method and no delivery fee is currently added. Delivery-zone restrictions, tax/shipping rules, cancellation/refunds, per-variant inventory, email verification/password reset, payment gateway integration, customer management and operational monitoring remain follow-up work. No email/SMS or WhatsApp order notification is sent; admins view received orders in the dashboard. Dashboard order list currently shows the latest 500 orders; pagination is future work. Before launch, verify business rules, SQL Server behavior, backups and the deployment end to end.

## Collections, image uploads and delivery pins (latest update)

The home page now shows **Our Categories → Handpicked Collections**, in this initial order: Offer Zone, Dry Fruits, Nuts, Spices, Healthy Snacks, Dates, Seeds, Berries, Rice & Millets, Herbal Powders, Oils. Each collection opens its products. The following **Best Selling** section can be curated with the product editor's **Feature in Best Selling** checkbox; until products are selected, it shows the first eight catalog products. This is a merchant-curated display, not sales analytics.

- **Admin → Categories**: add/edit a category, upload its image, and change its display order. Removal requires moving assigned products to a selected replacement category (or removing an empty category). Customers, orders, and products are not deleted.
- **Admin → Products → Edit**: upload the primary image or add gallery images, remove gallery entries, feature a best seller, and optionally also show a product in Offer Zone.
- Uploads accept JPEG, PNG and WebP up to 5 MB each, with raster signatures checked on the API. SVG/HTML uploads are rejected. Images are stored in the database, served through `/api/media/{id}`, and included in database backups. This first version retains uploaded images even if an editor is cancelled or an image reference is removed; storage cleanup/optimization can be added later.
- Existing SQLite and SQL Server databases receive an additive, versioned upgrade on startup (`CatalogUpgrade.cs`) to add Categories, StoreSettings and Media. Existing product category IDs are mapped to the new parent collections once. Existing accounts, addresses and orders are preserved. Start one instance during initial upgrade and back up the database first. SQL Server upgrade statements require schema permissions; SQLite upgrade/preservation is covered by the smoke test. Other future schema changes still require a migration plan.
- The latest source catalog and banners from `main` are retained. Import is still for an empty product database and does not overwrite existing product edits or append missing products automatically. New collections without assigned products show an empty-state message; no sample stock or fake products are inserted.

### Google Maps / delivery location

Customers may attach an optional location pin to an address. Current device location, manual coordinates, and **View on Google Maps** links work without a Google Maps API key. Location permission requires HTTPS or `localhost`; plain HTTP on a phone's LAN address normally cannot use geolocation. A pin supplements the required street address, phone number and PIN code. Coordinates are saved with the address and copied into each order so administrators can open the delivery location. Changing an address later does not alter an existing order's delivery snapshot.

For an interactive Google map (tap to place a pin or drag the marker): enable **Maps JavaScript API**, configure the required Google Cloud billing, and create a browser API key restricted to your frontend origins and the Maps JavaScript API. In CMD before `npm run dev`:

```cmd
set VITE_GOOGLE_MAPS_API_KEY=YOUR_BROWSER_MAPS_KEY
set VITE_GOOGLE_MAPS_MAP_ID=YOUR_MAP_ID
npm run dev
```

`DEMO_MAP_ID` is used for local testing if the map ID is omitted. Configure a real map ID for production. These are frontend build-time variables; set them on the Cloudflare build environment before building/deploying. The browser key is visible by design and must have origin/API restrictions. Do not commit unrestricted keys. The picker does not reverse-geocode or autocomplete street addresses; customers complete those fields themselves. Live Google map loading requires real account configuration and was not verified in this workspace; non-map flows and persisted coordinates are tested.

Cash on delivery remains the checkout method. Razorpay integration is intentionally deferred.

## Checkout and shopping improvements

- New addresses use a required state/union-territory dropdown. Existing saved addresses remain unchanged.
- Checkout includes **Additional order details**, up to 1000 characters, for delivery instructions, preferred times, gift notes or other requests. Notes appear in customer and admin order history and do not imply the store has accepted a special request. The API trims and validates the value.
- Existing databases receive a nullable `Orders.AdditionalDetails` column through `OrderNotesUpgrade.cs` on backend startup. Existing orders have no notes; accounts, stock, addresses and order history remain intact. Back up the database before upgrading, and start one backend instance for the initial schema update. SQLite upgrade/preservation is tested; SQL Server requires runtime verification.
- Regular login now opens Home. Login requested from Checkout returns to Checkout; explicit protected account/admin links retain their destination. The menu includes a labelled Orders icon linking to the order-history section, plus the account icon for saved addresses.
- Product details show **Related Products**, with same-category products first and fallback suggestions from other collections. Category pages show **You May Also Like** without repeating products already listed. Hidden/current products are excluded; stock and featured selection affect ranking. This is a simple catalog recommendation, not personalized tracking.
- A **Need help?** WhatsApp link opens a customer-initiated chat to **9666585143**. It sends nothing automatically and is not a chatbot or WhatsApp Business API integration.
- Additional storefront logic checks: `node tests/storefront_logic.cjs`.

## Homepage slide management and layout

**Admin → Slides** manages the homepage carousel. Upload/replace desktop images and optional mobile images, enter descriptive alt text, use the up/down controls to reorder, toggle visibility, or remove slides. Click **Save changes / Save slides** to publish the full slide list. Images use the same database-backed raster upload service (JPEG/PNG/WebP, max 5 MB each). Up to 30 slides are supported. Removing all slides and saving intentionally hides the carousel; disabled slides remain editable in admin. Unsaved changes can be discarded.

Existing banners are provided as the initial set under stable `/slides/` URLs. After the first save, the database slide settings control the carousel. These settings live in the existing StoreSettings table; this update needs no new table. Public requests only return active slides; admin read/write routes require the Admin role and writes require CSRF verification. Other storefront tabs refresh slide settings about every 30 seconds or on focus. Backups include both saved settings and uploaded image data.

Use wide desktop banners (recommended 8:3) and optionally a 4:3 mobile version. The carousel fills the available screen width with cover-sized images, supports swipe, has arrows and dots overlaid on the image, uses five-second autoplay, and pauses for hover/keyboard focus/reduced-motion preferences. The banner is edge-to-edge with no side padding or maximum-width container. Mobile images keep a consistent carousel height; images with different proportions may be cropped to fill the banner. When no mobile version exists anywhere in the active set, mobile uses the wide desktop aspect ratio.

Header navigation/search/account spacing and product image/title/price/Add-button alignment are updated, admin tabs wrap on small screens, and public floating help/cart buttons are omitted on admin screens. The footer WhatsApp number is aligned to the store contact 9666585143. Browser/mobile visual verification is still required in a real browser; workspace browser restrictions prevented that verification here.
