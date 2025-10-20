#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

cd web
if [ -f pnpm-lock.yaml ]; then PM=pnpm; else PM=npm; fi
$PM run lint || true
$PM run typecheck
$PM run build
