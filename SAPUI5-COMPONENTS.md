# SAPUI5 components — documentation index for **humans and LLM agents**

**Rule:** The **[SAPUI5 / OpenUI5 API](https://ui5.sap.com/#/api)** is the only **fully authoritative** description of every **property** and **aggregation** default. This file tells you **where in this repo** we store **machine-readable** mirrors and how to use them with agents.

---

## 1) Official documentation (read first)

1. **API reference (pinned to your app’s version):** [ui5.sap.com](https://ui5.sap.com/#/api) — pick the same major/minor you load in `sap-ui-core.js`.  
2. **Fiori design:** [Fiori design guidelines / experience.sap.com](https://experience.sap.com/fiori-design/) — *when* to use Object Page, forms, worklist, etc.  
3. **Developer topics:** [SAPUI5 documentation](https://ui5.sap.com/) — walkthroughs and samples.

**Why read before build:** The API prevents **inventing** `sap.m.MyTable` and tells you the **exact** aggregation names (e.g. `items` on `Table`, `content` on `ObjectPageSubSection` → `blocks`).

---

## 2) Component JSON in this repository (machine index)

| Artifact | Path | Role |
|----------|------|------|
| **JSON Schema** for one control | `schemas/component_spec.schema.json` | Shape of `ComponentSpec`: `id`, `props`, `slots` (aggregations), `composition`, `a11y`, `tokens`… |
| **Registry (many components)** | `data/registry.json` | Built by `scripts/extract_sapui5.py` (fixtures or live) + Figma **signals** merge via `apply_figma_signals.py` — **intended** for **retrieval**, not to replace the online API. |
| **Seeding / top-N lists** | `data/top_components_seed.yaml`, `data/top_components_manifest.json` | Which controls to **prioritise** in a **small** index for demos. |
| **Fixture (offline tests)** | `data/fixtures/ui5_api_doc.sample.json` | Proves the pipeline **without** network. |
| **Live attempt output** | `data/registry.live.json` | If you run the extractor in live mode. |

**How an LLM should use JSON:** request **getComponentSpec**-style **slices** (one or a few `id` values) or your own RAG over **curated** extracts — **not** the full multi-megabyte file in one prompt.

**Structure (abbreviated):** each entry follows `ComponentSpec` — see schema for required fields. Conceptually:

```json
{
  "schemaVersion": "1.0.0",
  "id": "sap.m.Button",
  "name": "Button",
  "props": [ { "name": "text", "type": "string", "required": false } ],
  "slots": [ { "name": "content", "allowedChildTypes": ["sap.m.Image"] } ],
  "composition": { "rules": [] },
  "a11y": { "notes": "..." }
}
```

*(Real `registry.json` entries are produced by the extractor; field names and arrays match the schema.)*

---

## 3) Recipes (pattern-level “components of a screen”)

| File | Use |
|------|-----|
| `recipes/object-page.yaml` | B2B Object Page layout **intent** |
| `recipes/list-report.yaml` | List + report |
| `recipes/wizard-flow.yaml` | Multi-step |
| `recipes/dashboard-cards.yaml` | Card grids |
| `recipes/prompt-template.md` | **System** prompt for **JSON** `uiPlan` generation |

**Recipes are not a second API** — they are **curated** **composition** **hints** that must still be **valid** against the API and, where wired, `getCompositionRules`.

---

## 4) Cross-platform examples (Fiori OpenUI5 vs React)

This repo has **Fiori** **XML** demos (canonical for SAP) and a **React** **analogy** for the **same** data shape (PO form) to teach **separation** of concerns; React uses **HTML inputs**, Fiori uses **sap.m / form** **controls** — do **not** mix paradigms in one file without a documented bridge.

| Example | Path |
|--------|------|
| **OpenUI5 PO view** | `examples/purchase-order/demo/ui5/webapp/view/PurchaseOrder.view.xml` |
| **React PO form** (learning / non-Fiori) | `examples/purchase-order/react/PurchaseOrderForm.tsx` |
| **Educational compare (HTML + notes)** | `examples/llm-playbook-comparison/fiori-concepts-vs-react.html` |

---

## 5) Verification quick links

- `docs/DESIGN_REVIEW_CHECKLIST.md` — **Agent QA** line: *Which control **ID** and **aggregation** does this XML line use?*  
- `docs/VALIDATION_7STEPS_LLM.md` — **7-step** LLM checklist  
- `GOVERNANCE.md` — what **must** pass in CI  

---

*For the full story (MCP, Figma limits, before/after design methods, prompts):* **`docs/LLM_HUMAN_PLAYBOOK.md`**
