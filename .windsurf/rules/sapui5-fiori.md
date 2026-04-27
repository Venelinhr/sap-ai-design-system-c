---
trigger: glob
globs: **/*.{xml,js,html,css,md,yaml,yml,py}
description: SAP Fiori / SAPUI5 work in this repo — API truth, make gates, tokens
---

# SAP AI design system (this repo)

Before changing **UI** or **registry** code:

1. **Read** `AGENTS.md` end-to-end.
2. **SAPUI5 / OpenUI5:** use only controls and aggregations from the [SAPUI5 API](https://ui5.sap.com/#/api). Prefer `sap_horizon` + `sapUiSizeCompact` like existing `index.html` bootstraps.
3. **After XML/view changes:** run `make build-sap-po` or at least `make validate-sap-demo` when demo XML is touched.
4. **Registry:** component IDs must exist in `data/registry.json` and match `schemas/component_spec.schema.json`.
5. **Static marketing HTML** (deck, pitch): no new raw hex or `px` in consumer CSS — use `examples/purchase-order/demo/_shared/llm-tokens.css` variables; run `make token-audit` before commit.
6. **Figma** (`data/figma/signals.yaml`) does not override the API.
7. Default quality bar: `make all` (see `CONTRIBUTING.md`).

For **Object Page / subscription** demo specifics, see `.cursor/skills/sapui5-opl-subscription-demo/SKILL.md`.
