#!/bin/sh
set -eu

mkdir -p /workspace/web/dist /data /tmp/new-api-air

if [ ! -f /workspace/web/dist/index.html ]; then
  printf '%s\n' '<!doctype html><html><head><title>dev</title></head><body>Use the frontend development server on port 5173.</body></html>' > /workspace/web/dist/index.html
fi

cd /workspace
exec air -c .air.toml
