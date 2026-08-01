# Custom layer on official New API

This branch is intentionally based directly on `upstream/main`. Official code
stays in its original history; local behavior is maintained as a small stack of
custom commits on top.

## Included customizations

- Internal `/docs` onboarding page.
- Liquid-glass application header.
- Trusted administrator Footer HTML script execution.
- Explicit `$` prefix on recharge presets.
- SQLite persistence with Redis and in-memory caching disabled by default.
- A custom image built on the official runtime image.

Features now available upstream (model square, translation protection and home
iframe theme/language synchronization) are not duplicated here.

Footer scripts run with the same privileges as the application. Only trusted
administrators should be allowed to edit Footer HTML. Prefer a tag manager or a
strictly reviewed static script when possible.

## Build and deploy

```bash
cp .env.custom.example .env.custom
# Fill real secrets in .env.custom; never commit it.
docker compose --env-file .env.custom -f compose.custom.yml up -d --build
```

For production, set `OFFICIAL_RUNTIME` to an immutable official image digest
instead of `latest`.

The custom Compose stack stores SQLite at `/data/one-api.db`. Back up the
`new_api_data` volume before upgrades. This single-node configuration does not
start or require Redis.

To show the internal documentation from the navigation bar, set the system
documentation link to `/docs` in the administrator settings.

## Remote-image development

GitHub Actions builds `ghcr.io/cnmbdb/new-api:dev` for both amd64 and arm64.
The image contains Go, Bun, Air, and dependency caches. Local Compose pulls the
image and bind-mounts this checkout; it never builds a Docker image locally.

```bash
make dev-pull
make dev
# Open http://localhost:5173
```

Go files reload through Air. Frontend files reload through Rsbuild. Development
data is SQLite in the `dev_data` volume, and no Redis service is started. Normal
source edits do not require a new development image; dependency-file changes
trigger the Actions workflow and require another `make dev-pull`.

## Update from official

```bash
git fetch upstream
git switch custom/upstream
git rebase upstream/main
docker compose --env-file .env.custom -f compose.custom.yml build
```

Resolve conflicts only inside the custom files/lines. Then run the frontend and
Go verification commands before deploying. If a custom patch becomes available
upstream, remove the local commit instead of carrying both implementations.

The legacy `main` branch remains an archive and should not receive new feature
work. New custom changes should be small, independently tested commits on this
branch.
