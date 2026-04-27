# LLM-readable design system (this project)

**Published addendum (share with design-system owners):** [`docs/LLM-READABLE-ADDENDUM.md`](../../docs/LLM-READABLE-ADDENDUM.md) — short, versionable “what we commit to in machine form” (API truth, `ComponentSpec`, patterns as data, gates, traceability).

## Problem (from practice)

- LLMs **fabricate** control names, properties, and raw CSS that “look” like SAP.  
- They have **no cross-session memory** of yesterday’s layout choices.  
- **Source code** of SAPUI5 shows APIs, not *when* to use Object Page vs. simple `Page` — that must be written down.

## What we do instead

1. **Structured registry** — `ComponentSpec` + `data/registry.json` (deterministic).  
2. **Closed choices for Fiori UIs** — one theme family (`sap_horizon`), one density (compact) in demos, real CDN bootstrap.  
3. **Validators** — XML and TS checks; **no merge** of broken demo contracts.  
4. **Static pages** — single `llm-tokens.css` for deck/pitch; `make token-audit` enforces it.

**SAP product reference:** [SAPUI5 API Reference](https://ui5.sap.com/#/api).
