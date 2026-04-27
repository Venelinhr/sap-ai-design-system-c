# LLM Playbook — static case study hub (HTML)

**What:** A **single-page** dark-theme **presentation-style** site: it **embeds the substance** of the program (program story, root file map with a role per path, four layers + pipeline, **Build a SAP Fiori app**, and **`#workflow-methodology`** — LLM problem statement, four-part solution, **IaC analogy**, **prompt template + examples**, best practices, red flags, before/after, how to use, **eleven phased** blocks with *Wrong* / *Best* / *avoid* / *issues*, plus **demo image** placeholders) so readers can learn from the HTML alone; **Open raw** links are optional. Anchors: `#build-sap-app` · `#workflow-methodology`. Also links to root `*.md` when served from the repo root (`make demo-playbook-site`).

**Canonical written case study:** [`../../CASE_STUDY.md`](../../CASE_STUDY.md) at the repository root (same content direction as this hub, in one Markdown file).

**Why:** Handout or second screen next to OpenUI5 localhost demos — **not** a replacement for SAPUI5; it is **static** HTML using `examples/purchase-order/demo/_shared/llm-tokens.css` (no raw hex/px in this folder’s HTML/CSS; run `make token-audit`).

**Run (from repository root):**

```bash
make demo-playbook-site
```

This runs **`scripts/serve_playbook_case_study.py`**, which:

- Serves the **repository root** on **127.0.0.1** (so `/docs/…` links work).
- Picks a **free TCP port** starting at **8089** (or `PLAYBOOK_SITE_PORT` if set) if 8089 is already in use.
- **Opens your default browser** to the case study page (pass `--no-open` to the script if you only want the URL in the terminal).

Use the **URL printed in the terminal** (it may be `8089`, `8090`, …).

- To skip opening a browser: `python3 scripts/serve_playbook_case_study.py --no-open`
- In parallel, run the OpenUI5 demos in other terminals: `make demo-showcase` (8087), `make demo-subscription` (8088), `make demo-ui5` (8085) as needed.

**Markdown edition (same content as the HTML hub, for print / GitHub / offline):** [`CASE_STUDY_HUB.md`](CASE_STUDY_HUB.md) — links are **repo-relative** from this folder (e.g. `../../CASE_STUDY.md`).

**Files:** `index.html` · `playbook-case-study.css` · `CASE_STUDY_HUB.md`
