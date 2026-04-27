---
name: sapui5-opl-subscription-demo
description: >-
  End-to-end playbook for SAPUI5 OpenUI5 (sap.uxap ObjectPageLayout, sap.m) B2B demo
  layout: source-of-truth order, first steps, planning/hypotheses, Fiori-aligned guidelines,
  pre-ship validation, then fixes for OPL blocks, nested Panel, ProgressIndicator value row,
  responsive margins, subsection title pairing. Also: partner/stakeholder brief on making the
  SAP design system machine-readable for LLM agents (prompt to application) plus a technical
  supplement. Triggers: subscription-billing, 8088, make demo-subscription, uxap, Key figures,
  Stage gate, Working capital, OPL layout squeeze, overlap, anchor bar alignment, design system
  for LLM, agent-readable, or when the user asks for planning, validation, or guidelines.
---

# SAPUI5 OPL + subscription demo: playbook (full)

> **In this repository:** path is `.cursor/skills/sapui5-opl-subscription-demo/`. Public repo: [**sap-ai-design-system-c**](https://github.com/Venelinhr/sap-ai-design-system-c). Distribution name in `pyproject.toml` is `sap-ai-design-system-c`; Python **import** is `sapui5_llm_ready`.

Use this skill when **debugging, designing, or extending** the **subscription-billing** Object Page demo or **similar** `sap.uxap` + `sap.m` **compact** apps. It merges **process** (source of truth, planning, validation, guidelines) with **tactical** fixes from a long real session on this codebase.

## Load order (progressive disclosure)

| Order | File | Purpose |
|-------|------|---------|
| 1 | **`SKILL.md` (this file)** | Process, patterns, validation gates, playbook |
| 2 | **`references/source-of-truth.md`** | Authority hierarchy; what is *not* truth |
| 3 | **`references/planning-and-validation.md`** | Hypothesis template, metrics, “done” definition |
| 4 | **`references/guidelines-checklist.md`** | Pre-merge checkbox (Fiori-aligned) |
| 5 | **`references/examples.md`** | Request → cause → fix stories |
| 6 | **`references/quick-reference.md`** | One-page decision tree |
| 7 | **`case-study/Case-Study-UXAP-Subscription-Layout-Repair.md`** | ~10–12 page technical narrative, Mermaid + ASCII figures, export to PDF |
| 8 | **`case-study/Partner-Brief-Design-System-Readability-For-LLM-Agents.md`** | Stakeholder story: why classic DS is weak for agents, what “readable” means, prompt → app |
| 9 | **`references/llm-readable-design-system.md`** | Short engineer-oriented supplement to §2–§3 of the partner brief |

---

## 0) Where the demo lives (repo facts)

| Item | Value |
|------|--------|
| **App root** | `examples/subscription-billing/webapp/` |
| **Entry** | `index.html` — `subbilling.view.Subscription` |
| **View** | `view/Subscription.view.xml` |
| **Controller** | `controller/Subscription.controller.js` |
| **Run** | Repo root: `make demo-subscription` → static HTTP **port 8088** |
| **Theme** | `sap_horizon` from `https://ui5.sap.com/.../sap-ui-core.js`; libs: `sap.m`, `sap.ui.layout`, `sap.uxap` |
| **Density** | `sapUiSizeCompact` on body/view — strongly affects `ProgressIndicator` value row and spacing |

`ERR_CONNECTION_REFUSED` on 8088 → no HTTP server. Run `make demo-subscription` and keep that terminal open.

**Makefile / repo truth:** the **correct** `make` target and port for this demo live in the **root** `Makefile` and `README` in your branch. If a port is taken, the fix is local (change target or free the port) — not in this skill.

---

## 1) Source of truth (must follow)

Do **not** guess control API or default flex behaviour. Resolve in this order: **(1) OpenUI5/SAPUI5 API** for the loaded version → **(2) Fiori / design** pattern docs → **(3) in-repo** `view`, `index.html`, `Makefile` → **(4) runtime** (DOM `getBoundingClientRect`, logs, screenshot) → **(5) forums** as hints only, verified in (1) or (4).

Full table: `references/source-of-truth.md`.

---

## 2) First steps (before any code change)

1. **Confirm** you are editing the intended path: `examples/subscription-billing/webapp/`.  
2. **Start** the demo: `make demo-subscription` from **repo root**; expect **port 8088** (or whatever the Makefile says).  
3. **Browser:** `http://127.0.0.1:8088` (or `localhost`) and **hard refresh** so updated XML/JS load.  
4. **Reproduce** with a **concrete** path, e.g. “-scroll to *Approval pipeline* → *Stage gate*” — not “it looks off.”  
5. **Read** the **relevant** XML and the **relevant** control **API** (object page + controls on the path).  
6. **List** 3–5 **falsifiable** hypotheses; **one** layout change per hypothesis in debug (avoid stacking speculative fixes).  
7. If **debug mode** is on: `delete_file` the **session** log only, instrument **once** per full load, remove after the fix is **proved** and user is satisfied.

---

## 3) Planning (how to work)

- **Symptom** in **observable** terms: what a metric or screen would show, not adjectives only.  
- **Scope** one **vertical**: header, or one **section’s** body, or **anchor** strip — not the whole app unless necessary. **Out of scope** by default: refactors, new product features, unrelated files.  
- **Hypotheses** must be testable: “If *long* `displayValue` on `ProgressIndicator`, we expect *overlap* or `gapTextToBar` < 0.”  
- **Fix order:** **Structure** (OPL `blocks`, `HBox` `wrap`, aggregations) → **binding** to correct aggregation/formatter → **margin** and **class** on wrappers → **last:** **custom CSS** on `sap.uxap` internals.  
- **Never** use `setTimeout` / `sleep` as a **layout** fix.  
- **Revert** code that was added for a **rejected** hypothesis; do not accumulate “just in case” guards.

**Templates and metrics:** `references/planning-and-validation.md` (sections A–E).

---

## 4) Guidelines and principles (check before merge)

- **Object page:** Sections and sub-sections are **structural**; `blocks` hold **content**. Avoid **stacked** “cards” (OPL block + `Panel` + heavy margins) in **this demo** pattern unless the design spec requires a **Panel** inside.  
- **SimpleForm (one logical group, wide):** prefer `columnsXL="1"`, `emptySpanXL` / `L` = `0`, `singleContainerFullSize="true"`, `width="100%"` so the form is not a **narrow** column on the **left** with an empty right half.  
- **Compact + `ProgressIndicator`:** the **value** **row** is **short**; long copy belongs on `m:Text` (or similar), **not** in `displayValue`.  
- **MessageStrip:** set `type` to match **semantics** (e.g. `Information` for info).  
- **Sub-section titles** in the **anchor/sticky** strip: UxAP does **not** **optically** **centre** the chevron between **text**; **unequal** **length** and **truncation** dominate — **tune** **title** **strings** **first**; CSS only with **proven** selectors.  
- **i18n:** production apps: resource bundles; this **demo** may keep English in XML per **this** project’s rule — confirm for **other** repos.  
- **A11y:** prefer standard controls; if you add **custom** **CSS**, do not break **contrast** or **focus**.  
- **Code hygiene:** minimal diff, match file style, no drive-by refactors.  

**Printable list:** `references/guidelines-checklist.md`.

---

## 5) Validations (pre-ship)

| Gate | What to verify | Pass |
|------|----------------|------|
| **V1** | No `fetch` to a **debug** **ingest** URL in the **shipped** controller | `rg ingest` in `webapp` — only if you intentionally keep debug on |
| **V2** | **Browser** at **desktop-ish** **width** on **8088** with **cache** **bypass** | All main sections scannable; no obvious **overlap** or **clip** |
| **V3** | **Demo** **actions** still work if the model or bindings were touched | Unsubscribe, Re-subscribe, Reset, balance refresh toasts, etc. |
| **V4** | **Linter** / project checks on **touched** files | Clean or documented exceptions |
| **V5** | **Optional (dev only):** layout metrics if you had instrumentation | e.g. `gapTextToBar` ≥ 0; then **remove** instruments |

**Extended matrix and “done” definition:** `references/planning-and-validation.md` (C–E).

---

## 6) Playbook — symptoms, causes, fixes (session)

### 6.1 Multiple `blocks` → side-by-side, crushed tables

- **Symptom:** Two top-level `blocks` in one `ObjectPageSubSection` → two columns, half width, squeezed table.  
- **Fix:** One `sap.m.VBox` `width="100%"` `alignItems="Stretch"`; all content as children. Optionally `useIconTabBar="false"` on `ObjectPageLayout` if you do not need icon tabs.

### 6.2 Header: contract + actions (wrap)

- **Symptom:** Same `left` in geometry for “left” and “right” **groups** but different `top` (stacked), or label/value not in a Fiori row.  
- **Fix:** `HBox` with `wrap="false"`; `justifyContent="SpaceBetween"`; `FlexItemData` on the contract form row and on the actions `HBox`; `Label` + `VBox` for value; `SearchField` not overly wide (e.g. `12rem`).

### 6.3 `ProgressIndicator` and long `displayValue`

- **Symptom:** “Padding” or **line** on the **bar**; overlap in **compact** density.  
- **Fix:** Long text in `m:Text` with `{/approval/label}`; `displayValue` = short (percent) with `formatApprovalPercent`; `MessageStrip` `type="Information"` as appropriate.

### 6.4 Double indents, stair-step on the right, narrow form

- **Causes:** `sapUiResponsiveMargin` on a block child; **nested** `m.Panel` in `blocks`; `SimpleForm` with two columns + empty spans + `singleContainerFullSize="false"`.  
- **Fix:** Remove responsive margin on the block wrapper; `VBox` + `m:Title` instead of nested `Panel` where a single OPL “card” is enough; one-column, full-width form settings (§4).

### 6.5 Stage gate: one rhythm for strip, text, bar, table

- **Fix:** `stgApprBlock` as a single `VBox`: title if needed, `MessageStrip`, PI wrapper, `Table` — same horizontal inset path; avoid `sapUiSmallMarginBegin/End` on only the strip or only the table.

### 6.6 Working capital “pill” header

- **Fix:** `workCapBlock` = `VBox` + `m:Title` + `form:SimpleForm` (`workCapForm`); not an expandable `Panel` for that **heading** in this demo.

### 6.7 Sub-section **anchor** strip asymmetry

- **Reality:** Not optical **centre**; row layout and ellipsis.  
- **Fix (content first):** Paired, shorter `ObjectPageSubSection` `title` strings (e.g. *Line items (company view)* and *Ledger view (illustrative)*). CSS only with DevTools-proven, scoped rules.

### 6.8 Debug (optional)

- One-shot `onAfterRendering` + `fetch` to local ingest; **remove** from controller after **verification**.

---

## 7) View IDs (map)

`subApp`, `subOpl` | `hdrOuterHBox`, `hdrFormRow`, `hdrActionsHBox`, `hdrLblContract`, `hdrTitleContract` | `keyFiguresBlock`, `keyFiguresForm`, `keyFiguresTb` | `stgApprBlock`, `msgStageGate`, `stgApprSubtext`, `stgApprBar`, `stagesTbl` | `lineItemsBlock`, `lineTbl` | `workCapBlock`, `workCapForm`, `workCapTitle`

---

## 8) User request → action (map)

| Request | Action |
|--------|--------|
| 8088 connection refused | `make demo-subscription` |
| Squeezed / empty blocks | One VBox per sub-section `blocks` |
| Header contract / actions | No wrap, FlexItemData, form row, narrow search |
| PI / padding / overlap on bar | `m:Text` + `formatApprovalPercent`; Information strip |
| Right edge / content inset / narrow form | Drop extra margin, drop nested `Panel`, one-column `SimpleForm` |
| Working capital full-width bar | VBox + Title + form, no `Panel` header for that line |
| Anchor spacing / chevron | Shorter paired titles; explain UxAP; CSS last |
| Save session in a skill | This package |

**Narrated examples:** `references/examples.md`.

---

## 9) Files usually touched

- `examples/subscription-billing/webapp/view/Subscription.view.xml`  
- `examples/subscription-billing/webapp/controller/Subscription.controller.js` (formatters; no **permanent** debug `fetch` in the **final** state)  
- `examples/subscription-billing/webapp/index.html` (only if **bootstrap**, **theme**, or **global** **CSS** changes)

---

## 10) Package index (this skill)

```
.cursor/skills/sapui5-opl-subscription-demo/   (in-repo; or ~/.cursor/skills/... in a home install)
├── SKILL.md                          ← main; load this first
├── case-study/
│   ├── Case-Study-UXAP-Subscription-Layout-Repair.md   ← 10–12 pgs / PDF, Mermaid figures
│   └── Partner-Brief-Design-System-Readability-For-LLM-Agents.md  ← business partners / slides
└── references/
    ├── source-of-truth.md
    ├── planning-and-validation.md
    ├── guidelines-checklist.md
    ├── examples.md
    ├── quick-reference.md
    └── llm-readable-design-system.md  ← technical digest of the partner brief
```

**Do not** install skills in `~/.cursor/skills-cursor/` (reserved for Cursor built-ins).

**Team / repo copy:** to **version** the skill in the **repository**, copy the **folder** to  
`{repo}/.cursor/skills/sapui5-opl-subscription-demo/` and commit.

---

## 11) Anti-patterns to avoid (from this project’s session)

- Two **sibling** `blocks` in one **sub-section** when you need a **stack**.  
- **Long** `displayValue` on `ProgressIndicator` in **compact** mode.  
- `sapUiResponsiveMargin` on the **entire** OPL **block** **root** (double indent with the section’s own padding).  
- **Nested** `m:Panel` **inside** an OPL `blocks` area **and** a **second** “card” look without a product reason.  
- **Custom** `!important` **CSS** on UxAP **internals** as the **first** **response** to anchor strip spacing.  
- **Leaving** **debug** **ingest** **`fetch`** in the controller after the fix is confirmed.

---

## 12) When to apply

Any **`sap.uxap` + `sap.m` + `sapUiSizeCompact`** work on the **subscription-billing** demo, or **analog** Object Page **demos** with **OPL** `blocks`, **SimpleForm** **RGL**, **MessageStrip**, and **PI** in the **header** / **content** path. Also when explaining **how Fiori/API-aligned metadata and recipes** make the design system **usable by LLM agents** (stakeholder deck: `case-study/Partner-Brief-Design-System-Readability-For-LLM-Agents.md`).

**One-page path:** `references/quick-reference.md`.

---

## 13) Glossary (short)

| Term | Meaning here |
|------|----------------|
| **OPL** | `sap.uxap.ObjectPageLayout` |
| **Block** | `ObjectPageSubSection` → `blocks` aggregation child (one **logical** “tile” in the spec) |
| **Compact** | `sapUiSizeCompact` — **tighter** **density**; **stricter** for PI value row width |
| **RGL** | `sap.ui.layout.form` **ResponsiveGridLayout** on `SimpleForm` |
| **Ingest** | Local HTTP endpoint used in a **debug** **session** to **record** **NDJSON** (remove from **production** code) |

---

**End of SKILL.md** — for **worked** **stories** and **checkboxes**, use **`references/examples.md`** and **`references/guidelines-checklist.md`**.
