#!/bin/sh
set -eu

custom_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repo_dir=$(CDPATH= cd -- "${custom_dir}/.." && pwd)

cd "${repo_dir}"

found_patch=false
for patch_file in "${custom_dir}"/patches/*.patch; do
  [ -f "${patch_file}" ] || continue
  found_patch=true

  if git apply --check "${patch_file}"; then
    git apply "${patch_file}"
    echo "Applied $(basename "${patch_file}")"
  elif git apply --reverse --check "${patch_file}"; then
    echo "Already present: $(basename "${patch_file}")"
  else
    echo "Patch no longer applies cleanly: ${patch_file}" >&2
    exit 1
  fi
done

if [ "${found_patch}" = false ]; then
  echo "No source patches required for this official revision"
fi

sh "${custom_dir}/verify-home-iframe.sh"
sh "${custom_dir}/verify-maintained-features.sh"
