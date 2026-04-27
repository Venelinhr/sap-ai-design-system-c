# Testing with Cursor

## Overview

This guide shows how to test the SAPUI5 LLM-Ready design system using Cursor AI coding assistant.

---

## Prerequisites

1. **Install Cursor** - Download from https://cursor.sh
2. **Install Node.js** - For validation tools
3. **Clone this repository** - `git clone <repo-url> && cd sapui5-llm-ready`
4. **Install dependencies** - `npm install`

---

## Quick Start with Cursor

### Step 1: Open Repository in Cursor

```bash
cd sapui5-llm-ready
cursor .
```

### Step 2: Use Cursor's Chat Feature

Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux) to open Cursor's chat panel.

### Step 3: Test with Cursor-Specific Prompt

Copy and paste this prompt into Cursor's chat:

```
I want you to build a SAP Fiori application using SAPUI5.

Requirements:
- Page: Product List
- Components:
  - Header (Title: "Products")
  - Table (columns: Name, Price, Availability)
  - Button (Primary: "Add to Cart")

Use ONLY components from this design system:
[INSERT SKILL.md CONTENT HERE - reference .cursor/skills/sapui5-basic-form-demo/SKILL.md]

Output format:
1. UI structure as JSON with ui_tree, sapui5 (xml_view, controller_js), and meta sections
2. Ensure the output follows the schema in schemas/expected-output-schema.json

Please generate the complete output.
```

### Step 4: Save the Output

When Cursor generates the output, save it as a JSON file:

```bash
# Create output directory
mkdir -p test-outputs

# Save Cursor output
cursor-output.json
```

### Step 5: Run Validation

```bash
node validation/run-validation.js test-outputs/cursor-output.json
```

### Step 6: Check Score

- If score ≥ 85: ✓ Cursor is LLM-Ready
- If score < 85: Review issues and iterate

### Step 7: Add to Benchmark

```bash
node benchmark/run-benchmark.js run test-outputs/cursor-output.json cursor
```

---

## Cursor-Specific Features

### Using Cursor's Codebase Awareness

Cursor can read your entire codebase. Use this to your advantage:

```
Read the SKILL.md file in .cursor/skills/sapui5-basic-form-demo/ and use ONLY the components listed there to build the application.
```

### Using Cursor's File Context

You can ask Cursor to read specific files:

```
Read the validation framework in docs/VALIDATION_FRAMEWORK.md and ensure your output meets the LLM-Ready criteria.
```

### Using Cursor's Edit Feature

After generating the initial output, ask Cursor to fix issues:

```
The validation report shows the following issues:
[PASTE VALIDATION ISSUES]
Please fix these issues and regenerate the output.
```

---

## Advanced Cursor Testing

### Multiple Iterations

Test Cursor's consistency by running the same prompt multiple times:

```bash
# Run 1
node validation/run-validation.js test-outputs/cursor-output-1.json

# Run 2
node validation/run-validation.js test-outputs/cursor-output-2.json

# Run 3
node validation/run-validation.js test-outputs/cursor-output-3.json
```

Compare scores to measure consistency (target: variance ≤ 10).

### Complex Applications

Test Cursor with more complex prompts:

```
Build a SAP Fiori subscription management application with:
- Object Page for subscription details
- Form for entering subscription data
- Table for displaying active subscriptions
- Panel for billing information
- Action buttons for approve/reject

Use ONLY components from the SKILL.md file.
Output in JSON format following the expected output schema.
```

### Error Recovery

Test Cursor's ability to fix errors:

1. Intentionally use an invalid component name
2. Let Cursor generate the output
3. Run validation
4. Show Cursor the validation report
5. Ask Cursor to fix the issues

---

## Cursor Best Practices

### 1. Use File References

Always reference the SKILL.md file:

```
Use ONLY components from .cursor/skills/sapui5-basic-form-demo/SKILL.md
```

### 2. Enforce Schema

Always mention the schema:

```
Follow the schema in schemas/expected-output-schema.json
```

### 3. Request JSON Format

Always request JSON format:

```
Output in JSON format with ui_tree, sapui5, and meta sections
```

### 4. Ask for Validation

Ask Cursor to self-validate:

```
Before outputting, verify that:
1. All components are in the SKILL.md registry
2. All properties are valid for their components
3. The XML follows SAPUI5 syntax
```

---

## Troubleshooting Cursor

### Issue: Cursor invents components

**Solution:** Be more explicit:
```
DO NOT invent any components. Use ONLY the exact component names listed in SKILL.md.
```

### Issue: Cursor outputs code instead of JSON

**Solution:** Be more explicit about format:
```
Output ONLY JSON. Do not output code blocks or explanations. Just the JSON object.
```

### Issue: Cursor misses required fields

**Solution:** Reference the schema:
```
Your output must include: ui_tree (with type, props, children), sapui5 (with xml_view, controller_js), and meta (with design_system_version, model).
```

---

## Cursor Integration with Validation

### Automated Workflow

Create a script to automate Cursor testing:

```bash
# test-cursor.sh
#!/bin/bash
echo "Testing with Cursor..."
# 1. Open Cursor and run prompt
# 2. Save output
# 3. Run validation
node validation/run-validation.js test-outputs/cursor-output.json
# 4. Add to benchmark
node benchmark/run-benchmark.js run test-outputs/cursor-output.json cursor
```

### Cursor + CI/CD

Add Cursor testing to your CI/CD pipeline (requires Cursor API):

```yaml
# .github/workflows/cursor-test.yml
name: Cursor LLM-Ready Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Test with Cursor
        run: |
          # Call Cursor API to generate output
          # Run validation
          node validation/run-validation.js cursor-output.json
```

---

## Expected Results

**Target Score:** ≥ 85/100

**If Cursor achieves this:**
- ✓ Cursor is LLM-Ready for SAPUI5
- ✓ Can be used for production SAPUI5 development
- ✓ Add to leaderboard as top performer

**If Cursor doesn't achieve this:**
- Review validation report
- Iterate on prompt
- Update component registry if needed
- Retest until score ≥ 85

---

## Documentation

- Full validation framework: `docs/VALIDATION_FRAMEWORK.md`
- Getting started: `docs/GETTING_STARTED.md`
- Case study: `CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md`
