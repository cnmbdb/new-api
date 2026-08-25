#!/bin/sh
set -eu

require_file() {
  if [ ! -f "$1" ]; then
    echo "Required maintained feature file is missing: $1" >&2
    exit 1
  fi
}

require_text() {
  file=$1
  expected=$2
  if ! grep -Fq "${expected}" "${file}"; then
    echo "Required maintained feature marker is missing from ${file}: ${expected}" >&2
    exit 1
  fi
}

require_file web/src/components/layout/components/footer-script-injector.tsx
require_text web/src/routes/__root.tsx 'FooterScriptInjector'
require_text web/src/components/layout/components/footer-script-injector.tsx "script.dataset.footerScript = 'true'"

require_file web/src/features/docs/index.tsx
require_file web/src/routes/docs/index.tsx
require_text web/src/routes/docs/index.tsx "createFileRoute('/docs/')"

require_text web/src/components/layout/components/header.tsx "'liquid-nav sticky"
require_text web/src/styles/index.css '.liquid-nav {'

require_text web/src/features/wallet/components/recharge-form-card.tsx '${formatNumber(displayValue)}'

echo "Maintained custom feature patches are present"
