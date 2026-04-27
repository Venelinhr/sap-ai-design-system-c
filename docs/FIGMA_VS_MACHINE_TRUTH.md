# Figma vs machine truth (for LLM-assisted SAPUI5)

## The issue

**Figma** is built for **human** visual design: frames, auto-layout, components, **hex** colours, and **naming** that may not match **OpenUI5** module names (`sap.m.*`, `sap.uxap.*`). An LLM that “reads the Figma file” without a **structured** map will:

- Confuse **design** component names with **SAPUI5** **class** names.  
- Guess **spacing** with **ad hoc** CSS instead of **theme** / **density** / **control** contracts.  
- Miss **aggregations** (e.g. `ObjectPageSubSection` → `blocks`) entirely.

## What this repository does

| Input | Role | Overrides API? |
|--------|------|----------------|
| **Figma** | `data/figma/signals.yaml` — **lightweight** semantic signals (categories, tone) | **No** |
| **SAPUI5 API** | [ui5.sap.com](https://ui5.sap.com/#/api) | **Yes** for code truth |
| **ComponentSpec / registry** | `data/registry.json` + schema | **Machine** **retrieval** for LLMs |

**Design intent** can start in Figma; **implementation** must be **provable** against the **API** + **registry** **rules**.

## When Figma is still valuable

- **Review** and **iteration** with stakeholders.  
- **Visual** **hierarchy** and **copy** length (affects **truncation** in **UxAP** anchor bars, etc.).  
- **Optional** input to **signals.yaml** — not to **override** `getCompositionRules`.

## LLM instruction (one line)

*If Figma and the OpenUI5 API disagree, follow the **API** and document the **design** gap as a product decision, not as silent invalid XML.*
