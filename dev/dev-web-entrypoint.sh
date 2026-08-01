#!/bin/sh
set -eu

cd /workspace/web

if [ ! -e node_modules/.dev-image-seeded ]; then
  cp -a /opt/new-api-dev/node_modules/. node_modules/
  touch node_modules/.dev-image-seeded
fi

bun install --frozen-lockfile
exec bun run dev -- --host 0.0.0.0 --port 5173
