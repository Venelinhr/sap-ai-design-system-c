# How to prompt LLMs: MCP, static docs, and direct files

## Three integration options

| Option | When to use | Pros | Cons |
|--------|-------------|------|------|
| **1 — MCP server (recommended for Claude Desktop)** | You expose this repo’s **API** (FastAPI) or a thin MCP wrapper over **getComponentSpec** / **search** | **Deterministic** tool calls; no stale “memory” of APIs | Must run service locally or host it |
| **2 — Static documentation** (ChatGPT, Cursor, Windsurf without MCP) | Quickstarts, ad hoc prompts | **No** server; attach **`DESIGN.md`**, **`SAPUI5-COMPONENTS.md`**, small JSON **slices** | Model may still drift — **use** the **4-step** template and **7-step** validation |
| **3 — Direct component files** | Advanced users editing **one** feature | Full control | Risk of **over-large** **paste** — **max** 2–3 `ComponentSpec` **objects** per message |

---

## 4-step prompt template (use every time)

1. **Read specs:** `DESIGN.md` + relevant `specs/` + [SAPUI5 API](https://ui5.sap.com/#/api) for the controls you touch.  
2. **Understand requirements:** pattern (Object Page, list, wizard), data shape, **density**, **a11y**.  
3. **Generate code:** XML + JS **only** with **ids** from step 1; **no** **invented** controls.  
4. **Validate:** run `make validate-sap-demo` / project checks + **7-step** list in `docs/VALIDATION_7STEPS_LLM.md`.

---

## Three example prompts

### A) Form generation (Fiori)

> “Using `recipes/object-page.yaml` and `ComponentSpec` for `sap.ui.layout.form.SimpleForm` and `sap.m.Input` from our registry slice, generate a **fragment** of `view.xml` for a two-field form (PO number, supplier) with `columnsXL=1`, `singleContainerFullSize=true`, compact density. **Do not** add controls not in the spec. After output, list each line’s **control id** and **parent aggregation**.”

### B) Component selection

> “Business goal: approval pipeline with message and table. Call `searchComponents` with intent **object page** and **high** density **or** manually pick from **SAPUI5-COMPONENTS.md** list: which **sap.uxap** and **sap.m** **classes**? Justify with **Fiori** **pattern** + **API** **aggregation** for table **items**.”

### C) Code generation with validation (end state)

> “Generate the view + controller **chunk**; then self-check: (1) every `class` in API, (2) no long `displayValue` on `ProgressIndicator` in compact, (3) run these grep patterns: `ingest` must be **absent** in ship path.”

---

## Four common prompt patterns

1. **Spec-grounded generation:** *“Given the attached ComponentSpec JSON for X and Y, output only XML for …”*  
2. **Diff / fix:** *“This XML fails validation with …; the API says …; patch minimal lines.”*  
3. **Pattern selection:** *“List-report vs object page: which recipe from `recipes/` matches the following user story …”*  
4. **A11y pass:** *“Add `type` to MessageStrip, ensure Label association for form fields in this fragment …”*  

---

## DO / DON’T (short)

| DO | DON’T |
|----|--------|
| Pin **version** in chat (“UI5 1.1xx with sap_horizon”) | Assume **Figma** **hex** = **Fiori** **runtime** value |
| Retrieve **slices** of `registry.json` | Paste **entire** registry into context |
| **Validate** with `make` and **7 steps** | Ship **on** “looks right” in screenshot only |
| Use **`recipes/prompt-template.md`** for **JSON** `uiPlan` | Output **unvalidated** free-form view XML in one shot for production paths |

---

## Example workflow (one turn outline)

- **User:** B2B subscription header + stage gate.  
- **Agent:** Read `DESIGN.md`, `recipes/object-page.yaml`, API for `ObjectPageLayout`, `ObjectPageSubSection`, `blocks`.  
- **Output:** `view.xml` fragment + `componentRationale` + **self**-**validation** table (step 1–7 **checkboxes**).  
- **Human:** design review + `make demo-subscription` on **8088**.

---

*See also: `recipes/prompt-template.md`, `AGENTS.md`, and `docs/LLM_HUMAN_PLAYBOOK.md` for the full narrative.*
