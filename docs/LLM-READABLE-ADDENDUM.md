# Addendum: LLM-readable layer for Fiori / SAPUI5 delivery

**Length:** ≈**two** pages when printed or exported to PDF.  
**Audience:** Design system owners, enterprise architects, and teams using AI-assisted UI generation.  
**Relationship to Fiori:** This **adds** a machine layer next to your human-facing Fiori guidelines. It does **not** replace official SAP product documentation.

**One-line reason:** A PDF, deck, or pixel spec does not uniquely determine valid `sap.uxap` / `sap.m` **aggregations**, **enums**, and **compact** behaviour. For reliable agents, **§1** and **§2** are mandatory in the same place you tell people to “use Fiori.”

---

## How to publish this in your org’s design-system hub

1. **Copy** the body of this addendum (from **§1** through **Versioning**, or the whole file) into Confluence, Notion, SharePoint, or your design-system **portal** as a single child page: *e.g. “Fiori addendum: LLM-readable contract.”*
2. On that page, **link §1** to your pinned **[SAPUI5 / OpenUI5 API](https://ui5.sap.com/#/api)** base and state the **UI5 version** you ship (or the `sap-ui-core.js` URL you load in production). **§1 is the only official *technical* truth** for “what a control is and what it may contain.”
3. **Attach** (or **link to a build artifact** for) your org’s **JSON or YAML component index** — your registry, catalog, or `ComponentSpec` export. Same page, or a linked “Machine index (current)” subpage that always points to the **current** build. In this repository that pair is: `schemas/component_spec.schema.json` + `data/registry.json`.
4. In **Design review** for AI-generated or LLM-edited `view` XML, add **one agent QA** line. **Canonical wording** and **where to record it** are in `docs/DESIGN_REVIEW_CHECKLIST.md` (this repo) — copy the checkbox and short prompt into your org’s review template.

---

## §1 — Official technical truth: OpenUI5 / SAPUI5 API

- **Set as §1 in your hub:** The **[OpenUI5 / SAPUI5 API](https://ui5.sap.com/#/api)** for the **same runtime version** you use in the app.  
- No generated view XML, controller, or fragment may use a **control name**, **property**, **aggregation**, or **child type** that the API for that version does not document.  
- Fiori **pattern** text explains *when* to use a pattern; the API defines *what* is legal for each control. If they conflict, the **API** wins for what compiles and displays.

*Your hub page should name one stable API root + version* (e.g. “we pin `1.xx.x`; API reference for that build is at …”).

---

## §2 — Component index: JSON or YAML (machine handoff)

- **Attach** (or version and link) a **JSON or YAML** (or both) **component index** that encodes, at minimum: **stable control ID** (e.g. `sap.uxap.ObjectPageLayout`, `sap.m.HBox`), **aggregations**, **allowed child types** or associations, and **properties** you allow generators to set. **Do not** treat chat logs or a single Google Doc as that index.  
- In this repository the contract is: `**ComponentSpec` JSON schema** in `schemas/component_spec.schema.json` and the **built registry** in `data/registry.json` (rebuilt from API metadata, not from LLM free text). **Your** org can ship a subset or a superset, but the **file** is the handoff, not a narrative.

*Same hub page: “Download / link: `component-index.json` (build `…`)”* next to the §1 API link so humans and tools share one URL.

---

## §3 — Further commitments (with §1 and §2 in place)


| #   | Commitment                           | Rationale                                                                                                                           |
| --- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 3   | **Patterns as data, not only prose** | Object Page, shell + forms, list / report, wizard — templates + do/don’t in `recipes`, not only a paragraph.                        |
| 4   | **Closed defaults**                  | One theme and density in generated demos (e.g. `sap_horizon` + `sapUiSizeCompact`) unless the product spec branches explicitly.     |
| 5   | **Retrieval, not a dump**            | Give agents **slices** of the index and **one** pattern recipe per task, not the entire API.                                        |
| 6   | **Objective gates**                  | CI / validation: API alignment, no illegal children; in this repo `make` targets for XML demos, `make token-audit` for static HTML. |
| 7   | **Traceability**                     | High-stakes UIs: log prompt → **retrieved** spec lines → **generated** XML.                                                         |


---

## §4 — What stays human-only (for now)

- **Legal and compliance** wording, brand voice, one-off visual polish.  
- **Figma** and screenshots: **visual** only; in this project they do not override the API (see `data/figma/signals.yaml`).

---

## Where this repository implements the addendum


| Topic                        | Location                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| This addendum                | `docs/LLM-READABLE-ADDENDUM.md`                            |
| Design review: agent QA line | `docs/DESIGN_REVIEW_CHECKLIST.md`                          |
| Pandya mapping               | `docs/COMPARISON_PANDYA.md`                                |
| Spec index for agents        | `specs/README.md`                                          |
| **Schema + registry** (§2)   | `schemas/component_spec.schema.json`, `data/registry.json` |
| Recipes                      | `recipes/*.yaml`                                           |
| Agent entry                  | `AGENTS.md`                                                |


---

## Versioning and drift

- **UI5** version or `sap-ui-core.js` URL change → **rebuild** the component index, update **§1** link text on the hub page, and **release note** the new index build.  
- **Figma** changes → update signals only; they still **do not** override the API.

**Last reviewed:** 2026-04-24 — `AGENTS.md`, `specs/`, and CI in this branch.

---

## Stakeholder narrative (optional)

A longer *prompt → application* and Object Page case study for non-engineers can live alongside this addendum in a **Partner brief** in your skill or PMO folder (e.g. `case-study/Partner-Brief-Design-System-Readability-For-LLM-Agents.md` if you use the `sapui5-opl-subscription-demo` package).