# Closed set: SAPUI5 / Fiori runtime (demos)

These are the **allowed** high-level visual/runtime choices for **OpenUI5 demos in this repo** unless you intentionally document an exception in a PR.

| Concern | Closed choice | Where defined (source in repo) |
|--------|---------------|----------------------------------|
| Theme | `sap_horizon` | `data-sap-ui-theme` in each demo `index.html` under `examples/…/webapp/` |
| Density | `sapUiSizeCompact` | `body` / view classes in same bootstraps |
| UI5 bootstrap | `https://ui5.sap.com/resources/sap-ui-core.js` | Same `index.html` files |
| Control facts | Real SAPUI5 types only | [SAPUI5 API](https://ui5.sap.com/#/api) + `data/registry.json` |

**Figma** semantic mapping (not a code generator): `data/figma/signals.yaml`.

**Static HTML** (case study deck, pitch) uses **`examples/purchase-order/demo/_shared/llm-tokens.css`** — not the SAP theming engine.
