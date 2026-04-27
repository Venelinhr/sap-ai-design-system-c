#!/usr/bin/env bash
# Run from macOS Terminal with network (gh auth or SSH). Sandbox IDEs may block .git — use Terminal.
# Usage: bash scripts/first_push_to_github.sh
# Optional: bash scripts/first_push_to_github.sh git@github.com:Venelinhr/sap-ai-design-system-c.git
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
REPO_URL="${1:-https://github.com/Venelinhr/sap-ai-design-system-c.git}"

echo "==> Project root: $ROOT"
test -f Makefile || { echo "Error: run from repository root (Makefile missing)." >&2; exit 1; }

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "==> git init -b main"
  git init -b main
fi

echo "==> make all && make build-sap-po"
make all
make build-sap-po

if git rev-parse -q --verify HEAD >/dev/null 2>&1; then
  if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
    git add -A
    git commit -m "chore: update sap-ai-design-system-c" || true
  fi
else
  echo "==> initial commit"
  git add -A
  git commit -m "chore: initial push to sap-ai-design-system-c"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REPO_URL"
else
  git remote set-url origin "$REPO_URL"
fi

echo "==> git push -u origin main (sign in to GitHub if asked)"
if ! git push -u origin main; then
  echo "If the remote already has commits: git pull origin main --rebase --allow-unrelated-histories && git push -u origin main" >&2
  exit 1
fi
echo "==> https://github.com/Venelinhr/sap-ai-design-system-c"
