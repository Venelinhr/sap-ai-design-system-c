# How this repo maps to “Expose your design system to LLMs”

**Reference (external article):** [Expose your design system to LLMs — Hardik Pandya](https://hvpandya.com/llm-design-systems) — ideas: **session-start specs**, **closed token layer**, **automated audit**, **upstream drift awareness**.

This document is the **honest mapping**: what we adopted, what is different because we use **SAPUI5 + Fiori** instead of custom React/CSS, and where the **source of truth** lives in *this* repository.

| Idea from the article | In this project (verifiable) |
|------------------------|------------------------------|
| **1. Spec files the LLM reads every session** | `specs/` (Markdown) + `recipes/*.yaml` + `GOVERNANCE.md`. For machines: `schemas/component_spec.schema.json`, `data/registry.json`. **Agents** should also read `AGENTS.md` at session start. |
| **2. Closed “token” layer (no invented colors/spacing)** | **SAP Fiori apps:** theme `sap_horizon`, compact density, controls from [SAPUI5 API](https://ui5.sap.com/#/api) — no ad-hoc hex in views. **Static deck/pitch pages:** a single file `examples/purchase-order/demo/_shared/llm-tokens.css` holds **all** raw colors and px primitives; `deck.css` / `pitch.css` use only `var(--llm-*)`. |
| **3. Audit script in CI (exit 1 on violations)** | `make token-audit` → `scripts/audit_static_visuals.py` (hex/px outside `llm-tokens.css`). `make build-sap-po` + `make validate-sap-demo` for **SAPUI5 XML** correctness. `make all` includes `token-audit`. |
| **4. Drift when upstream design system changes** | **Code:** re-run `make build-registry` / extractor when UI5 metadata changes; **Figma:** update `data/figma/signals.yaml`; **bootstrap:** demo `index.html` files pin `https://ui5.sap.com/resources/sap-ui-core.js` and `data-sap-ui-theme` (see each demo’s `index.html`). |

**What we do *not* claim:** This repo is not a full clone of a generic “64 markdown files + tokens.css for Atlaskit” case study. It is a **SAP-specific** implementation of the *same engineering principles* (constrain the LLM, audit, versioned specs, closed choices).

**Citation:** Pandya, Hardik. “Expose your design system to LLMs.” *hvpandya.com*, [https://hvpandya.com/llm-design-systems](https://hvpandya.com/llm-design-systems) (accessed 2026-04-24). Principles adapted; no endorsement implied.
