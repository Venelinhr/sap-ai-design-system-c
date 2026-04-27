# Patterns: shell, page, form

## Purchase Order (list / form style)

- **Shell:** `sap.m.App` → `sap.m.Page` (scroll inside `Page`).  
- **Form:** `sap.ui.layout.form.SimpleForm` with `ResponsiveGridLayout` where used in demos.  
- **Source:** `examples/purchase-order/demo/ui5/webapp/`

## Object Page (enterprise showcase)

- **Shell:** `sap.m.App` → `sap.uxap.ObjectPageLayout` (default namespace `sap.uxap`; `m:` for `sap.m`).  
- **Source:** `examples/enterprise-llm-showcase/webapp/`

## When to pick which

- **Object Page** — long “request / detail + sections” with header actions and subsections.  
- **Page + SimpleForm** — focused data entry (e.g. PO) without full object-page chrome.

**Validate after changes:** `make build-sap-po` (PO path) and manual run of enterprise showcase on port 8087 per `DEMO-INSTRUCTIONS.md`.
