# Publishing this project to GitHub (mass usage)

**Repository:** [github.com/Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)

**Step-by-step ship commands (no placeholder paths):** [SHIP_TO_GITHUB.md](SHIP_TO_GITHUB.md) — use that for copy-paste `cd`, `gh auth`, and `git push`.

This document uses the **public** name **sap-ai-design-system-c**. The **Python package** on disk is still imported as `sapui5_llm_ready` (see `pyproject.toml`). Your local **folder** can be `sap-ai-design-system-c` or an older name like `sapui5-llm-ready` as long as you `cd` into the directory that contains **`Makefile`**.

## Authenticate first

Pushing requires **your** GitHub identity on this machine. The assistant cannot accept passwords or tokens in chat.

1. **GitHub CLI** (recommended):

   ```bash
   gh auth login
   ```

   Follow the prompts (HTTPS or SSH). Then `gh auth status` should show an account.

2. **Or SSH:** ensure `ssh -T git@github.com` works and use the SSH remote URL below.

Do **not** commit personal access tokens; use the credential helper or SSH keys only on your machine.

## Before you push

1. Run full validation: `make all` and `make build-sap-po` — both must exit `0`.
2. Remove or redact any **secrets** (`.env`, API keys) — do not commit `ANTHROPIC_API_KEY`.
3. Read `LICENSE` at repo root and ensure it matches your policy.

## One-time: create the repository on GitHub

**Option A — GitHub web UI**

1. **New repository** → name: **`sap-ai-design-system-c`**, owner **`Venelinhr`**.
2. **Do not** add README/License on GitHub if you already have them locally (avoids merge noise).

**Option B — GitHub CLI** (from your project root, after `gh auth login`):

```bash
gh repo create Venelinhr/sap-ai-design-system-c --public --source=. --remote=origin --push
```

(Use `--private` if you need a private repo first.)

## Initialize git (if this folder is not yet a repo)

```bash
cd ~/sap-ai-design-system-c   # or: cd ~/sapui5-llm-ready — your real project path
git init
git add .
git commit -m "Initial import: LLM-ready SAPUI5 design system registry and demos"
```

## Add remote and push (if you created the empty repo in the UI)

```bash
git remote add origin https://github.com/Venelinhr/sap-ai-design-system-c.git
# or: git@github.com:Venelinhr/sap-ai-design-system-c.git
git branch -M main
git push -u origin main
```

## After publish

- Add a short **Repository description** and **topics**: `sapui5`, `openui5`, `llm`, `design-systems`, `fiori`, `figma`, `mcp`, `ai`
- Point people to:
  - [`README.md`](../README.md) — overview
  - [`docs/INSTALL_AND_VALIDATE.md`](INSTALL_AND_VALIDATE.md) — **install and validate** (golden path)
  - [`docs/PROMPT_EVERYTHING.md`](PROMPT_EVERYTHING.md) — **AI prompt** examples
  - [`docs/ONBOARDING_AI_TOOLS.md`](ONBOARDING_AI_TOOLS.md) — Cursor, Claude, Windsurf, VS Code
  - [`docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`](case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md) — case study
  - [`docs/case_study/exports/`](case_study/exports/) — PPTX + PDF (`make case-study-artifacts`); playbook (`make playbook-presentation`)
  - [`docs/LLM_HUMAN_PLAYBOOK.md`](LLM_HUMAN_PLAYBOOK.md) and [`docs/PLAYBOOK_INDEX.md`](PLAYBOOK_INDEX.md)
  - [`DESIGN.md`](../DESIGN.md) / [`SAPUI5-COMPONENTS.md`](../SAPUI5-COMPONENTS.md)
  - [`examples/purchase-order/DEMO-INSTRUCTIONS.md`](../examples/purchase-order/DEMO-INSTRUCTIONS.md)
  - This file

**First release (optional):** tag `v0.1.0` after a green `main` and green CI.

**Note:** Pushing always uses **your** Git credentials in **your** terminal; do not share tokens in issues or chat.
