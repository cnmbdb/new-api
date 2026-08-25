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

content_branch=$(sed -n '/if (content) {/,/const contentIsHtml/p' "${home_file}")
url_branch=$(printf '%s\n' "${content_branch}" | sed -n '/if (isUrl) {/,/const contentIsHtml/p')
if printf '%s\n' "${url_branch}" | grep -Fq '<PublicLayout'; then
  echo "URL homepage iframe must not be wrapped in PublicLayout (it would render PublicHeader)" >&2
  exit 1
fi
if ! printf '%s\n' "${url_branch}" | grep -Fq '<iframe'; then
  echo "URL homepage branch no longer contains its fullscreen iframe" >&2
  exit 1
fi

echo "Official homepage iframe compatibility is present"
