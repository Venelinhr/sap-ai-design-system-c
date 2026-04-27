# Testing SAPUI5 LLM-Ready with Claude - Step-by-Step Guide

## Overview
This guide walks you through testing the SAPUI5 LLM-Ready design system with Claude AI to validate that it generates production-ready SAPUI5 code.

## Easy Prompting Guide

**Component Naming: You can use EITHER short names OR full namespaces.**

The validation system automatically converts short names to full namespaces during validation, so both formats work correctly.

**Short Names (Easier for prompting):**
- `Page` → `sap.m.Page`
- `Table` → `sap.m.Table`
- `Button` → `sap.m.Button`
- `Input` → `sap.m.Input`
- `Select` → `sap.m.Select`
- `Panel` → `sap.m.Panel`
- `Label` → `sap.m.Label`
- `Switch` → `sap.m.Switch`
- `CheckBox` → `sap.m.CheckBox`
- `DatePicker` → `sap.m.DatePicker`
- `TextArea` → `sap.m.TextArea`
- `ComboBox` → `sap.m.ComboBox`
- `Dialog` → `sap.m.Dialog`

**Full Namespaces (More explicit):**
- `sap.m.Page`
- `sap.m.Table`
- `sap.m.Button`
- `sap.m.Input`
- `sap.m.Select`
- `sap.m.Panel`
- `sap.m.Label`
- `sap.m.Switch`
- `sap.m.CheckBox`
- `sap.m.DatePicker`
- `sap.m.TextArea`
- `sap.m.ComboBox`
- `sap.m.Dialog`

**Recommendation:** Use short names for easier prompting (e.g., "Page", "Table", "Button"). The validation system will automatically convert them to full namespaces.

## Prerequisites
- Node.js v14 or higher installed
- Access to Claude AI (claude.ai or Claude Code)
- SAPUI5-llm-ready repository cloned

---

## Step 1: Navigate to Project Directory

```bash
cd /Users/C5408360/sapui5-llm-ready
```

---

## Step 2: Copy the Claude Test Prompt

The test prompt includes the full SKILL.md content so Claude has complete context:

```bash
cat tests/claude-prompt-with-skill.md
```

This will output the complete prompt (850+ lines) including:
- Test requirements
- Full SAPUI5 component registry
- Expected output format

---

## Step 3: Send Prompt to Claude

**Option A: Using Claude Web (claude.ai)**
1. Copy the entire output from Step 2
2. Paste into Claude chat
3. Send the message

**Option B: Using Claude Code (IDE)**
1. Copy the entire output from Step 2
2. Paste into Claude Code chat
3. Send the message

---

## Step 4: Save Claude's Output

Claude should respond with JSON in this format:
```json
{
  "ui_tree": { ... },
  "sapui5": {
    "xml_view": "...",
    "controller_js": "..."
  },
  "meta": {
    "design_system_version": "1.0.0",
    "model": "claude",
    "timestamp": "2026-04-26T..."
  }
}
```

**Save the output:**
```bash
# Create output file
nano test-outputs/claude-teammate-test.json

# Paste Claude's JSON output
# Save and exit (Ctrl+O, Enter, Ctrl+X)
```

---

## Step 5: Run Validation

```bash
node validation/run-validation.js test-outputs/claude-teammate-test.json
```

**Expected Output:**
```
=== LLM-Ready Validation Report ===
Status: PASSED

=== Score ===
Total: XX/100
Breakdown:
  - Structure Accuracy: XX/25
  - Component Validity: XX/20
  - Props Accuracy: XX/15
  - SAPUI5 Compliance: XX/25
  - Consistency: XX/15

=== Validation Results ===
JSON Schema: ✓/✗ PASSED/FAILED
Component Whitelist: ✓/✗ PASSED/FAILED
Hallucination Check: ✓/✗ PASSED/FAILED
```

---

## Step 6: Interpret Results

### Passing Score: ≥ 85/100
- **PASSED** status means LLM-Ready
- All validation checks should pass
- Zero hallucinations required

### Score Breakdown
- **Structure Accuracy (25 pts):** JSON structure correctness
- **Component Validity (20 pts):** All components in registry
- **Props Accuracy (15 pts):** Properties are valid
- **SAPUI5 Compliance (25 pts):** XML syntax and SAPUI5-specific rules
- **Consistency (15 pts):** Metadata completeness

---

## Step 7: Add to Benchmark (Optional)

If validation passes, add to benchmark leaderboard:

```bash
node benchmark/run-benchmark.js run test-outputs/claude-teammate-test.json claude-teammate
```

View leaderboard:
```bash
node benchmark/run-benchmark.js leaderboard
```

---

## Troubleshooting

### Issue: "Failed to parse JSON"
**Cause:** Claude included conversational text before JSON
**Fix:** Remove any text before `{` and save only the JSON

### Issue: "Unknown components"
**Cause:** Claude used components not in SKILL.md
**Fix:** Check which components were used and verify they're in the registry

### Issue: "Hallucinated properties"
**Cause:** Claude used properties not in property registry
**Fix:** Update `validation/hallucination-detector.js` to add missing properties

### Issue: Score < 85
**Cause:** Validation failed in one or more categories
**Fix:** Review the validation report for specific failures

---

## Success Criteria

✅ **Successful Test:**
- Score ≥ 85/100
- Status: PASSED
- Component Whitelist: PASSED
- Hallucination Check: PASSED (0 hallucinations)

❌ **Failed Test:**
- Score < 85/100
- Status: WARNING or FAILED
- Any validation check failed

---

## Next Steps After Success

1. **Test with different prompts** to verify consistency
2. **Run multiple tests** to measure variance
3. **Add results to case study** for documentation
4. **Compare with other models** (Cursor, Windsurf, etc.)

---

## Contact

For questions or issues, refer to:
- `CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md` - Full case study
- `docs/VALIDATION_FRAMEWORK.md` - Validation framework details
- `README.md` - Project overview
