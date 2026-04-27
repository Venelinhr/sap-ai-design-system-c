# Install, validate, and run (golden path)

**Goal:** Clone **sap-ai-design-system-c**, install dependencies, get a **green** `make all`, then run **local SAP Fiori / OpenUI5 demos** without guesswork.

**Repository:** [github.com/Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Python** | 3.9+ (CI uses 3.11; match if you hit odd issues) |
| **Git** | To clone and contribute |
| **Browser** | Chrome / Edge / Safari for `http://localhost:*` demos |
| **Network** | For `git clone` and `pip install`; core `make all` works **offline** after install (fixtures in `data/fixtures/`) |
| **Optional** | **Node** may be invoked for TS check in `validate-po` via `npx` (first run can download a pinned `typescript`) |
| **Optional** | `ANTHROPIC_API_KEY` only if you run `make validate-po-llm` |

## Step 1 — Clone

```bash
git clone https://github.com/Venelinhr/sap-ai-design-system-c.git
cd sap-ai-design-system-c
```

If you already have the same code under a different folder name (for example `~/sapui5-llm-ready`), `cd` there instead — the name on disk does not have to match the GitHub repo name.

## Step 2 — Virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
python3 -m pip install --upgrade pip
pip install -e ".[dev]"
```

**Verify:** `python3 -c "import sapui5_llm_ready; print('ok')"` should print `ok`.

## Step 3 — Full validation (required before you change code)

```bash
make all
```

**Success looks like:** `ruff` passes, registry builds, `pytest` passes, PO validation passes, SAP demo XML validation passes, `token-audit` OK.

## Step 4 — SAP XML / PO pipeline (extra gate for UI demos)

```bash
make build-sap-po
```

**Success:** ends with `Build SAP Purchase Order complete.` and JSON `status: pass` blocks.

## Step 5 — Run the registry API (optional)

```bash
make run-api
# or: uvicorn sapui5_llm_ready.api:app --reload --port 8000
```

Open [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) — expect a healthy response.

## Step 6 — Run a Fiori-style browser demo (optional)

In a **second** terminal (keep venv activated):

```bash
make demo-subscription    # → http://127.0.0.1:8088/  (Object Page subscription)
# or
make demo-showcase        # → http://localhost:8087
```

**If the browser says connection refused:** the `make` server is not running or the port differs—read the terminal output for the URL and use a **hard refresh** after XML changes.

## Step 7 — Case-study site (optional)

```bash
make demo-playbook-site
```

Opens a static hub (port from **8089** upward). Full **“build a Fiori app”** narrative: HTML [`#build-sap-app`](../examples/llm-playbook-case-study/index.html#build-sap-app) or Markdown [`CASE_STUDY_HUB.md`](../examples/llm-playbook-case-study/CASE_STUDY_HUB.md).

## Troubleshooting

| Symptom | What to do |
|---------|------------|
| `make all` fails on **ruff** | Fix reported files, or run `ruff check src tests scripts --fix` where safe |
| `pytest` fails | Read the failure; do not commit with red tests |
| `token-audit` fails | Stray hex/px in gated static files—use `examples/purchase-order/demo/_shared/llm-tokens.css` variables |
| `npx` / TypeScript errors during PO validate | Allow first-time network for `npx -p typescript` or install Node LTS |
| Import errors | Ensure `pip install -e ".[dev]"` from repo root with venv active |
| Demos show old UI | Hard refresh; ensure you saved files and the correct `make` target is running |

## Ship to GitHub

After local validation:

1. `make all` and `make build-sap-po` — both **0** exit code  
2. No secrets in `git status` (no `.env`, no keys)  
3. Follow **[SHIP_TO_GITHUB.md](SHIP_TO_GITHUB.md)** (copy-paste) or [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md) (`gh auth login`, remote, `git push`)

## Related

- **[PROMPT_EVERYTHING.md](PROMPT_EVERYTHING.md)** — copy-paste prompts for AI-assisted work in this repo  
- **[ONBOARDING_AI_TOOLS.md](ONBOARDING_AI_TOOLS.md)** — Cursor, Claude, Windsurf, VS Code  
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** — PR checklist
