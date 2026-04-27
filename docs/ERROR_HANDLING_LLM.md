# Error handling for LLM / agent generation (SAPUI5)

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| **Component not found** | Hallucinated `sap.m.*` name or wrong version | Search [API](https://ui5.sap.com/#/api); use `searchComponents` / registry **only** returned **ids**. |
| **Property name mismatch** | Model confuses HTML / React with UI5 | Open the **control’s** API page; copy **exact** property names (case-sensitive in XML attributes as per sample). |
| **Hardcoded value found** | Magic numbers for layout in **OpenUI5** demo | Prefer **theme** classes, **binding**, **i18n**; for static HTML use **CSS variables** from `llm-tokens.css`. |
| **Composition rule violation** | Wrong aggregation or child type | Read `getCompositionRules` or API **Aggregations** section; fix parent or child type. |
| **Token / theme drift** | Wrong `data-sap-ui-theme` or mixed density | Align all `index.html` bootstraps per `specs/tokens/closed-sapui5-fiori-set.md`. |
| **Figma–code drift** | Pixel match expected, API different | **API wins**; update Figma notes or **signals.yaml**, not illegal XML. |

**Escalation:** If the model repeats errors after correction, **reduce** context to **one** recipe + **one** **ComponentSpec** **per** control and **regenerate** only the affected fragment.
