#!/bin/sh
set -eu

cd /workspace/web

image_lock=$(cat /opt/new-api-dev/bun-lock.sha256)
volume_lock=$(cat node_modules/.dev-image-lock 2>/dev/null || true)

if [ "$image_lock" != "$volume_lock" ]; then
  rm -rf node_modules/* node_modules/.[!.]* node_modules/..?* 2>/dev/null || true
  cp -a /opt/new-api-dev/node_modules/. node_modules/
  printf '%s\n' "$image_lock" > node_modules/.dev-image-lock
fi

exec bun run dev -- --host 0.0.0.0 --port 5173
