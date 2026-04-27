# LLM-oriented design specs (SAPUI5 / Fiori)

**Short published addendum (stakeholders / DS owners):** [`../docs/LLM-READABLE-ADDENDUM.md`](../docs/LLM-READABLE-ADDENDUM.md) — the minimum **machine** commitments (API as truth, `ComponentSpec`, pattern data, gates, traceability) alongside Fiori.

Human-readable **session-start** context for agents, aligned with the structure suggested in
[“Expose your design system to LLMs”](https://hvpandya.com/llm-design-systems) (Pandya, 2024–2025).

- **Foundations** — *why* and *how* we avoid drift (theme, API, tokens).  
- **Tokens** — for this repo, “tokens” = **Fiori theme + density + `data/figma/signals.yaml` semantics** for SAPUI5, plus `llm-tokens.css` for static HTML only.  
- **Patterns** — Fiori shell, Object Page, forms — link to `recipes/*.yaml` where applicable.

**Machine truth** remains: `schemas/component_spec.schema.json`, `data/registry.json`, and validators in `scripts/`.
