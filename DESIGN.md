# Design specification (master) — **sapui5-llm-ready**

**Purpose:** Single entry point for **humans and AI/LLM agents** describing *what* this repository’s design and delivery system is, *where* truth lives, and *how* to validate work before writing UI code.

**This is not a substitute for** [SAP Fiori design guidelines](https://experience.sap.com/fiori-design/) or the [SAPUI5 / OpenUI5 API](https://ui5.sap.com/#/api). It **orchestrates** those sources for **machine-checkable** delivery.

---

## 1) Ideas in one place

| Layer | What it is | Authoritative for |
|--------|------------|-------------------|
| **Fiori (human)** | Patterns, density, a11y intent | *When* to use which pattern (Object Page, form layout, worklist) |
| **OpenUI5 API (SAP)** | Classes, **aggregations**, **properties** | *What* is **legal** in view XML and controllers |
| **This repo: ComponentSpec** | `schemas/component_spec.schema.json` + `data/registry.json` | **Deterministic** LLM **retrieval** and **plan validation** |
| **Figma (here)** | `data/figma/signals.yaml` | **Semantic** hints, **not** a code or aggregation truth |
| **Static HTML in repo** (deck/pitch) | `examples/purchase-order/demo/_shared/llm-tokens.css` | **Closed** CSS **tokens** for **non-UI5** pages only |

**Before you build anything:** read **(1) SAPUI5 API** for the **pinned** version in the demo’s `index.html`, then **(2)** `AGENTS.md`, then **(3)** this file and **[SAPUI5-COMPONENTS.md](SAPUI5-COMPONENTS.md)**. Full playbook: **[docs/LLM_HUMAN_PLAYBOOK.md](docs/LLM_HUMAN_PLAYBOOK.md)**.

---

## 2) Where to read (source map)

| Need | File / location |
|------|-----------------|
| **This master spec** | **`DESIGN.md`** (this file) |
| **Component list + how to use JSON** | **[SAPUI5-COMPONENTS.md](SAPUI5-COMPONENTS.md)** |
| **Component JSON (machine index)** | `data/registry.json` (built); schema: `schemas/component_spec.schema.json` |
| **Foundations, tokens, patterns (specs)** | `specs/README.md` → `specs/foundations/`, `specs/tokens/`, `specs/patterns/` |
| **Token rules for UI5 demos** | `specs/tokens/closed-sapui5-fiori-set.md` |
| **LLM addendum (org hub, 2 pages)** | `docs/LLM-READABLE-ADDENDUM.md` |
| **Session rules for coding agents** | `AGENTS.md` |
| **Pandya mapping (LLM design systems)** | `docs/COMPARISON_PANDYA.md` |
| **Figma: limits** | `docs/FIGMA_VS_MACHINE_TRUTH.md` |
| **Case study (prompt to app)** | `docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md` |
| **Comprehensive briefing (slides + detail)** | `docs/LLM_HUMAN_PLAYBOOK.md` |

**Local live demos (start server first, then open in browser):** [http://127.0.0.1:8088/](http://127.0.0.1:8088/) with `make demo-subscription` (subscription OPL) · [http://localhost:8087](http://localhost:8087) with `make demo-showcase` (enterprise showcase). If *connection refused*, the HTTP server is not running — see `README.md`.

---

## 3) How to validate (index)

- **7-step checklist (LLMs):** `docs/VALIDATION_7STEPS_LLM.md`
- **Design review (merge gate):** `docs/DESIGN_REVIEW_CHECKLIST.md`
- **Error handling (agents):** `docs/ERROR_HANDLING_LLM.md`
- **Governance / CI:** `GOVERNANCE.md`, `make all`

---

## 4) How to prompt (index)

- **4-step template + examples + 4 patterns:** `docs/PROMPTING_MCP_AND_STATIC.md`
- **Recipe + generator system prompt (JSON plan):** `recipes/prompt-template.md`
- **Retrieval via API (when run locally):** `make run-api` — see `README.md` for endpoints

---

## 5) Integration for AI tools

| Tool | Recommended approach |
|------|----------------------|
| **Claude Desktop** | Attach `DESIGN.md` + `AGENTS.md`; if you expose this repo as an **MCP** server, use **getComponentSpec** / **search** instead of free-form API memory — *see* `docs/LLM_HUMAN_PLAYBOOK.md` § integration |
| **Claude Code / Cursor / Windsurf** | Open repo root; add folder to workspace; use **`@DESIGN.md`** and **`@docs/LLM_HUMAN_PLAYBOOK.md`** in prompts |
| **ChatGPT (no repo)** | Paste **relevant** sections; attach **`SAPUI5-COMPONENTS.md` excerpt** + a **sliced** `ComponentSpec` JSON for chosen controls (never the whole `registry.json`) |

---

*Version: aligned with `README.md` and `AGENTS.md`. Update when the UI5 bootstrap or registry schema has a major change.*
