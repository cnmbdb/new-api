# Custom layer on official New API

This branch is intentionally based directly on `upstream/main`. Official code
stays in its original history; local behavior is maintained as a small stack of
custom commits on top.

## Included customizations

- Internal `/docs` onboarding page.
- Liquid-glass application header.
- Trusted administrator Footer HTML script execution.
- Explicit `$` prefix on recharge presets.
- Railway-friendly database pool defaults through environment variables.
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

To show the internal documentation from the navigation bar, set the system
documentation link to `/docs` in the administrator settings.

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
