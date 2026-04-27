# Case study: Building an SAP Fiori–style application with prompts — a readable system for people and LLM agents

**Subtitle:** How we combined **MVP (Minimum Viable Product) delivery**, **credible source-of-truth** practices, and **official SAP (OpenUI5) guidelines** to make prompt-driven UI generation **auditable** and **runnable** — and what hurt along the way.

**Repository:** [sapui5-llm-ready](https://github.com/) *(replace with your public URL after publish)*  
**Date:** April 2026

---

## Executive summary

Enterprise teams want to use **large language models (LLMs)** to **accelerate** delivery of **SAP Fiori–style** UIs (Object Page, forms, tables, shell patterns). The gap is not “the model is dumb”; the gap is that **classical design handoffs** (PDFs, Confluence, Figma screenshots) are **not sufficient** for a **generator** to emit **valid** `sap.uxap` and `sap.m` view XML, bound to a **known** data contract, without inventing control names, illegal **aggregations**, or layout patterns that the **OpenUI5 API** does not support.

This case study documents an **end-to-end approach** implemented in a **real, installable repository**:

1. **Machine-readable** component metadata aligned to the **SAPUI5 API** (JSON registry + JSON Schema).
2. **Retrieval and validation** (FastAPI service, `make` targets, contract tests) so that **“prompt to application”** is a **pipeline**, not a one-off chat.
3. **Fiori-aligned demos** (Purchase Order, subscription-billing Object Page, enterprise showcase) that **external users** can run **locally** with `make` and a browser.

We highlight **collaboration** between **design/UX intent**, **SAP UI5 expertise**, and **ML/agent engineering**, and we list **key pain points** (density, OPL `blocks`, ProgressIndicator in compact, etc.) with the **mitigations** we actually applied.

*Terminology note:* In some discussions **“MCP”** is used loosely. This document uses **MVP** for **Minimum Viable Product** (iterative, shippable slices). Where **Model Context Protocol (MCP)** is relevant, we mean the **industry pattern** of giving agents **tools** and **context** in a structured way; this repo’s **mechanical** truth remains the **OpenUI5 API** + **registry** + **CI** — not a specific MCP server implementation.

---

## 1. Problem statement

### 1.1 Business problem

- **Time-to-value:** Business stakeholders expect **faster** iteration on SAP-style cockpits and transactional UIs.  
- **Cost:** Manually **rewriting** invalid LLM output costs more than a careful **constrained** generation setup.  
- **Risk:** **Off-pattern** density, a11y, and information architecture without an **objective** gate creates **rework** and **compliance** doubt.  
- **Trust:** Stakeholders ask: *“Can we show **which** fact justified **this** line of XML?”* A pure chat log does not answer that.

### 1.2 Technical problem

- **No unique parse** from design prose to **one** `sap.m.`* / `sap.uxap.*` class and its **valid children**.  
- **Hundreds of incompatible layout patterns** (e.g. two OPL `blocks` in one sub-section **vs.** one full-width `VBox`) are not disambiguated by “make it look like the reference.”  
- **Compact density** (`sapUiSizeCompact`) changes real behaviour (e.g. `ProgressIndicator` value row), which generic CSS advice cannot fix.  
- **Unbounded context** in the model window encourages **invention**. Prefer **retrieval** of **slices** of the API-aligned registry and **one** **pattern recipe** per task.

### 1.3 What “success” meant for this program

- A **runnable** SAPUI5 **demo** that passes **local validation** and looks **Fiori-credible** on a desktop browser.  
- A **registrar** and **API** that **external developers** (and agent harnesses) can call **deterministically**.  
- **Documentation** that allows **replication** without access to our internal **chat** history.

---

## 2. Solution overview

### 2.1 Three layers (none replaces SAP Fiori)


| Layer                    | Role                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Fiori & UX**           | *When* to use object page, forms, worklist, density — the **human** design language.                                      |
| **OpenUI5 / SAPUI5 API** | *What* is **legal** for each control: modules, **aggregations**, types, **properties**. **Authoritative** for generation. |
| **Machine index**        | `ComponentSpec` + **versioned** `data/registry.json` + **recipes** so agents **query** and **validate**, not **guess**.   |


**Plain language:** We did **not** try to “replace Fiori with JSON.” We **anchored** automation to the **same** **official** **building blocks** the runtime already enforces.

### 2.2 Repository capabilities (this codebase)

- **Schema:** `schemas/component_spec.schema.json`  
- **Registry build:** `scripts/extract_sapui5.py` (fixture- or **live-**sourced API docs, with **fallbacks** for offline work)  
- **FastAPI** surface: `searchComponents`, `getComponentSpec`, `getCompositionRules`, `getExamples`, `validateUiPlan`  
- **Recipes:** YAML patterns for common enterprise UIs in `recipes/`  
- **Demos:** Static OpenUI5 apps served via `python -m http.server` with **documented** ports (e.g. PO demo **8085**, subscription OPL **8088**, showcase **8087**)

### 2.3 Prompt → application (conceptual pipeline)

1. **Intent** from a business prompt (e.g. “B2B subscription billing cockpit, object page, approval path”).
2. **Parse** to pattern + controls (OPL, sections, `SimpleForm`, `Table`, `MessageStrip`, …).
3. **Retrieve** relevant **ComponentSpec** rows and **one** **object-page** (or other) **recipe** slice.
4. **Generate** view(s), controller, JSON model.
5. **Validate** against schema, aggregation rules, and project **Make** jobs.
6. **Run** locally (`make demo-subscription` / `make demo-ui5`, etc.) and **review** in browser.

This mirrors the **Mermaid** flow in `docs/LLM-READABLE-ADDENDUM.md` and the **partner** narrative for stakeholders.

---

## 3. Approach

### 3.1 Minimum Viable Product (MVP) methodology

We shipped in **vertical slices** that each **run** and **teach** something, instead of a monolithic “perfect” system.


| Sprint / slice       | Outcome                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Registry**         | `ComponentSpec` + extractor + `data/registry.json` with **fixtures** (offline).                        |
| **API**              | FastAPI + **tests** for **deterministic** responses.                                                   |
| **Validation**       | `make validate-registry`, `validate-po`, `validate-sap-demo`, `token-audit` for static HTML.           |
| **Showcase**         | `enterprise-llm-showcase` for **control literacy**.                                                    |
| **Object Page demo** | `subscription-billing` — real **OPL** layout lessons (`blocks`, `Panel`, `ProgressIndicator`, titles). |
| **Governance**       | `GOVERNANCE.md`, `docs/DESIGN_REVIEW_CHECKLIST.md` (including the **one-line agent QA** for XML).      |


**Principle:** If a slice does not **build** and **run** in CI (or a documented **local** path), it is not “done,” even if the model output “looks” fine in chat.

### 3.2 Verification from credible sources

**Order of trust** (see `references/source-of-truth.md` in the OPL **skill** package, and `AGENTS.md` in this repo):

1. **SAPUI5 / OpenUI5 API** for the **pinned** version.
2. **Fiori** pattern documentation (for *which* control family to use).
3. **In-repo** `view/*.xml`, `index.html`, `Makefile`.
4. **Runtime** evidence (DOM, logs, screenshot) for layout disputes.
5. **Forums / LLM prose** — **hints only** until verified in (1) or (4).

**Anti-pattern:** Tuning layout with `setTimeout` or **unproven** `!important` on `sap.uxap` **internals** before **structure** (aggregations, flex, one `blocks` container) is **fixed**.

### 3.3 Adherence to official SAP guidelines

- **Controls:** Only `sap.m`, `sap.ui.layout`, `sap.uxap`, etc. as in the **API** — no fictitious `sap.m.FancyWidget`.  
- **Theme and density:** Demos use **documented** bootstraps (`sap_horizon`, `sapUiSizeCompact`) consistent with Fiori expectations for **this** program.  
- **Design review:** `docs/DESIGN_REVIEW_CHECKLIST.md` — **“Which control ID and aggregation does this line of XML come from?”** for LLM-touched `view` XML.  
- **Addendum** for org hubs: `docs/LLM-READABLE-ADDENDUM.md` (§1 API, §2 JSON/YAML index).

### 3.4 Making the system “readable” for AI / LLM agents

- **JSON Schema** and **registry** = **unambiguous** control IDs and allowed **composition** paths.  
- **Recipes** = **opinionated** “do this for object page B2B” with **do/don’t** from **field** experience.  
- **Retrieval, not** dumping the whole API into the **context window**.  
- **Gates** in CI: registry validation, **SAP** **demo** XML checks, **token** audit for static marketing HTML.

### 3.5 Collaborative efforts

- **SMEs (UI5 / Fiori):** Caught illegal aggregations, **RGL** column semantics, and **OPL** `blocks` behaviour.  
- **Platform / MLOps style:** Exposed the registry via **API**, tests, and **reproducible** `make` **targets**.  
- **Design / product:** Aligned on **Fiori** look-and-feel and **MVP** scope (what is “good enough” for a **credible** demo).  
- **Agent authors:** Wrote **prompts** and **RAG** wiring **consistent** with `AGENTS.md` and **Pandya**-style [LLM design system](https://hvpandya.com/llm-design-systems) **principles** as mapped in `docs/COMPARISON_PANDYA.md`.

---

## 4. Step-by-step: building the SAP application with prompts (as practiced in this repo)

This is a process you can follow in your environment; exact prompts vary by org.

### 4.1 Environment

```bash
cd sapui5-llm-ready
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
make build-registry && make seed-top20 && make validate-registry
```

### 4.2 Ground every generation step

- Before asking an LLM to **emit** XML, **retrieve** (or hand-paste) **ComponentSpec** for the controls you will use.  
- Attach the **relevant** **recipe** (e.g. `recipes/object-page.yaml`).  
- For **structural** layout bugs, read **OPL** **API** and **one** good **in-repo** view as reference (subscription demo).

### 4.3 Generate, validate, run

- Run `**make validate-sap-demo`** and `**make validate-po**` as applicable.  
- Start the **right** **demo** server: e.g. `make demo-subscription` → `http://127.0.0.1:8088` (if **refused**, no server is running).  
- **Hard refresh** the browser to pick up static **XML/JS** changes.

### 4.4 Tighten with evidence

- For **sceptical** “padding” on `**ProgressIndicator`**, measure (or follow the case study) **value row** + **long** `displayValue` in **compact** — usually **structural** (move long text to `m:Text`, short `displayValue` for percent with a **formatter**).  
- For “two columns in one sub-section,” check **sibling** `**blocks`** — often replace with one `**VBox` `width="100%"**`.

### 4.5 Ship and document

- Remove **debug** `fetch` / ingest from **production** paths (see `GOVERNANCE.md`).  
- Update **AGENTS.md** and **recipes** if the **flow** of the demo **changed** meaningfully.  
- Optional: copy the **OPL** **playbook** skill into `**.cursor/skills/`** for your team (see `sapui5-opl-subscription-demo` package).

---

## 5. Key pain points and mitigations


| Pain point                            | What it looked like               | Mitigation                                                                                           |
| ------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Invented controls**                 | XML references non-existent types | Registry + `validateUiPlan` + code review; **API** as §1                                             |
| **Two OPL `blocks`**                  | Squeezed half-width **tables**    | **One** `VBox` in `blocks` with stacked children                                                     |
| **Long text on PI** in **compact**    | Overlap, “padding bug” on bar     | `m:Text` + **short** `displayValue` + **formatter**                                                  |
| **Nested `Panel` + margin**           | Double chrome, stair-step         | **Flatter** `VBox` + `m:Title`; drop extra `**sapUiResponsiveMargin`** on block root when not needed |
| **Anchor strip “uneven”**             | *Spacing* *around* chevron        | UxAP **row** + **ellipsis**; **shorter, paired** subsection **titles** before deep CSS on internals  |
| **“AI said it’s fine”** with no trail | No audit                          | **Addendum** + **prompt → retrieved spec** discipline + **checklist** **QA** line                    |
| **No server on 8088/8085**            | `ERR_CONNECTION_REFUSED`          | Run the **Make** **target**; keep the **terminal** open                                              |


---

## 6. Outcomes and metrics (qualitative + technical)

- **Qualitative:** A **Fiori-credible** OPL + forms + tables **B2B** **cockpit** (subscription) and a **PO** **demo** that **validate** in CI.  
- **Technical:** **JSON Schema**–valid **registry**, **tested** **API**, **governance** and **Ruff**/**pytest** in pipeline.  
- **Organisation:** A **short** **LLM-readable** **addendum** and **design** **review** **hooks** for **governance** at scale.

---

## 7. Deliverables: case study document, presentation, and GitHub repository


| Deliverable                                | How you obtain it in this project                                                                                                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1. Case study (PDF)**                    | `make case-study-artifacts` → `docs/case_study/exports/SAP_Prompt_Case_Study.pdf` **or** print **this** `.md` to PDF from your editor.                                               |
| **2. Presentation (PPTX / Google Slides)** | Same **make** **target** → `SAP_Prompt_Case_Study.pptx` → **upload** to **Google** **Drive** and **open** in **Google** **Slides** if you prefer cloud.                              |
| **3. GitHub repository**                   | This **folder** is the repo. Follow `**docs/GITHUB_PUBLISH.md`** to create a **public** remote; `**README.md`** has **install** and **run** **commands** for **external** **users**. |


---

## 8. References (in-repo and external)

- `README.md` — **Quickstart**, **data** **flow**, **Make** table.  
- `AGENTS.md` — **Session** **rules** for **AI** **coding** **agents**.  
- `docs/LLM-READABLE-ADDENDUM.md` — **Hub**-ready **2-page** **addendum**.  
- `docs/COMPARISON_PANDYA.md` — **Mapping** to **Pandya** (LLM design systems).  
- `docs/DESIGN_REVIEW_CHECKLIST.md` — **Agent** **QA** and **Fiori** **checks**.  
- `GOVERNANCE.md` — **Quality** and **versioning** expectations.  
- [SAPUI5 API](https://ui5.sap.com/#/api) — **Official** **technical** **contract**.  
- [Expose your design system to LLMs (Pandya)](https://hvpandya.com/llm-design-systems) — **Principles** we **map** in `**COMPARISON_PANDYA`**.

---

## 9. Acknowledgements and collaboration (template)

*Replace with your org’s names:*

- **Product / design:** *…*  
- **SAP Fiori / UI5 lead:** *…*  
- **Engineering (registry, API, CI):** *…*  
- **AI / agent platform:** *…*

This case study is meant to be **reused** in **RFPs**, **internal** **G** **reviews**, and **customer** **workshops** where you need a **credible** **story** **plus** a **reproducible** **code** **artefact**.

---

*End of case study document.*