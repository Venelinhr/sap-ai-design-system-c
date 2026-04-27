# Windsurf Test Prompt for SAPUI5 LLM-Ready Validation

## Instructions

Copy and paste this prompt into Windsurf's chat panel (Cmd+L) to test the SAPUI5 LLM-Ready design system.

---

## Test Prompt

```
I want you to build a SAP Fiori application using SAPUI5.

Requirements:
- Page: Product List
- Components:
  - Header (Title: "Products")
  - Table (columns: Name, Price, Availability)
  - Button (Primary: "Add to Cart")

Use ONLY components from this design system:
Read the file at .cursor/skills/sapui5-basic-form-demo/SKILL.md and use ONLY the components listed there. DO NOT invent any components.

Output format:
Generate a JSON object with the following structure:
{
  "ui_tree": {
    "type": "Page",
    "props": { ... },
    "children": [ ... ]
  },
  "sapui5": {
    "xml_view": "string with SAPUI5 XML view code",
    "controller_js": "string with SAPUI5 controller JavaScript code"
  },
  "meta": {
    "design_system_version": "1.0.0",
    "model": "windsurf"
  }
}

Important rules:
1. Use ONLY components listed in SKILL.md
2. Follow SAPUI5 XML syntax exactly
3. Include all required properties for each component
4. Ensure the XML view includes <mvc:View> tag
5. Output ONLY the JSON object, no explanations or code blocks
6. Follow the schema in schemas/expected-output-schema.json

Please generate the complete JSON output now.
```

---

## After Generation

1. Copy the JSON output from Windsurf
2. Save it as `test-outputs/windsurf-output.json`
3. Run validation:
```bash
node validation/run-validation.js test-outputs/windsurf-output.json
```

4. Check the score:
- If ≥ 85: ✓ Windsurf is LLM-Ready
- If < 85: Review issues and iterate

5. Add to benchmark:
```bash
node benchmark/run-benchmark.js run test-outputs/windsurf-output.json windsurf
```

---

## Troubleshooting

If Windsurf outputs code instead of JSON, add this to the prompt:
```
Output ONLY the JSON object. Do not include any explanations, code blocks with ```json, or additional text. Just the raw JSON object.
```

If Windsurf invents components, add this to the prompt:
```
CRITICAL: DO NOT invent any component names. Use ONLY the exact component names listed in SKILL.md. If a component is not in SKILL.md, do not use it.
```
