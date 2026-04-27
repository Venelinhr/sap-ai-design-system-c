# Source of truth hierarchy (read before arguing about controls)

When behaviour or API is unclear, resolve in this **order** (higher = more authoritative for SAPUI5 / OpenUI5 work):

| Priority | Source | Use for |
|----------|--------|---------|
| 1 | **OpenUI5 / SAPUI5 API** (`ui5.sap.com` / `sdk.openui5.org`) — exact control, property, aggregation, default values | `sap.m.Panel`, `sap.uxap.ObjectPageLayout`, `sap.m.ProgressIndicator`, `form.SimpleForm` |
| 2 | **Design guidelines** (Fiori for Web / design pages linked from `experience.sap.com` / `sap.com/design`) | Patterns (object page, form label/value, density), *when* to use which control class |
| 3 | **This repo** — `view/*.xml`, `controller/*.js`, `AGENTS.md` / `README` / module docs in-tree | Project conventions, `data-sap-ui-*` bootstrap, ports, `make` targets |
| 4 | **Session evidence** (DOM `getBoundingClientRect`, user screenshot, NDJSON) | *Whether* a hypothesised cause matches runtime (do not treat Stack Overflow alone as truth) |
| 5 | **LLM / forum answers** | Hints only — **verify** against (1) before changing code |

**Not** source of truth: memory of a property name, “it worked in another app,” or a theme class name without current DevTools inspection.

**Stable URLs to bookmark (version changes — pick your UI5 version in the URL if pinned):**
- `sap.uxap.ObjectPageLayout` — object page, anchor bar, sections.
- `sap.uxap.ObjectPageSection` / `ObjectPageSubSection` — `blocks` aggregation, layout behaviour.
- `sap.m.FlexItemData` / `sap.m.HBox` — `wrap`, `justifyContent`, grow/shrink.
- `sap.m.ProgressIndicator` — `showValue`, `displayValue`, `percentValue`.
- `sap.ui.layout.form.SimpleForm` + `ResponsiveGridLayout` — `columnsXL`, `emptySpan*`, `singleContainerFullSize`.

**Repo paths for the subscription demo (canonical files):**
- `examples/subscription-billing/webapp/index.html` — theme, `resourceRoots`, which libs load.
- `examples/subscription-billing/webapp/view/Subscription.view.xml` — structure of truth for layout.
- `examples/subscription-billing/webapp/controller/Subscription.controller.js` — formatters, no duplicate model paths without reason.

If **API** and **view** **disagree** with a symptom, trust **API + measured DOM** (e.g. the control really does render `displayValue` on a single line in compact — check API “visual design” and samples).
