# Case study site · static hub (Markdown edition)

**Repository:** [sapui5-llm-ready](../../README.md) — LLM-readable Fiori delivery

**Kicker:** Case study site · static hub — detailed presentation

*This file is a Markdown transposition of the [static HTML hub](index.html) (`index.html` + `playbook-case-study.css`). For `/docs/…` and `/*.md` as raw text in a browser, serve the **repository root** with `make demo-playbook-site` (not `file://`).*

**Quick links (repo-relative from this folder):** [CASE_STUDY.md](../../CASE_STUDY.md) (root) · [SAPUI5 API](https://ui5.sap.com/#/api) · [README.md](../../README.md) · [DESIGN.md](../../DESIGN.md) · [WORKFLOW](../../docs/WORKFLOW_ZERO_TO_100.md) · [Playbook index](../../docs/PLAYBOOK_INDEX.md) · [SAPUI5-COMPONENTS.md](../../SAPUI5-COMPONENTS.md)

---

## On this page

Each section is written to stand alone (presentation-style). Path links are optional deep dives into the same Markdown in the repo.

- [Program story (one paragraph)](#program-story-one-paragraph)
- [Complete case study file — `CASE_STUDY.md`](#complete-case-study-file--casestudymd-repository-root)
- [Root and top-level map (substance per path)](#root-and-top-level-map-substance-per-path)
- [Architecture — four layers of truth + data flow](#architecture--four-layers-of-truth--data-flow)
- [Build a SAP Fiori / OpenUI5 application](#build-a-sap-fiori--openui5-application--summary-instructions-and-what-to-follow)
- [End-to-end methodology (HTML — full)](#end-to-end-methodology-html--full) — 11 phases, wrong/best, IaC, prompts
- [Start here (reading order)](#start-here-reading-order--content-summary)
- [Zero → 100% (phases at a glance)](#zero--100-phases-at-a-glance)
- [Localhost :8087 and :8088](#localhost-8087-and-8088-approach-and-outcome)
- [The moment things start to happen](#the-moment-things-start-to-happen)
- [Examples folder (runnable and static)](#examples-folder-runnable-and-static)
- [Run the OpenUI5 demos](#run-the-openui5-demos-separate-terminals)
- [All documentation in `docs/` (each file)](#all-documentation-in-docs-what-each-file-is-for)
- [Handout deliverables](#handout-deliverables-what-you-can-ship)
- [Make targets (what they do)](#make-targets-from-repo-root--what-they-do)

---

## Program story (one paragraph)

This program is an **end-to-end, LLM-readable design system** for SAP Fiori / OpenUI5: it turns **API-aligned metadata** plus **light Figma signals** into a **queryable `ComponentSpec` registry**, a **FastAPI** layer for search and `validateUiPlan`, **YAML recipes** (object page, list report, and similar), **local Fiori demos** on fixed ports, **CI and governance** (including static HTML token rules), and **documentation** so people and agents stop **guessing `sap.m` and `sap.uxap` aggregations** and can prove correctness with `make`, schema validation, and browser checks.

**Typical stakeholder path:** skim `README` and `DESIGN`, read the 2-page `LLM-READABLE-ADDENDUM` for an org handoff, use `CASE_STUDY.md` as the full map, then go deep in `LLM_HUMAN_PLAYBOOK`. **Shorter “program paths” on paper:** `WORKFLOW_ZERO_TO_100` (phases), `DEMOS_LOCALHOST_8087_8088` (showcase vs subscription), `TURNING_POINT_MOMENTUM` (when delivery becomes grounded), `PLAYBOOK_INDEX` (navigation).

---

## Complete case study file — `CASE_STUDY.md` (repository root)

The file [`CASE_STUDY.md`](../../CASE_STUDY.md) is the **single Markdown roll-up** of the whole repository: it lists **every important root path** and what it is for, explains **how input → merge → store → serve → validate → prove** in the architecture, provides a **full `docs/` index**, lists **`examples/`** and ports, names **deliverables** (PPTX/PDF handouts, the HTML hub, exported slides), and documents **essential `make` targets** and **success criteria** (runnable demos, valid registry, API-legal XML, handoff without private chat history). It is kept aligned with `README.md`, `DESIGN.md`, and `GOVERNANCE.md` so there is one authoritative “what is this program” story.

---

## Root and top-level map (substance per path)

The table is the same information you would get from reading the file list with intent: each row is what that path *does* in the system. “Open raw” is for diffing or printing; you do not need the link to understand the role.

| Path | What it is in this program |
|------|---------------------------|
| [`/README.md`](../../README.md) | Project vision, **install and quickstart**, **how to call the API**, the **browser demo table** (ports and `make` targets), and **pointers to case study, deck, and publish** — first file for a new human. |
| [`/DESIGN.md`](../../DESIGN.md) | **Master spec**: how Fiori intent, the OpenUI5 API, the `ComponentSpec` registry, and Figma signals relate; **validation index**; **where to read** for agents and developers; does not replace SAP documentation. |
| [`/SAPUI5-COMPONENTS.md`](../../SAPUI5-COMPONENTS.md) | **Component catalog mindset**: which controls matter for recipes, when to use **live API** vs **`registry.json`** vs **YAML recipes**, and how JSON artifacts attach to work. |
| [`/AGENTS.md`](../../AGENTS.md) | **Non-negotiables for coding agents**: UI, registry, tests, and **static HTML token rules** (closed palette via shared CSS tokens) so marketing pages stay auditable. |
| [`/GOVERNANCE.md`](../../GOVERNANCE.md) | **Quality gates**, how registry updates are proposed and reviewed, and the **merge bar** so main stays reproducible. |
| [`/pyproject.toml`](../../pyproject.toml) | Python package name and dependencies; optional extras: `[dev]` (tests, ruff) and `[case-study]` (python-pptx, fpdf2, Pillow) for **slides and PDF handouts**. |
| [`/Makefile`](../../Makefile) | **One command surface**: `build-registry`, `validate-*`, `run-api`, all **demos (8083–8088, playbook site from 8089+)**, `all`, and **artifact** targets (PPTX, PDF, images). |
| [`/LICENSE`](../../LICENSE) | License text for the repository. |
| [`/CASE_STUDY.md`](../../CASE_STUDY.md) | **Root-level case study and map** of the program (this hub follows its structure; the `.md` is the long-form, link-complete version). |
| [`/schemas/…/component_spec.schema.json`](../../schemas/component_spec.schema.json) | **Canonical JSON Schema** for a `ComponentSpec` document: the contract the registry and API honor. |
| [`/data/registry.json`](../../data/registry.json) | **Built** registry (generated; do not hand-edit): validated against the schema, consumed by FastAPI and demos. |
| [`/data/figma/signals.yaml`](../../data/figma/signals.yaml) | **Semantic Figma hints** merged into the pipeline; **does not override** the API for what is legal in XML. |
| [`/data/top_components_seed.yaml`](../../data/top_components_seed.yaml) | Seed list driving **top-component** flows and alignment with the **8087** enterprise showcase. |
| [`/recipes/`](../../recipes/) | **YAML plus prompt-friendly templates** for common patterns: object page, list-report, dashboard, wizard, etc. |
| [`/specs/`](../../specs/) | **Foundations**, **token notes** (including how closed tokens relate to UI5), and **patterns** (shell, forms). |
| [`/src/sapui5_llm_ready/`](../../src/sapui5_llm_ready/) | **Application code**: FastAPI app, Pydantic models, extractors, Figma merge, `validateUiPlan`, recipe and PO generation helpers, and related modules. |
| [`/scripts/`](../../scripts/) | **Automation**: extract and validate, build PPTX and PDF, playbook deck, **token audit** for static HTML, and the **playbook static server** entry. |
| [`/tests/`](../../tests/) | **Tests**: contract, schema, API, Figma, governance, and **token-audit** coverage. |
| [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) | **CI pipeline** that runs the same quality expectations as local `make all` and related checks on push/PR. |

---

## Architecture — four layers of truth + data flow

From `DESIGN.md`: **none** of the rows below replace Fiori guidelines or the official API; they work together. Runtime XML must match the **pinned** OpenUI5 version; the registry helps agents **retrieve and validate** plans, not override SAP semantics.

| Layer | Authority (what you use it for) |
|-------|---------------------------------|
| Fiori (human) | **When** to use a pattern, which density, accessibility *intent* — product and UX judgment. |
| OpenUI5 / SAPUI5 API | **What** is **legal in XML** for the pinned version: real namespaces, valid aggregations, real child types, real properties. |
| ComponentSpec + `registry.json` | **Machine retrieval** and `validateUiPlan`: an auditable, queryable layer agents use instead of inventing control names. |
| `data/figma/signals.yaml` (Figma sidecar) | **Semantic hints** for variants and design intent; **not** a second source of truth for aggregations the API defines. |

### How pieces connect (pipeline)

1. **Input:** SAPUI5 API fixtures or a live doc pull is converted to `ComponentSpec` documents.
2. **Merge:** optional Figma semantics are applied to registry or patterns, without overriding API legality.
3. **Store:** `data/registry.json` is validated against the JSON Schema.
4. **Serve:** FastAPI exposes search, `getComponentSpec`, `getCompositionRules`, `getExamples`, `validateUiPlan`, etc.
5. **Generate and check:** recipes, PO validation, SAP demo validation, and `make token-audit` on static non-UI5 pages.
6. **Prove:** local OpenUI5 apps in `examples/` on the documented ports.

---

## Build a SAP Fiori / OpenUI5 application — summary, instructions, and what to follow

**Summary.** In this repository, a **ship-quality** “SAP application” means a **running OpenUI5** app whose `view.xml` uses **only** controls and **aggregations** in the **official [SAPUI5 API](https://ui5.sap.com/#/api)** for the **same UI5 version** you pinned in `index.html`, follows a **credible Fiori pattern** (e.g. object page) with **Horizon** and **compact** where the examples do, and can pass **`make` validation** and a review that asks **“which control and which aggregation is this line?”** It is not a static mockup or Figma names pasted as `sap.m` class names. Ground LLM- or hand-written XML with the registry and API, then **prove** the app with a local server and the gates below.

### What to follow (order of authority)

Later layers **never** override the OpenUI5 API for what is legal in XML.

1. **Fiori / UX** — *When* to use a pattern, density, and a11y intent. See [`DESIGN.md`](../../DESIGN.md).
2. **OpenUI5 / SAPUI5 API (pinned version)** — *What* is valid. Bookmark the API for the version in your `index.html` bootstrap.
3. **ComponentSpec + `registry.json` + FastAPI** — `make run-api` (8000): `search` / `getComponentSpec` / `validateUiPlan` with **small JSON slices**—not the whole registry. Schema: [`schemas/component_spec.schema.json`](../../schemas/component_spec.schema.json).
4. **YAML [`recipes/`](../../recipes/)** — Object page, list-report, etc.
5. **[`data/figma/signals.yaml`](../../data/figma/signals.yaml)** — Semantic **hints** only. See [`FIGMA_VS_MACHINE_TRUTH.md`](../../docs/FIGMA_VS_MACHINE_TRUTH.md).
6. **Repository rules** — [`AGENTS.md`](../../AGENTS.md) and [`GOVERNANCE.md`](../../GOVERNANCE.md).

### How to do it (step-by-step in this program)

Aligned with [`WORKFLOW_ZERO_TO_100.md`](../../docs/WORKFLOW_ZERO_TO_100.md).

1. **Environment.** Clone, venv, `pip install -e ".[dev]"` ([`README.md`](../../README.md)). Read [`DESIGN.md`](../../DESIGN.md) and [`AGENTS.md`](../../AGENTS.md) before generating UI.
2. **Pin UI5 and one pattern.** Match bootstrap version to the API docs; choose object page, list report, or worklist and a [`recipes/`](../../recipes/) file when it exists.
3. **Machine facts, small batches.** `make run-api` — pull 2–3 `ComponentSpec` objects per feature; optional `validateUiPlan` on a plan JSON.
4. **Write `view.xml` + controller.** Real `sap.*` classes only; legal aggregations; lean controllers.
5. **Run `make demo-*`.** e.g. `make demo-ui5` (8085), `make demo-showcase` (8087), `make demo-subscription` (8088). Fix OPL `blocks` / form / toolbar **structure** before CSS hacks.
6. **Validate.** `build-registry` + `validate-registry` if you touch the registry; `validate-sap-demo` on the PO path; [`VALIDATION_7STEPS_LLM.md`](../../docs/VALIDATION_7STEPS_LLM.md) + [`DESIGN_REVIEW_CHECKLIST.md`](../../docs/DESIGN_REVIEW_CHECKLIST.md) on main XML.
7. **CI-shaped gate.** `make all` (or subset in [`GOVERNANCE.md`](../../GOVERNANCE.md)); `make token-audit` for audited static non-UI5 areas. Document Figma–API conflicts with **API** winning at runtime.

### What to avoid (common failure modes)

- Inventing control names—verify in API or `registry.json`.
- Mismatched UI5 version between `index.html`, chat, and registry.
- Pasting Figma or HTML names into `view.xml` without API check.
- CSS before OPL / form structure is correct.
- Skipping `make validate-*` for the path you changed.

**Full narrative:** [`WORKFLOW_ZERO_TO_100.md`](../../docs/WORKFLOW_ZERO_TO_100.md) · [`PROMPTING_MCP_AND_STATIC.md`](../../docs/PROMPTING_MCP_AND_STATIC.md) · [`LLM_HUMAN_PLAYBOOK.md`](../../docs/LLM_HUMAN_PLAYBOOK.md)

---

## End-to-end methodology (HTML — full)

**Where:** In the static hub, open [`index.html`](index.html) in a browser with the **repository root** served (`make demo-playbook-site`) and go to the fragment **`#workflow-methodology`**.

**What it contains (same page as the rest of the hub):**

- **Problem statement** — three LLM limitations (invented UI, Figma vs API, ungrounded “done”).
- **Four-part solution** — Fiori + pattern; API + pin; `ComponentSpec` + FastAPI; `make`/CI/audit.
- **Infrastructure-as-Code analogy** — schema + `registry.json` as desired state; `make validate` and `validateUiPlan` as plan/policy; `token-audit` for static drift.
- **Prompt instructions** — copy-paste **template** + right/wrong **examples** (see also [`PROMPTING_MCP_AND_STATIC.md`](../../docs/PROMPTING_MCP_AND_STATIC.md)).
- **Best practices (throughout)** and **what to avoid (red flags)**.
- **Before / after** comparison table.
- **What made it work** — key achievements.
- **How to use the system** — read/run, retrieve, develop, gate, hand off.
- **Eleven phases** (see index table in HTML), each with: **What to do**, **Wrong** vs **Best**, **What to avoid**, **Best practices**, **Issues & solutions** — **Research & standards** → **Spec files** → **Layer/token system** → **Component extraction** → **Design token mapping (Figma)** → **MCP / access layer** → **Audit script** → **Project instructions** → **Drift detection** → **AI-readiness** → **Validation & testing**.
- **Code snippets (examples):** terminal lines `make build-registry && make validate-registry`, `make token-audit` (quoted in the HTML as practical guidance).
- **Demo image slots** for 8087 / 8088 / 8085 — replace with `<img>` to your captures under e.g. `docs/case_study/exports/images/`.

**Principles restated in that section:** start with **standards**; use **machine-readable** JSON/YAML; provide **multiple access points** (docs, API, `make`).

`CASE_STUDY_HUB.md` does not duplicate the full 11 phase blocks; use the **HTML** for the complete layout.

---

## Start here (reading order — content summary)

The **HTML** hub is a **structured summary**. The **complete** machine-readable map remains in `CASE_STUDY.md`. The subsections below state **what you learn** from each artifact. **OpenUI5** UIs are exercised via **localhost** with servers running (see [Run the OpenUI5 demos](#run-the-openui5-demos-separate-terminals)).

### `DESIGN.md` — master spec

Ties together Fiori, the API, the registry, and Figma; points to validation and reading order. Use it to resolve “what is authoritative for XML vs what is design intent.”

- Open: [`../../DESIGN.md`](../../DESIGN.md)

### `README.md` — how to run the program

Installation, venv, `make` quick path, **API URL and health**, and the **full demo port table**.

- Open: [`../../README.md`](../../README.md)

### `AGENTS.md` + `docs/PLAYBOOK_INDEX.md`

`AGENTS` sets session rules for agents. `PLAYBOOK_INDEX` is the **hub** that lists every other playbook and workflow file with one-line use cases.

- Open: [`../../AGENTS.md`](../../AGENTS.md) · [`../../docs/PLAYBOOK_INDEX.md`](../../docs/PLAYBOOK_INDEX.md)

### `docs/TURNING_POINT_MOMENTUM.md`

Describes the **inflection** when work becomes grounded: spec, `make`, and browser, not unbounded chat.

- Open: [`../../docs/TURNING_POINT_MOMENTUM.md`](../../docs/TURNING_POINT_MOMENTUM.md)

### `docs/LLM-READABLE-ADDENDUM.md`

Two-page **organizational** handoff: why API + registry + recipes + CI matter for design-system owners.

- Open: [`../../docs/LLM-READABLE-ADDENDUM.md`](../../docs/LLM-READABLE-ADDENDUM.md)

---

## Zero → 100% (phases at a glance)

Full narrative and “wrong vs best” prompt patterns: [`WORKFLOW_ZERO_TO_100.md`](../../docs/WORKFLOW_ZERO_TO_100.md) — the list below is the **substance in brief**.

1. **0–20%:** Pin the UI5 version; read `DESIGN.md` and the API for the **pattern** — not Figma control names as class names.
2. **20–40%:** Use a **recipe + ComponentSpec** via MCP/HTTP or **small JSON slices** — not dumping all of `registry.json` into a prompt.
3. **40–60%:** `view.xml` and controller: only **real `sap.*`** and **legal aggregations**.
4. **60–80%:** Run `make demo-*`; fix **structure** (OPL `blocks`, forms) before ad hoc CSS.
5. **80–95%:** `make validate-*`, the 7-step checklist, and line-level “**which control and which aggregation?**” on XML.
6. **95–100%:** Stakeholder-ready; Figma–API disagreements are **documented** with API winning for **runtime** behavior.

---

## Localhost :8087 and :8088 (approach and outcome)

Full narrative: [`DEMOS_LOCALHOST_8087_8088.md`](../../docs/DEMOS_LOCALHOST_8087_8088.md) — the summaries below are the operational view.

### localhost:8087 — enterprise “LLM readiness” showcase

- **Command:** `make demo-showcase`
- **Approach:** Object Page Layout with `top_components_seed.yaml`-aligned `sap.m` building blocks, SimpleForm and Table, **two JSON models**, no OData.
- **Proves:** A credible “LLM readiness” screen — search, MessageStrip, form density, and a deliverables-style table.

### 127.0.0.1:8088 — B2B subscription and billing (OPL)

- **Command:** `make demo-subscription`
- **Approach:** Full OPL sections, in-memory state, **Unsubscribe / Re-subscribe** dialogs, progress and stage modeling.
- **Engineering note:** In `Subscription.view.xml` avoid `OverflowToolbar` plus a tall `VBox` clipping the header; the shipped pattern uses `HBox` and `FlexItemData` (see XML comments in that view).

---

## The moment things start to happen

The long read is [`TURNING_POINT_MOMENTUM.md`](../../docs/TURNING_POINT_MOMENTUM.md) (you fill in *your* sprint: what you did, what the assistant produced, what `make` disproved). The **idea** on one page:

- **The flip:** conversation becomes **grounded** in spec + `make` + browser instead of endless unvalidated text.
- **Your action:** you own API-legal IDs and **gates before “done”** (validations, review).
- **Agent:** proposes drafts that stay **inside the rails**; you merge or reject.
- **Repo:** registry and `make` are the **repeatable judge** the next person can run.

---

## Examples folder (runnable and static)

| Path | What lives there (substance) |
|------|-----------------------------|
| `examples/purchase-order/` | Full PO vertical slice: **UI5 shell** on **8085**, a **React** mirror, **pitch** and **deck** static story (8084/8083), and [`DEMO-INSTRUCTIONS`](../purchase-order/DEMO-INSTRUCTIONS.md) for how to drive the demos. |
| `examples/enterprise-llm-showcase/` | **8087** — OPL “LLM readiness” experience aligned with the **top-components seed** and enterprise tables/forms patterns. |
| `examples/subscription-billing/` | **8088** — B2B subscription and billing **object page** with dialogs and stateful client models. |
| `examples/llm-playbook-comparison/` | Static **React vs Fiori** concept comparison (HTML) for teaching control analogies, not a runtime Fiori app. |
| `examples/llm-playbook-case-study/` | **This static hub**: `index.html` + CSS; includes **Build a SAP Fiori / OpenUI5 application** (summary, authority order, steps, avoid-list); `CASE_STUDY_HUB.md` mirrors it. `make demo-playbook-site` from repo root so `/docs/*.md` resolves. |
| `examples/purchase-order/demo/_shared/llm-tokens.css` | **Closed** design-token surface for **non-UI5** static pages; the gate is `make token-audit` so raw hex and off-token styling do not spread. |

---

## Run the OpenUI5 demos (separate terminals)

**localhost** URLs only work on **your** machine with the matching `make` server. If the tab shows *connection refused*, start the target from the **repo root** and keep that terminal open.

- <http://localhost:8087/> — LLM showcase (`make demo-showcase`)
- <http://127.0.0.1:8088/> — Subscription OPL (`make demo-subscription`)
- <http://localhost:8085/> — PO demo (`make demo-ui5`)

---

## All documentation in `docs/` (what each file is for)

Serve the repository from its root (or use the links below) so each file opens as raw text. **Each block** is the **purpose and contents**; the link is optional if you have already read the summary.

### `PLAYBOOK_INDEX.md`

Central **navigation hub**: one table of every important playbook, workflow, and addendum with a **“use for”** column — the fastest way to pick the right doc after `README` and `DESIGN`.

- [`../../docs/PLAYBOOK_INDEX.md`](../../docs/PLAYBOOK_INDEX.md)

### `LLM_HUMAN_PLAYBOOK.md`

Long-form **story**: the idea, end-to-end process, before/after, JSON and registry, Fiori and Figma, React vs Fiori positioning, and how humans and models share the same facts.

- [`../../docs/LLM_HUMAN_PLAYBOOK.md`](../../docs/LLM_HUMAN_PLAYBOOK.md)

### `LLM-READABLE-ADDENDUM.md`

~Two pages for **design org / platform** stakeholders: why the API and registry are the contract, how recipes and CI make outputs inspectable, and how this maps to a serious LLM-facing design system.

- [`../../docs/LLM-READABLE-ADDENDUM.md`](../../docs/LLM-READABLE-ADDENDUM.md)

### `COMPARISON_PANDYA.md`

Maps the repository to the **“Expose your design system to LLMs”** article: retrieval, closed tokens for static content, and why dumping PDF-only guidelines fails for models.

- [`../../docs/COMPARISON_PANDYA.md`](../../docs/COMPARISON_PANDYA.md)

### `WORKFLOW_ZERO_TO_100.md`

**Phased** path from pinning UI5 through validation: wrong vs right prompts, common issues, ties to ports **8085 / 8087 / 8088** and the playbook demos.

- [`../../docs/WORKFLOW_ZERO_TO_100.md`](../../docs/WORKFLOW_ZERO_TO_100.md)

### `DEMOS_LOCALHOST_8087_8088.md`

**Deep dive** on the enterprise showcase vs subscription OPL: approach, data, `top_components_seed`, subscription flows, and **XML and layout** lessons (OPL, toolbars, flex).

- [`../../docs/DEMOS_LOCALHOST_8087_8088.md`](../../docs/DEMOS_LOCALHOST_8087_8088.md)

### `TURNING_POINT_MOMENTUM.md`

When delivery **turns a corner**: grounding in spec, `make`, and the browser; template for attributing work to you, the assistant, and the repository’s checks.

- [`../../docs/TURNING_POINT_MOMENTUM.md`](../../docs/TURNING_POINT_MOMENTUM.md)

### `PROMPTING_MCP_AND_STATIC.md`

When to use **MCP** (tool-bound retrieval), **static** file context, or **direct HTTP** to the API; includes a 4-step prompt template and do/do-not examples.

- [`../../docs/PROMPTING_MCP_AND_STATIC.md`](../../docs/PROMPTING_MCP_AND_STATIC.md)

### `VALIDATION_7STEPS_LLM.md`

Seven **checklist steps** for LLM-generated or agent-generated UI5 XML before you call it done.

- [`../../docs/VALIDATION_7STEPS_LLM.md`](../../docs/VALIDATION_7STEPS_LLM.md)

### `DESIGN_REVIEW_CHECKLIST.md`

Merge and design-review **gate**: questions that tie each visible line to a control and aggregation, plus agent QA lines.

- [`../../docs/DESIGN_REVIEW_CHECKLIST.md`](../../docs/DESIGN_REVIEW_CHECKLIST.md)

### `FIGMA_VS_MACHINE_TRUTH.md`

Why a Figma frame is **not** the same as a compiling OpenUI5 view; which side wins for runtime and how to document differences.

- [`../../docs/FIGMA_VS_MACHINE_TRUTH.md`](../../docs/FIGMA_VS_MACHINE_TRUTH.md)

### `ERROR_HANDLING_LLM.md`

Catalog of **common errors** (wrong controls, bad aggregations, connection issues) and how to correct course in prompts and code.

- [`../../docs/ERROR_HANDLING_LLM.md`](../../docs/ERROR_HANDLING_LLM.md)

### `GITHUB_PUBLISH.md`

How to **publish the repo** and what external replicators need (clone, no internal-only secrets for the offline path).

- [`../../docs/GITHUB_PUBLISH.md`](../../docs/GITHUB_PUBLISH.md)

### `case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`

Long **narrative** case study: problem, MVP, SAP guidelines, pain points, collaboration, replication — aligned with the shorter PPTX/PDF artifacts.

- [`../../docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`](../../docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md)

### `case_study/PLAYBOOK_DECK_OUTLINE.md`

**Editor** outline for the full playbook deck: parts, slide themes, and how to sync with the generated PPTX.

- [`../../docs/case_study/PLAYBOOK_DECK_OUTLINE.md`](../../docs/case_study/PLAYBOOK_DECK_OUTLINE.md)

### `case_study/README.md`

Build commands for the case-study **exports** (PPTX, PDF, handout, images) and the relationship between narrative doc and **this HTML hub**.

- [`../../docs/case_study/README.md`](../../docs/case_study/README.md)

---

## Handout deliverables (what you can ship)

| Output | What it is / how to produce it |
|--------|-------------------------------|
| **This static HTML presentation** | Serves from repo root via `make demo-playbook-site` (script finds a free port from 8089, optional browser open) — [index.html](index.html) with `/docs` and root `*.md` as raw text when served. |
| **This Markdown edition** | [`CASE_STUDY_HUB.md`](CASE_STUDY_HUB.md) (this file) — same narrative as the HTML hub; use for print, PRs, or offline reading. |
| **Root case study (Markdown) ★** | [`/CASE_STUDY.md`](../../CASE_STUDY.md) — full repository map; also copied as `docs/case_study/exports/SAP_Repository_Case_Study_Handout.md` when you run `make case-study-artifacts`. |
| **Repository case study PDF (optional)** | `make case-study-artifacts` (needs `[case-study]` extra) also emits `docs/case_study/exports/SAP_Repository_Case_Study_Handout.pdf` alongside the shorter narrative PDF. |
| **Full playbook PPTX (70+ slides)** | `make playbook-presentation` → `docs/case_study/exports/SAP_LLM_Playbook_Full.pptx` — large deck (skills, workflow, localhost, turning point, governance). |
| **Shorter narrative PPTX + PDF** | `make case-study-artifacts` → `docs/case_study/exports/SAP_Prompt_Case_Study.pptx` and `SAP_Prompt_Case_Study.pdf`. |
| **PNG slides / localhost shots** | `make playbook-images` and capture scripts → `docs/case_study/exports/images/` (illustrative or live with demos running). |

---

## Make targets (from repo root — what they do)

- **`make demo-playbook-site`** — runs `scripts/serve_playbook_case_study.py` on **127.0.0.1**, first free port from **8089** (or `PLAYBOOK_SITE_PORT`), opens a browser unless `--no-open`.
- **`make install`** — `pip install -e ".[dev]"` (tests and ruff; not the case-study extras).
- **`make build-registry` / `make validate-registry`** — extract/merge and **validate `data/registry.json`** against the JSON Schema.
- **`make run-api`** — FastAPI on **8000** with `/health` and component endpoints for retrieval and `validateUiPlan`.
- **`make all`** — **lint**, registry, **tests**, PO generation validation, SAP PO demo validation, and `make token-audit` on static non-UI5 trees.
- **`make demo-ui5`** — PO shell on **8085**; **`make demo-showcase`** — **8087**; **`make demo-subscription`** — **8088**.
- **`make demo-deck` (8083), `make demo-pitch` (8084), `make demo-react` (8086)** — see [`Makefile`](../../Makefile) for the exact `http.server` directories.
- **`make playbook-presentation`** — writes `docs/case_study/exports/SAP_LLM_Playbook_Full.pptx`.
- **`make case-study-artifacts`** — shorter narrative PPTX/PDF and **repository handout** MD+PDF (install `.[case-study]`).
- **`make token-audit`** — fails if **raw hex or forbidden px** appear outside the closed token file for the audited static areas.

**Tip:** if **8089** is taken, the script picks the next free port. Set `PLAYBOOK_SITE_PORT=8095` to start the search from another base port.
