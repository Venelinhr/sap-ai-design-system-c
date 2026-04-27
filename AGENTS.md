# Instructions for AI coding agents (and humans)

Before generating or changing **UI** in this repository:

1. **Read** `docs/LLM-READABLE-ADDENDUM.md` (short, publishable) and `docs/COMPARISON_PANDYA.md` — how we apply [LLM-readable design system](https://hvpandya.com/llm-design-systems) ideas to **SAPUI5/Fiori**. For the **end-to-end narrative** (prompt-to-app, MVP, pain points), see `docs/case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`.
2. **SAPUI5 / Fiori UIs (OpenUI5 demos)**
  - Use only controls and aggregations that exist in the **[SAPUI5 API](https://ui5.sap.com/#/api)**.  
  - Prefer `sap_horizon` + `sapUiSizeCompact` as in existing `index.html` bootstraps.  
  - After edits, run `**make build-sap-po`** (or at least `make validate-sap-demo`) for XML demos.
3. **Registry-backed generation**
  - Component IDs must exist in `data/registry.json` / `ComponentSpec` schema.  
  - Use the FastAPI app (`sapui5_llm_ready.api`) or scripts under `scripts/` for deterministic behavior.
4. **Static marketing pages (case-study deck, pitch)**
  - **Do not** add hex colors or raw `px` in `*.html` or `deck.css` / `pitch.css`.  
  - Put new primitives only in `examples/purchase-order/demo/_shared/llm-tokens.css` and reference `var(--llm-*)`.  
  - Run `**make token-audit`** before commit.
5. **Figma** is a **visual** reference only (`data/figma/signals.yaml`); it does not override the SAPUI5 API.

Quality gates: `make all` (lint, registry, tests, validation, **token-audit**).