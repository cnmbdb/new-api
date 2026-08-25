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

Official features already present upstream, including the model marketplace,
translation protection, and iframe theme/language synchronization, are verified
but are not duplicated as custom patches.
