#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if command -v pnpm >/dev/null 2>&1; then PM=pnpm; elif command -v npm >/dev/null 2>&1; then PM=npm; else echo "Need npm or pnpm"; exit 1; fi

cd web
$PM install
$PM run build
