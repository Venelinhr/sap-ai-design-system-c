# Case study — **sapui5-llm-ready** (complete repository guide)

**One-sentence story:** This repository is an **end-to-end, LLM-readable design system** for **SAP Fiori / OpenUI5**: it turns **API-aligned metadata** + **light Figma signals** into a **queryable** `ComponentSpec` **registry**, a **FastAPI** retrieval/validation layer, **YAML recipes**, **local Fiori demos**, **CI/governance**, and **documentation** so humans and agents **stop guessing** `sap.m` / `sap.uxap` **aggregations**.

**Start here (reading order for stakeholders):** [`README.md`](README.md) → [`DESIGN.md`](DESIGN.md) → [`docs/LLM-READABLE-ADDENDUM.md`](docs/LLM-READABLE-ADDENDUM.md) (2-page org handoff) → this file as **map** → [`docs/LLM_HUMAN_PLAYBOOK.md`](docs/LLM_HUMAN_PLAYBOOK.md) (full).

**Shorter program paths:** [WORKFLOW (zero→100%)](docs/WORKFLOW_ZERO_TO_100.md) · [Demos :8087 / :8088](docs/DEMOS_LOCALHOST_8087_8088.md) · [Turning point](docs/TURNING_POINT_MOMENTUM.md) · [Playbook index](docs/PLAYBOOK_INDEX.md)

---

## 1) Root-level files (what each is for)

| File / path | Role |
|-------------|------|
| **[`README.md`](README.md)** | Project overview, quickstart, API usage, **browser demo table**, case study & deck pointers |
| **[`DESIGN.md`](DESIGN.md)** | **Master spec**: Fiori vs API vs registry vs Figma; validation index; “where to read” |
| **[`SAPUI5-COMPONENTS.md`](SAPUI5-COMPONENTS.md)** | **Component + JSON** map: when to use API vs `registry.json` vs recipes |
| **[`AGENTS.md`](AGENTS.md)** | **Mandatory rules** for any coding agent touching UI, registry, or static HTML **tokens** |
| **[`GOVERNANCE.md`](GOVERNANCE.md)** | **Quality gates**, registry update workflow, merge bar |
| **[`pyproject.toml`](pyproject.toml)** | Python package metadata; **`[dev]`** and **`[case-study]`** extras (pptx, fpdf, pillow) |
| **[`Makefile`](Makefile)** | **Single entry** for `build-registry`, `validate-*`, **demos** (`8085`–`8088`, `8089+` playbook site), **artifacts** |
| **[`LICENSE`](LICENSE)** | License text |
| **[`CASE_STUDY.md`](CASE_STUDY.md)** | **This file** — full-program case study + file map |
| **[`schemas/component_spec.schema.json`](schemas/component_spec.schema.json)** | **Canonical JSON** contract for `ComponentSpec` |
| **[`data/registry.json`](data/registry.json)** | **Built** registry (do not hand-edit; use scripts) |
| **[`data/figma/signals.yaml`](data/figma/signals.yaml)** | **Semantic** Figma hints (does **not** override API) |
| **[`data/top_components_seed.yaml`](data/top_components_seed.yaml)** | Seed list for top-component flows + **8087** showcase |
| **[`recipes/`](recipes/)** | **YAML** + prompt templates: object page, list-report, dashboard, wizard |
| **[`specs/`](specs/)** | Foundations, **tokens** (incl. closed UI5 token notes), **patterns** (shell, forms) |
| **[`src/sapui5_llm_ready/`](src/sapui5_llm_ready/)** | **FastAPI** app, registry models, extractors, Figma merge, **validateUiPlan**, recipes, PO generator |
| **[`scripts/`](scripts/)** | Extract, validate, build **PPTX/PDF**, **playbook** deck, **token audit**, **playbook static server** |
| **[`tests/`](tests/)** | Contract, schema, API, Figma, governance, **token-audit** tests |
| **[`.github/workflows/ci.yml`](.github/workflows/ci.yml)** | **CI** pipeline |

---

## 2) Architecture (how the pieces connect)

1. **Input:** SAPUI5 API **fixtures** or **live** pull (`scripts/extract_sapui5.py`) → **ComponentSpec** documents.  
2. **Merge:** optional **Figma** semantics (`apply_figma_signals.py`) into registry / patterns.  
3. **Store:** `data/registry.json` (validated against **JSON Schema**).  
4. **Serve:** `sapui5_llm_ready.api` — **search**, **getComponentSpec**, **getCompositionRules**, **getExamples**, **validateUiPlan**.  
5. **Generate / check:** `recipes/*`, `validate_po*`, `validate_sap_demo`, **token-audit** for static **non-UI5** HTML.  
6. **Prove:** local **OpenUI5** apps (`examples/`) on documented **ports**.

**Fiori + API + machine index** (from `DESIGN.md`):

| Layer | Authority |
|-------|-----------|
| **Fiori guidelines** | *When* (pattern, density, a11y intent) |
| **OpenUI5 API** | *What* is **legal** in XML (classes, **aggregations**, properties) for the **pinned** version |
| **ComponentSpec + registry** | *Retrievable* facts and **validateUiPlan** for agents |
| **Figma (here)** | `signals.yaml` — **not** a compiling aggregation spec |
| **Static marketing HTML** | **Closed** tokens: `examples/purchase-order/demo/_shared/llm-tokens.css` only |

---

## 3) Documentation index (`docs/`)

| Area | File |
|------|------|
| **Playbook (navigation hub)** | [`docs/PLAYBOOK_INDEX.md`](docs/PLAYBOOK_INDEX.md) |
| **Full human + LLM briefing** | [`docs/LLM_HUMAN_PLAYBOOK.md`](docs/LLM_HUMAN_PLAYBOOK.md) |
| **MCP / static / 4-step prompts** | [`docs/PROMPTING_MCP_AND_STATIC.md`](docs/PROMPTING_MCP_AND_STATIC.md) |
| **7-step validation** | [`docs/VALIDATION_7STEPS_LLM.md`](docs/VALIDATION_7STEPS_LLM.md) |
| **Design review / merge** | [`docs/DESIGN_REVIEW_CHECKLIST.md`](docs/DESIGN_REVIEW_CHECKLIST.md) |
| **Figma vs API** | [`docs/FIGMA_VS_MACHINE_TRUTH.md`](docs/FIGMA_VS_MACHINE_TRUTH.md) |
| **Error handling (LLM)** | [`docs/ERROR_HANDLING_LLM.md`](docs/ERROR_HANDLING_LLM.md) |
| **Pandya / LLM design systems** | [`docs/COMPARISON_PANDYA.md`](docs/COMPARISON_PANDYA.md) |
| **2-page org addendum** | [`docs/LLM-READABLE-ADDENDUM.md`](docs/LLM-READABLE-ADDENDUM.md) |
| **Workflow 0→100%** | [`docs/WORKFLOW_ZERO_TO_100.md`](docs/WORKFLOW_ZERO_TO_100.md) |
| **Demos :8087 & :8088** | [`docs/DEMOS_LOCALHOST_8087_8088.md`](docs/DEMOS_LOCALHOST_8087_8088.md) |
| **Turning point / momentum** | [`docs/TURNING_POINT_MOMENTUM.md`](docs/TURNING_POINT_MOMENTUM.md) |
| **GitHub publish** | [`docs/GITHUB_PUBLISH.md`](docs/GITHUB_PUBLISH.md) |
| **Long case study (narrative)** | [`docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`](docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md) |
| **Deck editor outline** | [`docs/case_study/PLAYBOOK_DECK_OUTLINE.md`](docs/case_study/PLAYBOOK_DECK_OUTLINE.md) |
| **Case study folder README** | [`docs/case_study/README.md`](docs/case_study/README.md) |

---

## 4) Examples & demos (`examples/`)

| Path | Purpose |
|------|---------|
| [`examples/purchase-order/`](examples/purchase-order/) | PO **UI5** demo (`demo-ui5` **8085**), React, pitch, **deck** (`8083/8084`), **DEMO-INSTRUCTIONS** |
| [`examples/enterprise-llm-showcase/`](examples/enterprise-llm-showcase/) | **8087** — “LLM readiness” OPL + form + table |
| [`examples/subscription-billing/`](examples/subscription-billing/) | **8088** — B2B subscription **OPL** + dialogs + state |
| [`examples/llm-playbook-comparison/`](examples/llm-playbook-comparison/) | **Static** React vs Fiori **concepts** HTML |
| [`examples/llm-playbook-case-study/`](examples/llm-playbook-case-study/) | **Case study HTML hub** + how-to (build Fiori app) + [`CASE_STUDY_HUB.md`](examples/llm-playbook-case-study/CASE_STUDY_HUB.md) in Markdown — `make demo-playbook-site` (HTML: `#build-sap-app`) |
| **Shared tokens (static)** | [`examples/purchase-order/demo/_shared/llm-tokens.css`](examples/purchase-order/demo/_shared/llm-tokens.css) |

---

## 5) Deliverables (artifacts you can hand out)

| Output | Command / location |
|--------|--------------------|
| **Full playbook deck (~70+ slides)** | `make playbook-presentation` → `docs/case_study/exports/SAP_LLM_Playbook_Full.pptx` |
| **Shorter case-study PPTX + narrative PDF** | `make case-study-artifacts` (needs `[case-study]`) → `docs/case_study/exports/SAP_Prompt_Case_Study.{pptx,pdf}` |
| **This master case-study (Markdown + PDF handout)** | [`CASE_STUDY.md`](CASE_STUDY.md) (root); generated copies: `docs/case_study/exports/SAP_Repository_Case_Study_Handout.{md,pdf}` |
| **Case-study web hub** | `make demo-playbook-site` — browser hub + `/docs` links |
| **Narrative case study (long MD)** | [`docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`](docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md) |

---

## 6) Essential `make` targets (from [`Makefile`](Makefile))

| Target | Use |
|--------|-----|
| `make install` | `pip install -e ".[dev]"` |
| `make build-registry` / `make validate-registry` | Build & validate `data/registry.json` |
| `make run-api` | FastAPI on **8000** |
| `make all` | Lint, registry, tests, PO validation, SAP demo validation, **token-audit** |
| `make demo-ui5` | PO demo **8085** |
| `make demo-showcase` | **8087** |
| `make demo-subscription` | **8088** |
| `make demo-playbook-site` | Case-study **HTML** (repo root server; opens browser) |
| `make playbook-presentation` | Build **PPTX** playbook |
| `make case-study-artifacts` | Shorter PPTX + PDF |
| `make token-audit` | Static **hex/px** gate for non-token CSS |

---

## 7) Success criteria (what “done” means)

- **Runnable** demos on **documented** ports with **Horizon** + **compact** where specified.  
- **Registry** validates against **schema**; **API** contract tests pass.  
- **XML** in demos uses **only** **API-legal** controls and **aggregations** (reviewable with **7-step** + line QA).  
- **Handoff** possible with **this repo** + `CASE_STUDY.md` + `PLAYBOOK_INDEX.md` without private chat history.

---

*This file is maintained as the **root-level** case-study index. For slide-by-slide deck content, use `make playbook-presentation` and [`docs/case_study/PLAYBOOK_DECK_OUTLINE.md`](docs/case_study/PLAYBOOK_DECK_OUTLINE.md).*
