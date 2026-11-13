# Deploy the Sadhya backend to Render

This deploys only the ASP.NET Core API. Keep the existing Cloudflare frontend. The Blueprint creates **one paid web service** (0.5 CPU/512 MB plan) in **Singapore**, plus a **1 GB persistent disk**. Review Render's displayed price/billing before creating it. No separate SQL Server or Postgres service is required for this first single-instance deployment.

[Open the prepared Render deployment](https://render.com/deploy?repo=https://github.com/SKTeegala1/sadhyastore/tree/feature/ecommerce-accounts-admin)

The branch contains the Dockerfile and `render.yaml`; it does not need to be merged to main first. Automatic backend deployment is disabled so development commits do not unexpectedly replace the running API. When the branch changes, use Render's **Manual Deploy → Deploy latest commit** after reviewing CI results. Switch the service branch to your chosen release branch when ready.

## 1. Create the service

1. Sign in to Render and open the deployment link above. Alternatively: **New → Blueprint**, connect `SKTeegala1/sadhyastore`, select `feature/ecommerce-accounts-admin`, and load the root `render.yaml`.
2. Review `sadhya-api`, Singapore, `0.5c-512mb`, and the `sadhya-data` disk mounted at `/var/data`. Use a paid plan: the SQLite database must be on a persistent disk.
3. Enter **BootstrapAdmin__Email** and **BootstrapAdmin__Password** privately in Render. Choose a unique password with at least 10 characters, uppercase/lowercase/digit/symbol. Do not send credentials in chat or commit them.
4. Create/apply the Blueprint and watch the deployment logs. Render builds `backend/Dockerfile` using the repository root as the build context. The initial package/image downloads can take several minutes.
5. Wait until the service is **Live**, then open its actual URL:

```text
https://YOUR-API.onrender.com/api/health
```

Expected: `{"status":"ok"}`. Share only this public service URL when asking for help.

The service listens on `0.0.0.0:$PORT` (default 10000). Docker initializes the mounted disk's ownership, then runs .NET as the non-root `app` user. `/var/data/sadhya.db` stores accounts, products, orders, uploads and settings. `/var/data/keys` stores persistent Data Protection keys so login cookies survive redeploys. Do not remove or replace the disk after launching.

The Blueprint creates a **new empty database**, not a copy of your Windows SQLite file. The admin can import the source product catalog after the frontend is connected. Any local product edits, uploaded photos and test accounts will not transfer automatically. If you want to preserve those, arrange a controlled SQLite backup/import before accepting real orders; do not overwrite a live store database casually.

## 2. Connect the existing Cloudflare frontend

In Render's backend Environment settings, locate **Gateway__Token** (generated automatically by the Blueprint). Copy it privately to Cloudflare as the Worker secret **STORE_API_TOKEN**. Never paste it in chat or GitHub.

In CMD from the repository root:

```cmd
git switch feature/ecommerce-accounts-admin
git pull
npx wrangler login
npx wrangler secret put STORE_API_TOKEN
```

The last command prompts for the secret without putting it in the command text. Use the exact same value as Render's Gateway__Token.

Add this property to the existing root `wrangler.jsonc`, keeping all existing settings:

```json
"vars": {
  "STORE_API_ORIGIN": "https://YOUR-API.onrender.com"
}
```

Use the real HTTPS backend origin with no `/api` suffix. If the project already has a `vars` object, add the key there rather than duplicating the object. If you deploy using a named Wrangler environment, set both the origin and secret for that same environment.

Build and publish the frontend from CMD:

```cmd
npm run deploy
```

If Cloudflare deploys automatically from GitHub, use the branch containing the new proxy code or merge/release it through your normal flow first. Update the actual existing Worker, not a second unrelated Worker. A backend-only change cannot update an already hosted older frontend.

The worker adds the gateway secret and trusted client IP when forwarding `/api/*`. The API accepts the HTTPS gateway only after verifying the secret and uses the supplied client IP for per-client login throttling. Requests sent directly to the Render API without the secret intentionally receive 403, except `/api/health`, which remains public for health checks. You do not need to expose the secret in React or enable cross-origin cookie access.

## 3. Verify the complete deployed flow

On the **Cloudflare storefront** origin:

- `/api/health` returns 200 and `{"status":"ok"}`.
- `/api/products` returns 200 (possibly an empty array). A 403 means the Cloudflare token and backend token are missing/mismatched or the old Worker code is still deployed.
- Register a test customer, log in by email/mobile, save an address, and log out/in again.
- Log in with the bootstrap admin, import the catalog, upload an image, edit a product, configure a slide and check that updates appear on the storefront. Imported stock starts at zero; set real stock deliberately.
- Place a test cash-on-delivery order, confirm its amount and delivery details, then inspect it in admin.
- Restart/redeploy the backend and confirm products, images, accounts, orders and existing login sessions persist.
- After initial admin creation succeeds, remove **BootstrapAdmin__Email** and **BootstrapAdmin__Password** from the service environment and redeploy. This does not delete the account. Remove their entries from the Blueprint too when formalizing production configuration, so a later Blueprint sync does not prompt for/reintroduce them.

Optional Google sign-in: add **Authentication__Google__ClientId** on the backend and authorize the actual HTTPS storefront origin in Google Cloud. See `README.md`; no Google client secret is required for the implemented flow.

## Backups and operating limits

Keep a single API instance with this SQLite configuration. Start one instance for initial schema upgrades. Do not horizontally scale a local SQLite file across independent services/disks. Monitor disk, memory and usage; uploads are stored in the database and can consume the initial 1 GB disk. Increase disk/compute as real usage requires.

A persistent disk is not your only backup. Before launch, take and test an independent SQLite backup and keep a protected copy of `/var/data/keys` off the service. For a consistent copy, stop writes and use SQLite's backup facility or stop the service and copy the database together with any WAL/SHM companions. Render's persistent-disk documentation describes downloading files with SSH/SCP. Do not commit customer data or keys to GitHub. Establish a regular backup process before accepting real orders.

The current health endpoint checks process reachability; the acceptance flow above verifies database/auth behavior. Docker cannot be executed in the authoring workspace, so Docker builds are included in GitHub CI and Render performs the actual image build/start. Production-mode tests run the .NET service with a simulated authenticated Cloudflare hop and verify host/gateway checks, secure cookies, persistent storage and successful cookie reuse after restart.

## Troubleshooting

| Symptom | Check |
|---|---|
| Build fails | Read Render logs; Dockerfile `backend/Dockerfile`, context repository root, selected feature branch. |
| Port not detected | Keep the default entrypoint; bind to 0.0.0.0 and Render's PORT. |
| Startup says Gateway__Token missing | Restore/generated backend token; it is required when running on Render. |
| Health returns 400 | Check AllowedHosts and Render's actual hostname; it is added automatically from RENDER_EXTERNAL_HOSTNAME. |
| Frontend returns 503 | STORE_API_ORIGIN must be configured and point to the healthy HTTPS API. |
| Frontend returns 403 | Match STORE_API_TOKEN to Gateway__Token and deploy the updated Worker proxy. |
| Login/CSRF fails | Use the HTTPS storefront and authenticated proxy, not direct Render login requests. |
| Data disappears | Confirm database path and keys directory are inside the attached /var/data disk. |
| Browser remains logged out after deploy | Confirm /var/data/keys persists and the old disk has not been replaced. |

Reference docs: https://render.com/docs/blueprint-spec · https://render.com/docs/disks · https://render.com/docs/deploy-to-render
