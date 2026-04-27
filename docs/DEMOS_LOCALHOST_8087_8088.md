# Localhost demos: `http://localhost:8087` and `http://localhost:8088` (or 127.0.0.1)

**Why two URLs?** They prove **two different** “success stories” in the same program:

| URL | `make` | What it demonstrates |
|-----|--------|----------------------|
| **http://localhost:8087** | `make demo-showcase` | **Top-component / “LLM readiness”** — a thin **Object Page** that uses **only** controls aligned with `data/top_components_seed.yaml` + the registry story: **SimpleForm** (ResponsiveGridLayout), **Table** + toolbar, **SearchField**, **MessageStrip**, Fiori **Horizon** + **Compact**. *Business copy* matches the design-system program (ComponentSpec, Figma signals, validation). |
| **http://127.0.0.1:8088** (also works as `localhost:8088`) | `make demo-subscription` | A **B2B subscription & billing** **Object Page** with **OPL section** navigation (Plan & contract, Approval, …), **Approval** pipeline (Progress + table), **dialogs** (Unsubscribe / Re-subscribe), in-memory **state machine** (no backend). *Proves* complex **OPL** `blocks`, header chrome, and real **layout** lessons (see below). |

**Companion workflow:** [WORKFLOW_ZERO_TO_100.md](WORKFLOW_ZERO_TO_100.md) (zero→100% phases). This file is the **pair-specific** story: **approach → issues → fixes → what “winning” looks like** for these two ports.

---

## 1) Port 8087 — Enterprise LLM showcase

### Purpose (final outcome)

A **credible, presentation-ready** single-page app that says “**we can render registry-backed intent in real SAPUI5**”: search bar, info strip (“seed: `sap.m` + `sap.ui.layout.form` + `sap.uxap`…”), two **sections** (Request with SimpleForm, Line items with Table), header actions, **Fiori Horizon** + **Compact**. It is the **default screenshot** for “LLM design-system readiness” in reviews.

### Approach

1. **Constrain the surface** to controls that the repo already promotes: seed list in `data/top_components_seed.yaml` (Button, Input, DatePicker, Table, ObjectPageLayout, …) — not random Fiori chrome.
2. **One view** `Showcase.view.xml` + **minimal** `Showcase.controller.js`: `JSONModel("view")` for form, `JSONModel("rows")` for table; **no OData**; **MessageToast** for actions.
3. **OPL** with **ObjectPageDynamicHeaderTitle**, `headerContent` toolbar (Search + density banner), **sections** with **ObjectPageSubSection** and **`blocks`** containing Panel → SimpleForm and Table+Toolbar in separate subsections.
4. **SimpleForm** with **`ResponsiveGridLayout`**, `labelSpan*` and `columnsL/XL`** tuned** so the green MessageStrip *“ResponsiveGridLayout matches Fiori form density”* is **true in practice** (not a decorative string).

### Issues we hit (or avoided by design)

| Issue | What goes wrong if ignored |
|------|-----------------------------|
| Unbounded control set | LLM invents controls not in `registry.json` / API. **Fix:** build only from the **seed list** and known aggregations. |
| Form density / mis-sizing | Labels and fields misaligned, “not Fiori” in **compact**. **Fix:** set **ResponsiveGridLayout** `labelSpan*`, `columns*`, `singleContainerFullSize` explicitly; validate in browser. |
| “Fake OPL” with wrong `blocks` | Runtime layout breaks or clippings. **Fix:** one **Panel** per subsection block where needed; **Table** in its own **ObjectPageSubSection** with **Toolbar** as sibling in `blocks` per OPL rules. |
| No visible tie to the program | Screenshot could be any app. **Fix:** table rows name **ComponentSpec**, **Figma signals**, **SAP demo validation**; header says **“LLM readiness”**. |

### Solutions / fixes (summary)

- **API-legal** `sap.m` / `sap.uxap` / `sap.ui.layout.form` only, matching **OpenUI5** for the pinned **bootstrap** in `index.html`.
- **Two named models** (`view`, `rows`) — clear for agents and humans.
- **Subsections** keep **form** and **table** concerns **separated** in the aggregation tree (easier to validate and to prompt).

### Best way to reach this outcome (8087)

1. Pin **UI5** version.  
2. List controls from **seed** + **ComponentSpec** for each.  
3. Build OPL + sections + **`blocks`** first; add **MessageStrip** + **SearchField** as **headerContent**.  
4. Run **`make demo-showcase`**, open **8087**, check **form alignment** and **table** in both **icon** navigation if you add tabs (this demo uses **sections** in anchor bar, not a second tab in the same sense as a TabContainer — structure is in the view).  
5. **Self-check:** each XML line → control + aggregation (see 7-step docs).

---

## 2) Port 8088 — B2B subscription & billing cockpit

### Purpose (final outcome)

A **realistic** enterprise **Object Page**: **Unsubscribe / Re-subscribe** changes **ObjectStatus**, **MessageStrip** type, **ProgressIndicator** %, and **stages** table — all **client-side**. **Proves** that **OPL**, **icon tab bar** for main sections, **dialogs**, and **dense** B2B content can coexist without “CSS-only” repair.

**README in repo:** [examples/subscription-billing/README.md](../examples/subscription-billing/README.md) (guided click path).

### Approach

1. **ObjectPageLayout** with **sections** in the OPL **anchor** bar (`useIconTabBar="false"` in XML) and multiple **ObjectPageSubSection** **blocks**: Plan & contract, Approval (Progress + list), Subscribed services (table), Balance & payment, etc.  
2. **Controller** holds a **BASE** state object; **Unsubscribe** / **Re-subscribe** / **Reset** **mutate** copies (deep clone) and push back to `JSONModel` — explicit **state machine** in one file.  
3. **Header** contract row: contract label + values + **actions** in an **HBox** row — **not** a multi-line **OverflowToolbar** around a tall **VBox** (see fixes).

### Issues → fixes (from real build learnings)

| Issue | Symptom | Fix |
|-------|---------|-----|
| **OverflowToolbar** + **multi-line VBox** in header | **Clipping** (fixed height in toolbar) | **Do not** put multi-line **VBox** inside **OverflowToolbar** for this row. Use a **plain HBox** with `FlexItemData` and **one row** (`wrap="false"`) for label + value + **actions** — see **comments in** `Subscription.view.xml` (lines ~60–61, 70+). |
| **Two** header **blocks** at same visual row | Wrap pushed **actions** to next line (wrong in compact) | **One** horizontal **HBox** with `justifyContent="SpaceBetween"`; **shrink** rules on the left block so **right** actions stay on **one** line. |
| OPL + **compact** + **ProgressIndicator** + long text | Overlap, truncation (classic OPL/compact issue) | Keep **displayValue** **short** on ProgressIndicator; use **m:Text** for long copy **next to** or **under** the bar, not as one giant `displayValue` (pattern in playbooks). |
| “Needs backend” to demo | Blocker for workshops | **JSONModel**-only: acceptable **for this repo** as long as the **XML** and **governance** story stay honest (`GOVERNANCE.md` / `make` for ship paths). |

### Best way to reach this outcome (8088)

1. Same as 8087: **pin** UI5, **OPL** structure from **recipes** / API for `ObjectPageLayout`, **sections**, **`blocks`**.  
2. Implement **header** in **structural** controls (**HBox** / **FlexItemData**) **before** adding CSS.  
3. **Wire** Unsubscribe / Re-subscribe in **controller**; **test** all **MessageStrip** and **ObjectStatus** transitions; **Reset** returns to `BASE`.  
4. Run **`make demo-subscription`**, follow **README** **six-step** guided flow.  
5. If layout looks “almost right” but **clips**: look for **Toolbar** + **tall** child — **reparent** to **VBox** *outside* toolbar or use **HBox** row pattern.

---

## 3) What is the *best* solution (shared “success path” for both)

Both demos succeed for the **same** underlying reasons; only **scope** differs (narrow seed showcase vs. wide B2B OPL).

1. **Source of truth:** OpenUI5 **API** (version-pinned) + **ComponentSpec** / **registry** for meaning — *not* Figma pixel math.  
2. **Layout before cosmetics:** **Legal** `blocks` and **aggregations**; **HBox/VBox/Toolbar** choices that match **Fiori** control behavior in **Compact**.  
3. **Small, testable** controllers: **JSONModel**, explicit methods, no hidden global state.  
4. **Evidence:** `make demo-*` + browser; for PO path additionally **`make validate-sap-demo`**; **line-level** review for OPL `view.xml`.  
5. **Document** quirks (e.g. Subscription **XML comments**) so the next agent **does not** reintroduce **OverflowToolbar** clipping.

**8087** = “**breadth of top controls + messaging** in one page.” **8088** = “**depth of OPL + state + real layout** lessons.” **Together** they are the program’s **localhost proof** of LLM-readable Fiori delivery.

---

## See also

- [TURNING_POINT_MOMENTUM.md](TURNING_POINT_MOMENTUM.md) — *when* momentum starts; **your** action vs assistant vs repo  
- [WORKFLOW_ZERO_TO_100.md](WORKFLOW_ZERO_TO_100.md)  
- [PROMPTING_MCP_AND_STATIC.md](PROMPTING_MCP_AND_STATIC.md)  
- [examples/subscription-billing/README.md](../examples/subscription-billing/README.md)  
- `data/top_components_seed.yaml` — **8087** alignment list  
- Playbook deck **Part 3c–3d** (if present) — short slides; this file is the **long** reference.
