#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

# Vercel's Next.js builder requires .next/routes-manifest.json. vinext emits a
# Cloudflare worker bundle and does not write that manifest, so production
# builds on Vercel use Next.js directly. Local builds stay on vinext because
# the test suite loads dist/server/index.js.
if [[ "${VERCEL:-}" == "1" ]]; then
  next_bin="${SITES_PROJECT_ROOT}/node_modules/.bin/next"
  if [[ ! -x "${next_bin}" ]]; then
    echo "next is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
    exit 69
  fi

  echo "Running bounded next build..."
  timeout \
    --signal=TERM \
    --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
    "${SITES_BUILD_TIMEOUT:-8m}" \
    "${next_bin}" build

  manifest="${SITES_PROJECT_ROOT}/.next/routes-manifest.json"
  if [[ ! -f "${manifest}" ]]; then
    echo "next build finished without ${manifest}." >&2
    exit 1
  fi
else
  vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
  if [[ ! -x "${vinext}" ]]; then
    echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
    exit 69
  fi

  echo "Running bounded vinext build..."
  timeout \
    --signal=TERM \
    --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
    "${SITES_BUILD_TIMEOUT:-3m}" \
    "${vinext}" build
fi
