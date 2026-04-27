# Canonical Test Prompt for SAPUI5 LLM-Ready Validation

## Purpose
This is the standardized test prompt used to evaluate LLM readiness across all models. Every LLM should be tested with this exact prompt to ensure consistent, comparable results.

---

## Test Prompt

Build a SAP Fiori application using SAPUI5.

Requirements:
- Page: Product List
- Components:
  - Header (Title: "Products")
  - Table (columns: Name, Price, Availability)
  - Button (Primary: "Add to Cart")

Use ONLY components from this design system:
[INSERT SKILL.md CONTENT HERE]

**Component Naming:** You can use either short names (Page, Table, Button) or full namespaces (sap.m.Page, sap.m.Table, sap.m.Button). Both formats are accepted and validated correctly.

Output:
1. UI structure (JSON)
2. SAPUI5 XML View
3. Controller logic (JS)

---

## Expected Output Format

```json
{
  "ui_tree": {
    "type": "sap.m.Page",
    "props": {
      "title": "Products"
    },
    "children": [
      {
        "type": "sap.m.Table",
        "props": {
          "columns": ["Name", "Price", "Availability"]
        }
      },
      {
        "type": "sap.m.Button",
        "props": {
          "text": "Add to Cart",
          "type": "Emphasized"
        }
      }
    ]
  },
  "sapui5": {
    "xml_view": "string",
    "controller_js": "string"
  },
  "meta": {
    "design_system_version": "1.0.0",
    "model": "LLM name",
    "timestamp": "ISO 8601 timestamp (e.g., 2026-04-26T12:00:00Z)"
  }
}
```

**IMPORTANT:**
- You can use EITHER short names (e.g., "Page") OR full namespaces (e.g., "sap.m.Page")
- Both formats are accepted and validated correctly
- Short names are automatically converted to full namespaces during validation
- Include timestamp in ISO 8601 format in meta.timestamp

**Examples:**
- "Page" → "sap.m.Page" (automatic conversion)
- "sap.m.Page" → "sap.m.Page" (already full namespace)
- "Table" → "sap.m.Table" (automatic conversion)
- "sap.m.Table" → "sap.m.Table" (already full namespace)

---

## Usage

### Manual Testing
Copy this prompt and send to any LLM (Claude, Gemini, Codex, etc.)

### Automated Testing
```bash
node benchmark/test-claude.js
node benchmark/test-gemini.js
node benchmark/test-codex.js
```

---

## Validation Criteria

The output will be validated against:
- JSON schema compliance
- Component whitelist (from SKILL.md)
- Property validity (from ComponentSpec)
- SAPUI5 XML syntax
- Hallucination detection

---

## Scoring

Outputs are scored on a 0-100 scale:
- Structure Accuracy (0-25)
- Component Validity (0-20)
- Props Accuracy (0-15)
- SAPUI5 Compliance (0-25)
- Consistency (0-15)

**Target:** Score ≥ 85 for LLM-Ready certification
