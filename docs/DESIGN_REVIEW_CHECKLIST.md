# Design & DS review checklist (LLM + SAPUI5)

Use before merging UI-facing changes. Inspired by the audit + review ideas in
[Pandya — LLM design systems](https://hvpandya.com/llm-design-systems), adapted to **Fiori**.

## SAPUI5 / OpenUI5

- **Agent QA (one line):** *Which control ID and aggregation does this line of XML come from?* (Answer for each nontrivial line; must be consistent with [SAPUI5 API](https://ui5.sap.com/#/api) for the pinned version. Required when XML was produced or materially edited by an LLM or generator.)  
- Control names, namespaces, and aggregations match [SAPUI5 API](https://ui5.sap.com/#/api).  
- Theme `sap_horizon` + compact density still applied in demo bootstraps.  
- `make validate-sap-demo` (and `make build-sap-po` for PO) passes.  
- **One** primary action per surface where Fiori guidelines expect it.

## Static deck / pitch HTML

- No new hex or raw `px` outside `examples/purchase-order/demo/_shared/llm-tokens.css`.  
- `make token-audit` passes.

## Registry / agents

- New or renamed components exist in `data/registry.json` and pass schema validation.  
- `AGENTS.md` and `recipes/` still accurate if behavior changed.

## Accessibility (minimum)

- Form fields have labels; interactive elements are reachable in the demo (manual smoke).  
- Message / status patterns use `sap.m.ObjectStatus` or framework controls where appropriate (see showcase).