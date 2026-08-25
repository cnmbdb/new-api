# Customization layer

This directory is the upgrade-safe layer on top of the official source tree.

- `apply.sh` applies every `patches/*.patch` file in lexical order.
- A patch that is already present upstream is skipped.
- A patch that no longer applies cleanly fails the image build instead of
  silently producing a partial customization.
- `verify-home-iframe.sh` protects the homepage iframe theme/language sync,
  load synchronization, navigation compatibility, and translation guards.

The current official revision already contains the homepage iframe feature, so
no source patch is needed today. If upstream removes or changes it, the verifier
will stop the custom image workflow until a small compatibility patch is added.
