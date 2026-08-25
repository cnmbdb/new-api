#!/bin/sh
set -eu

home_file="web/src/features/home/index.tsx"
index_file="web/index.html"

require_text() {
  file=$1
  expected=$2
  if ! grep -Fq "${expected}" "${file}"; then
    echo "Required iframe compatibility marker is missing from ${file}: ${expected}" >&2
    exit 1
  fi
}

require_text "${home_file}" "{ themeMode: resolvedTheme }"
require_text "${home_file}" "{ lang: i18n.language }"
require_text "${home_file}" "onLoad={syncIframePreferences}"
require_text "${home_file}" "allow-top-navigation-by-user-activation"
require_text "${index_file}" '<meta name="google" content="notranslate" />'
require_text "${index_file}" 'translate="no" class="notranslate"'

echo "Official homepage iframe compatibility is present"
