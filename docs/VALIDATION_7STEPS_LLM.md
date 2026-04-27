# 7-step validation checklist for LLMs (SAPUI5 / this repo)

Use this **before** merging generated `view.xml`, controller changes, or registry updates. It extends the **design review** list with **machine-oriented** checks.

| Step | Check | Pass criteria |
|------|--------|----------------|
| **1** | **Component existence** | Every control tag’s `class` exists in [SAPUI5 API](https://ui5.sap.com/#/api) for your version. If using the registry, `id` exists in `data/registry.json` (or your slice). |
| **2** | **Property names** | Attributes map to **documented** properties for that control — not **invented** `fooBar` **snake_case** unless the API uses it. |
| **3** | **Design tokens** | For **OpenUI5** demos: theme `sap_horizon`, density `sapUiSizeCompact` **unless** exception is documented — see `specs/tokens/closed-sapui5-fiori-set.md`. For **static** HTML in `examples/purchase-order/demo/`, only **`llm-tokens.css`** vars — `make token-audit`. |
| **4** | **Spec file rules** | `specs/patterns/*` and **recipes** match the **pattern** you claim (Object Page vs list report). |
| **5** | **Composition / aggregations** | Children sit in **correct** aggregations (`blocks`, `items`, `content`, …) per API and `getCompositionRules` if used. |
| **6** | **Accessibility** | Labels, roles, **MessageStrip** `type`, no **only** colour for state — see `ComponentSpec.a11y` where present and Fiori a11y docs. |
| **7** | **Common patterns + AI hints** | **OPL:** one `VBox` in `blocks` when stacking — not two sibling `blocks` **unless** intentional columns. **Compact + ProgressIndicator:** long text **not** in `displayValue`. **Agent QA:** *Which control ID and aggregation does this line of XML come from?* (`docs/DESIGN_REVIEW_CHECKLIST.md`) |

**Condensed 5-step workflow (for presentations):** Read documentation → Select components → Validate choice → Generate code → Validate output (map steps 1–2 to “read/select,” 3–5 to “validate,” 6–7 to “a11y + patterns”).
