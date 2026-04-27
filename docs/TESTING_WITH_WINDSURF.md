# Testing with Windsurf

## Overview

This guide shows how to test the SAPUI5 LLM-Ready design system using Windsurf AI coding assistant.

---

## Prerequisites

1. **Install Windsurf** - Download from https://windsurf.ai
2. **Install Node.js** - For validation tools
3. **Clone this repository** - `git clone <repo-url> && cd sapui5-llm-ready`
4. **Install dependencies** - `npm install`

---

## Quick Start with Windsurf

### Step 1: Open Repository in Windsurf

```bash
cd sapui5-llm-ready
windsurf .
```

### Step 2: Use Windsurf's Chat Feature

Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux) to open Windsurf's chat panel.

### Step 3: Test with Windsurf-Specific Prompt

Copy and paste this prompt into Windsurf's chat:

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

When Windsurf generates the output, save it as a JSON file:

```bash
# Create output directory
mkdir -p test-outputs

# Save Windsurf output
windsurf-output.json
```

### Step 5: Run Validation

```bash
node validation/run-validation.js test-outputs/windsurf-output.json
```

### Step 6: Check Score

- If score ≥ 85: ✓ Windsurf is LLM-Ready
- If score < 85: Review issues and iterate

### Step 7: Add to Benchmark

```bash
node benchmark/run-benchmark.js run test-outputs/windsurf-output.json windsurf
```

---

## Windsurf-Specific Features

### Using Windsurf's Codebase Awareness

Windsurf can read your entire codebase. Use this to your advantage:

```
Read the SKILL.md file in .cursor/skills/sapui5-basic-form-demo/ and use ONLY the components listed there to build the application.
```

### Using Windsurf's File Context

You can ask Windsurf to read specific files:

```
Read the validation framework in docs/VALIDATION_FRAMEWORK.md and ensure your output meets the LLM-Ready criteria.
```

### Using Windsurf's Edit Feature

After generating the initial output, ask Windsurf to fix issues:

```
The validation report shows the following issues:
[PASTE VALIDATION ISSUES]
Please fix these issues and regenerate the output.
```

---

## Advanced Windsurf Testing

### Multiple Iterations

Test Windsurf's consistency by running the same prompt multiple times:

```bash
# Run 1
node validation/run-validation.js test-outputs/windsurf-output-1.json

# Run 2
node validation/run-validation.js test-outputs/windsurf-output-2.json

# Run 3
node validation/run-validation.js test-outputs/windsurf-output-3.json
```

Compare scores to measure consistency (target: variance ≤ 10).

### Complex Applications

Test Windsurf with more complex prompts:

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

Test Windsurf's ability to fix errors:

1. Intentionally use an invalid component name
2. Let Windsurf generate the output
3. Run validation
4. Show Windsurf the validation report
5. Ask Windsurf to fix the issues

---

## Windsurf Best Practices

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

Ask Windsurf to self-validate:

```
Before outputting, verify that:
1. All components are in the SKILL.md registry
2. All properties are valid for their components
3. The XML follows SAPUI5 syntax
```

---

## Troubleshooting Windsurf

### Issue: Windsurf invents components

**Solution:** Be more explicit:
```
DO NOT invent any components. Use ONLY the exact component names listed in SKILL.md.
```

### Issue: Windsurf outputs code instead of JSON

**Solution:** Be more explicit about format:
```
Output ONLY JSON. Do not output code blocks or explanations. Just the JSON object.
```

### Issue: Windsurf misses required fields

**Solution:** Reference the schema:
```
Your output must include: ui_tree (with type, props, children), sapui5 (with xml_view, controller_js), and meta (with design_system_version, model).
```

---

## Windsurf Integration with Validation

### Automated Workflow

Create a script to automate Windsurf testing:

```bash
# test-windsurf.sh
#!/bin/bash
echo "Testing with Windsurf..."
# 1. Open Windsurf and run prompt
# 2. Save output
# 3. Run validation
node validation/run-validation.js test-outputs/windsurf-output.json
# 4. Add to benchmark
node benchmark/run-benchmark.js run test-outputs/windsurf-output.json windsurf
```

### Windsurf + CI/CD

Add Windsurf testing to your CI/CD pipeline (requires Windsurf API):

```yaml
# .github/workflows/windsurf-test.yml
name: Windsurf LLM-Ready Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Test with Windsurf
        run: |
          # Call Windsurf API to generate output
          # Run validation
          node validation/run-validation.js windsurf-output.json
```

---

## Expected Results

**Target Score:** ≥ 85/100

**If Windsurf achieves this:**
- ✓ Windsurf is LLM-Ready for SAPUI5
- ✓ Can be used for production SAPUI5 development
- ✓ Add to leaderboard as top performer

**If Windsurf doesn't achieve this:**
- Review validation report
- Iterate on prompt
- Update component registry if needed
- Retest until score ≥ 85

---

## Documentation

- Full validation framework: `docs/VALIDATION_FRAMEWORK.md`
- Getting started: `docs/GETTING_STARTED.md`
- Case study: `CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md`
