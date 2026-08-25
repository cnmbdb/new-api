#!/bin/sh
set -eu

# web/dist is a named volume in development. A placeholder keeps Go's embed
# directives valid while the real frontend runs through the Rsbuild dev server.
if [ ! -f web/dist/index.html ]; then
  mkdir -p web/dist
  printf '%s\n' '<!doctype html><html><head><title>dev</title></head><body>use frontend dev server</body></html>' > web/dist/index.html
fi

exec "$@"
