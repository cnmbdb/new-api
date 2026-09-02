# Upgrade-safe customization layer

The tracked source tree stays on the official `QuantumNous/new-api` baseline.
Custom behavior is applied only during the GitHub Actions image build.

- `apply.sh` applies every `patches/*.patch` file in lexical order.
- A patch that is already present upstream is skipped.
- A patch that no longer applies cleanly fails the image build instead of
  silently producing a partial customization.
- `verify-home-iframe.sh` protects the homepage iframe theme/language sync,
  load synchronization, navigation compatibility, and translation guards.
- `verify-maintained-features.sh` verifies every maintained custom feature
  after all patches have been applied.

## Maintained plugin patches

- `0001-fullscreen-url-home.patch`: fullscreen URL homepage without the official header.
- `0010-footer-script-injector.patch`: execute scripts from trusted administrator Footer HTML.
- `0020-internal-docs.patch`: restore the internal `/docs` API guide.
- `0030-liquid-navigation.patch`: restore the translucent liquid dashboard header.
- `0040-recharge-dollar-prefix.patch`: display the dollar prefix on recharge presets.
- `0050-resend-email-api.patch`: send email through the Resend HTTPS API when
  `RESEND_API_KEY` and `RESEND_FROM` are configured, with the official SMTP
  implementation retained as the fallback when Resend is not configured.
- `0060-branded-email-card.patch`: wrap outgoing email in a responsive orange
  card with a centered white brand mark, highlighted verification details, and
  a pill-shaped website button. Set `RESEND_TEMPLATE_ID` to use the published
  Resend-hosted template; the code-rendered card remains the fallback.
  `EMAIL_SITE_URL` controls the button target.

Official features already present upstream, including the model marketplace,
translation protection, and iframe theme/language synchronization, are verified
but are not duplicated as custom patches.

## Local development

Run the patched frontend from a disposable copy of the current official
baseline:

```sh
BUN_BIN=/path/to/bun sh customizations/dev.sh --port 5173
```

`dev.sh` archives `HEAD` into a temporary directory, overlays the current
`customizations/` layer, applies and verifies every patch, installs the locked
frontend dependencies, and starts Rsbuild. The temporary directory is removed
when the development server exits, so the official baseline stays unchanged.

Set `VITE_REACT_APP_SERVER_URL` when the API is not running on the default
`http://localhost:3000`.
