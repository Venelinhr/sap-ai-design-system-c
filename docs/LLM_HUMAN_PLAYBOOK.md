# LLM + human playbook — SAP Fiori / OpenUI5 readable design system (full briefing)

**Purpose:** One document for **stakeholder presentations**, **onboarding engineers**, and **AI agent** session prep. **Companion** to [`DESIGN.md`](../DESIGN.md) (master spec) and [`SAPUI5-COMPONENTS.md`](../SAPUI5-COMPONENTS.md) (component index map).

**Audience:** Humans (architects, UX, devs) and **LLM** systems instructed to **read** this file **before** generating SAPUI5 UI.

---

## Table of contents

1. [Idea and motivation](#1-idea-and-motivation)  
2. [Start: what we built and where](#2-start-what-we-built-and-where)  
3. [Process: end-to-end workflow](#3-process-end-to-end-workflow)  · **Step-by-step (phases, gaps, prompts):** [`docs/WORKFLOW_ZERO_TO_100.md`](WORKFLOW_ZERO_TO_100.md)  
4. [Issues (before / after LLM-assisted design)](#4-issues-before--after-llm-assisted-design)  
5. [Solutions: architecture](#5-solutions-architecture)  
6. [Why read SAP guidelines and API *before* build](#6-why-read-sap-guidelines-and-api-before-build)  
7. [JSON structure (ComponentSpec)](#7-json-structure-componentspec)  
8. [Figma: why it is not enough](#8-figma-why-it-is-not-enough)  
9. [How an LLM should read — and why “PDF only” fails](#9-how-an-llm-should-read--and-why-pdf-only-fails)  
10. [Design token system (three layers)](#10-design-token-system-three-layers)  
11. [Validation: 7 steps + merge checklist](#11-validation-7-steps--merge-checklist)  
12. [Property, token, composition, a11y, patterns, AI hints](#12-property-token-composition-a11y-patterns-ai-hints)  
13. [How to prompt: MCP vs static vs direct](#13-how-to-prompt-mcp-vs-static-vs-direct)  
14. [5-step validation workflow (condensed)](#14-5-step-validation-workflow-condensed)  
15. [Error handling](#15-error-handling)  
16. [HTML + React examples (vs Fiori XML)](#16-html--react-examples-vs-fiori-xml)  
17. [Why this result is “best” for this program](#17-why-this-result-is-best-for-this-program)  
18. [How others can start](#18-how-others-can-start)  
19. [Integration: Claude, Cursor, ChatGPT, Windsurf](#19-integration-claude-cursor-chatgpt-windsurf)  
20. [References](#20-references)

---

## 1. Idea and motivation

**Idea:** Large language models can **draft** SAP Fiori–style UIs **fast**, but only if they are **constrained** by the **same** **sources of truth** as a senior UI5 developer: the **OpenUI5 API**, **Fiori patterns**, and a **machine-readable** **component** **index** (JSON) with **recipes** and **CI** **validation**.

**Without** that layer, LLMs **hallucinate** control names, **break** `sap.uxap` **aggregations**, and **patch** “padding” with CSS when the root cause is **structural** (e.g. two OPL `blocks` side by side, or `ProgressIndicator` + long `displayValue` in **compact**).

---

## 2. Start: what we built and where

| What | Where |
|------|--------|
| **Master spec** | [`DESIGN.md`](../DESIGN.md) |
| **Component index map** | [`SAPUI5-COMPONENTS.md`](../SAPUI5-COMPONENTS.md) |
| **JSON Schema** | `schemas/component_spec.schema.json` |
| **Registry (built)** | `data/registry.json` |
| **API (retrieval / validate)** | `src/sapui5_llm_ready/api.py` — `make run-api` |
| **Recipes (YAML + prompt)** | `recipes/*` |
| **Specs (foundations, tokens, patterns)** | `specs/` |
| **Agent rules** | `AGENTS.md` |
| **Addendum (org hub)** | `docs/LLM-READABLE-ADDENDUM.md` |
| **Case study** | `docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md` |

**Start here (ordered):** (1) [SAPUI5 API](https://ui5.sap.com/#/api) for your version (2) `DESIGN.md` (3) `AGENTS.md` (4) this playbook.

---

## 3. Process: end-to-end workflow

1. **Capture** product intent (Object Page, worklist, …).  
2. **Map** to a **recipe** in `recipes/`.  
3. **Resolve** each control to **ComponentSpec** / API **(no invented ids)**.  
4. **Generate** `view.xml` + controller + model.  
5. **Validate** (7 steps, `make`, design review with **agent QA** line).  
6. **Run** demo (`make demo-ui5`, `make demo-subscription`, …) and **iterate** on **evidence** (DOM, not vibes).

**Collaboration:** UX sets **Fiori** **intent**; UI5 **SMEs** **enforce** **aggregations**; platform **SMEs** keep **registry** + **CI** **green**; **agent** authors **ground** **prompts** in **retrieved** **specs**.

---

## 4. Issues (before / after LLM-assisted design)

| Before (classic + raw LLM) | After (this approach) |
|----------------------------|------------------------|
| Design = PDF/FIGMA + chat | Design intent + **API** + **JSON** + **recipes** + **CI** |
| “Fix padding in CSS” | Fix **control** **placement** in **aggregations** first |
| Unbounded model **memory** of SAP APIs | **Retrieval** of **slices** + **registry** **lookup** |
| **No** audit trail | **Prompt → spec** **lines** + **validateUiPlan** / grep **gates** possible |
| Figma “component name” = control name? | Figma = **input** to **signals**; **API** = **truth** |

---

## 5. Solutions: architecture

- **ComponentSpec** encodes **props**, **slots/aggregations**, **composition** hints, **a11y** notes.  
- **FastAPI** exposes **search**, **getComponentSpec**, **getCompositionRules**, **validateUiPlan** (see `README.md`).  
- **MVP slices:** registry → API → validation → demos (subscription OPL, PO, showcase).  
- **Governance** in `GOVERNANCE.md` and **tests** in `tests/`.

*(Optional **Model Context Protocol (MCP)**): wire tools that call the same **functions** as the HTTP API so **Claude Desktop** can use **tool** **calls** instead of pasting JSON — the **validity** **rules** are unchanged.)*

---

## 6. Why read SAP guidelines and API *before* build

- The **API** is the **only** **complete** list of **legal** **children** in each **aggregation** for your **version**.  
- Fiori **guidelines** tell you **not** to use a **date** **picker** where a **Text** is wrong — the **control** list still comes from the **API**.  
- **Building first** and **validating** later **multiplies** **rework**; **one** **wrong** **parent** **child** can break the **entire** **view**.

---

## 7. JSON structure (ComponentSpec)

The canonical shape is in `schemas/component_spec.schema.json`. **Required** top-level fields include: `schemaVersion`, `id` (e.g. `sap.m.Button`), `name`, `source`, `category`, `status`, `props`, `events`, `slots` (aggregations), `composition`, `tokens`, `a11y`, `examples`, `versioning`.

**Principle for agents:** if it is not in the **API** and not in your **curated** **registry** **slice**, **do not** emit it in **production** **XML**.

---

## 8. Figma: why it is not enough

See `docs/FIGMA_VS_MACHINE_TRUTH.md`. Summary: Figma is **not** a **compiling** **specification** of `sap.uxap` / `sap.m` **aggregations**. We use **`data/figma/signals.yaml`** as a **soft** **input** only.

---

## 9. How an LLM should read — and why “PDF only” fails

- **PDF/Confluence** are **narrative**; they **rarely** list **every** **enum** and **default** for **ProgressIndicator** in **compact**.  
- **LLM-readable** = **retrievable** **JSON** + **API** **links** + **automated** **validators**.  
- **“Not possible”** to **reliably** **generate** **valid** **SAP** **UI** from **Figma** **alone** or **vibes** **alone**; it **is** **possible** with **API** + **registry** + **discipline**.

---

## 10. Design token system (three layers)

1. **SAP theme / density** in OpenUI5 bootstraps (`sap_horizon`, `sapUiSizeCompact`) — see `specs/tokens/closed-sapui5-fiori-set.md`.  
2. **Figma** **signals** in YAML — **semantic**, **not** **compiler** **truth**.  
3. **Static** **non-UI5** pages: **`llm-tokens.css`** only — `make token-audit`.

---

## 11. Validation: 7 steps + merge checklist

- **7 steps:** `docs/VALIDATION_7STEPS_LLM.md`  
- **Merge / human review:** `docs/DESIGN_REVIEW_CHECKLIST.md` (includes **agent QA** on control **id** + **aggregation** per XML line)  

---

## 12. Property, token, composition, a11y, patterns, AI hints

| Dimension | Check |
|----------|--------|
| **Property names** | Match API; run **grep** for **invalid** **attributes** if needed |
| **Tokens** | Theme/density/closed CSS per layer (§10) |
| **Composition** | `getCompositionRules` / API **Aggregations** |
| **A11y** | Labels, `MessageStrip` **type**, focus |
| **Common patterns** | OPL one-column stack, **PI** + **text** **split** in **compact** |
| **AI hints** | `intentTags` in schema; **recipes** **tags**; **Pandya**-style **closed** **choices** in `docs/COMPARISON_PANDYA.md` |

---

## 13. How to prompt: MCP vs static vs direct

**Full** detail: `docs/PROMPTING_MCP_AND_STATIC.md`. **Summary:**

- **MCP (recommended** with Claude Desktop**):** tools = **getComponentSpec** / **search** (same **logic** as **HTTP** **API**).  
- **Static:** attach `DESIGN.md` + small **JSON** + **4-step** **template**.  
- **Direct files:** hand-edit **one** **ComponentSpec** **JSON** per **control** **family** in prompt — **not** the **whole** **registry**.

---

## 14. 5-step validation workflow (condensed)

1. Read documentation (API + spec + recipe)  
2. Select components and aggregations  
3. Validate **choice** against **schema** + **API**  
4. Generate code  
5. Validate **output** (`make`, 7-step, **agent** **QA**)

---

## 15. Error handling

See `docs/ERROR_HANDLING_LLM.md` (component not found, property mismatch, hardcoded **layout** **hacks**, composition **violations**).

---

## 16. HTML + React examples (vs Fiori XML)

**Why show React?** Many teams know **HTML/React** but not **OpenUI5** **XML** **immediately**. The **same** **fields** (PO number, supplier) can be:

- **React** (`examples/purchase-order/react/PurchaseOrderForm.tsx`) — **plain** `input` / `label` — **for** **learning** **only**; **not** a **Fiori** **runtime** **substitute** in this repo’s **SAP** **demos**.  
- **OpenUI5** (`examples/purchase-order/demo/ui5/webapp/view/PurchaseOrder.view.xml`) — **sap.m** + **form** **controls** — **this** is the **Fiori**-aligned **pattern** for **SAP** **cockpits**.

**Educational** **side-by-side** (browser): `examples/llm-playbook-comparison/fiori-concepts-vs-react.html`

**When React is the “right” structure:** in a **non-SAP** app or a **separate** **micro-frontend** — **not** **mixed** **inside** a **Fiori** **XML** **view** without a **documented** **bridge**.

**When Fiori XML is the right structure:** for **this** project’s **SAP** **OpenUI5** **demos** and **any** app **intended** to run **on** **sap-ui-core** with **Horizon** **theme** **governance**.

---

## 17. Why this result is “best” for this program

- **Reproducible** (`make` + **tests**).  
- **Auditable** (spec + API **alignment**).  
- **Teachable** (case study + OPL + PO **demos**).  
- **Extensible** (registry **extractor** can **track** new **UI5** **versions** — **bump** **schema** when **required**).

**“Best”** = **optimal** under **constraint** of **true** **SAP** **UI5** **semantics** + **LLM** **limitations**; it is **not** “fastest** **unvalidated** **chat**”.

---

## 18. How others can start

1. `git clone` → `pip install -e ".[dev]"`  
2. `make build-registry && make validate-registry`  
3. `make run-api` + `make demo-ui5` **or** `make demo-subscription`  
4. Read `DESIGN.md` + `docs/LLM-READABLE-ADDENDUM.md`  
5. Copy `docs/PROMPTING_MCP_AND_STATIC.md` **prompt** **templates** into your **org**’s **wiki**

---

## 19. Integration: Claude, Cursor, ChatGPT, Windsurf

| Tool | Practice |
|------|----------|
| **Claude Desktop** | **MCP** if available; else attach **files** from §2 |
| **Claude Code / Cursor / Windsurf** | **Workspace** = repo root; **@** **DESIGN.md**; **.cursor** **skills** for **OPL** **playbook** if copied |
| **ChatGPT** | **Upload** **only** **relevant** **sections**; **link** to **public** **SAP** **API** |

---

## 20. References

- `README.md`, `GOVERNANCE.md`  
- `docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`  
- `docs/case_study/exports/` — generated **.pptx** (run `make playbook-presentation` after installing `[case-study]`)  
- [SAPUI5 API](https://ui5.sap.com/#/api)  
- [Pandya — LLM design systems](https://hvpandya.com/llm-design-systems) (mapped in `docs/COMPARISON_PANDYA.md`)  

---

*This file is the **narrative** **superset**; **slim** **hub** **pages** are `DESIGN.md` and `LLM-READABLE-ADDENDUM.md`. For a **34-slide** deck, run **`make playbook-presentation`** → `docs/case_study/exports/SAP_LLM_Playbook_Full.pptx` (see `README.md`).*
