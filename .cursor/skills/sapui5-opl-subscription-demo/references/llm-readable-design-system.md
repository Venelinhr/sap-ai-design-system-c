# LLM-readable design system (technical supplement)

This file condenses the partner brief (`case-study/Partner-Brief-Design-System-Readability-For-LLM-Agents.md`, §2–§3) for engineers and agent authors.

## Why human-orientated design systems fail agents

- Prose and pixels do not give a *unique* parse of which `sap.m.*` or `sap.uxap.*` class to instantiate.
- Many mutually incompatible layout patterns (for example, two OPL `blocks` versus one full-width `VBox`) are not disambiguated by “object page style” copy alone.

## Minimum structure for machine-readable SAPUI5 / Fiori alignment

1. **API as first truth** for the pinned OpenUI5 / SAPUI5 version in the app.
2. **Deterministic component spec** (for example JSON per control): stable id, aggregations, allowed child types, properties and enums needed for generation and validation.
3. **Pattern library as data**: object page (B2B), worklist, create flow — each a template with placeholders, do/don’t rules, and counter-examples from real bugs (see the subscription case study).
4. **Retrieval** so the model context only receives relevant spec slices and one recipe at a time.
5. **Quality gates**: illegal aggregations, compact-density semantics (for example `ProgressIndicator` with long `displayValue`), no debug ingest in the shipped path.

## Prompt → application (same as partner brief)

Intent → retrieve specs and recipe → generate view and model → validate → run locally (for example `make demo-subscription` on 8088) → human review and iterate.

**See also:** `../case-study/Partner-Brief-Design-System-Readability-For-LLM-Agents.md` for the business narrative, talking points, and a Mermaid flow for slides.
