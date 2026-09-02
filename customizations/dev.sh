#!/bin/sh
set -eu

custom_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_dir=$(CDPATH= cd -- "${custom_dir}/.." && pwd)
bun_cmd=${BUN_BIN:-bun}

if ! command -v "${bun_cmd}" >/dev/null 2>&1; then
  echo "Bun was not found. Set BUN_BIN to the Bun executable path." >&2
  exit 1
fi

dev_dir=$(mktemp -d "${TMPDIR:-/tmp}/new-api-custom-dev.XXXXXX")
case "${dev_dir}" in
  */new-api-custom-dev.*) ;;
  *)
    echo "Unexpected temporary directory: ${dev_dir}" >&2
    exit 1
    ;;
esac

cleanup() {
  trap - 0 HUP INT TERM
  cd "${repo_dir}"
  rm -rf -- "${dev_dir}"
}
trap cleanup 0
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

git -C "${repo_dir}" archive --format=tar HEAD | tar -xf - -C "${dev_dir}"
cp -R "${custom_dir}/." "${dev_dir}/customizations/"

sh "${dev_dir}/customizations/apply.sh"

cd "${dev_dir}/web"
"${bun_cmd}" install --frozen-lockfile
"${bun_cmd}" run dev "$@"
