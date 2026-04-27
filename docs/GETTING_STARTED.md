# Getting Started with LLM-Ready Validation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install the required Node.js packages:
- ajv - JSON schema validation
- xml2js - XML parsing
- commander - CLI tools
- chalk - Terminal colors

### 2. Test with an LLM

**Option A: Manual Testing**

1. Copy the canonical test prompt from `tests/canonical-test-prompt.md`
2. Send it to any LLM (Claude, Gemini, Codex, etc.)
3. Save the output as a JSON file

**Option B: Using Cursor**

See `docs/TESTING_WITH_CURSOR.md` for detailed instructions:
1. Open repository in Cursor: `cursor .`
2. Use Cursor's chat panel (Cmd+L)
3. Use the Cursor-specific prompt
4. Save output as JSON
5. Run validation: `node validation/run-validation.js cursor-output.json`

**Option C: Using Windsurf**

See `docs/TESTING_WITH_WINDSURF.md` for detailed instructions:
1. Open repository in Windsurf: `windsurf .`
2. Use Windsurf's chat panel (Cmd+L)
3. Use the Windsurf-specific prompt
4. Save output as JSON
5. Run validation: `node validation/run-validation.js windsurf-output.json`

**Option D: Using the Subscription Demo**

The subscription demo in `examples/subscription-demo/` can be used as a test case:
```bash
cd examples/subscription-demo
python3 -m http.server 8095
```

### 3. Run Validation

```bash
# Validate an LLM output file
node validation/run-validation.js <output-file>
```

This will:
- Run all validators
- Calculate score (0-100)
- Generate a detailed report
- Save report as `<output-file>-validation-report.json`

### 4. Run Benchmark

```bash
# Add result to benchmark
node benchmark/run-benchmark.js run <output-file> <model-name>

# View leaderboard
node benchmark/run-benchmark.js leaderboard
```

---

## Understanding the Score

### Score Breakdown (0-100)

- **Structure Accuracy (0-25)**: UI tree structure correctness
- **Component Validity (0-20)**: All components in registry
- **Props Accuracy (0-15)**: Property names and types
- **SAPUI5 Compliance (0-25)**: XML syntax and API compliance
- **Consistency (0-15)**: Output consistency across runs

### LLM-Ready Thresholds

- **Score ≥ 85**: LLM-Ready ✓
- **Score 70-84**: Warning ⚠
- **Score < 70**: Failed ✗

### Definition of DONE

A system is fully LLM-Ready when:
- Score ≥ 85
- Variance ≤ 10
- 0 hallucinations
- 100% schema-valid outputs

---

## Validation Tools

### 1. JSON Schema Validator

Validates output against expected schema.

```bash
node validation/json-schema-validator.js <output-file>
```

### 2. Component Whitelist Validator

Ensures all components are in the approved registry.

```bash
node validation/component-whitelist-validator.js <output-file>
```

### 3. Hallucination Detector

Detects hallucinated components and properties.

```bash
node validation/hallucination-detector.js <output-file>
```

### 4. Unified Validation Pipeline

Runs all validators in sequence.

```bash
node validation/run-validation.js <output-file>
```

---

## Example Workflow

### Step 1: Generate Output with LLM

```
You: "Hey Claude, build SAP payment subscription application using only components from SKILL.md. Output in JSON format with ui_tree, sapui5 (xml_view, controller_js), and meta sections."
```

### Step 2: Save Output

Save the LLM output as `claude-output.json`

### Step 3: Validate

```bash
node validation/run-validation.js claude-output.json
```

### Step 4: Check Score

If score ≥ 85: ✓ LLM-Ready
If score < 85: Review issues and iterate

### Step 5: Add to Benchmark

```bash
node benchmark/run-benchmark.js run claude-output.json claude
```

### Step 6: View Leaderboard

```bash
node benchmark/run-benchmark.js leaderboard
```

---

## Troubleshooting

### Issue: "Cannot find module 'ajv'"

**Solution:** Run `npm install` to install dependencies

### Issue: "Failed to parse JSON"

**Solution:** Ensure the output file is valid JSON format

### Issue: "Unknown component: XYZ"

**Solution:** Either add the component to the registry (SKILL.md) or ensure the LLM uses only verified components

### Issue: "Score is low (< 70)"

**Solution:** Review the validation report for specific issues:
- Check for hallucinated components
- Verify XML syntax
- Ensure all properties are valid
- Confirm SAPUI5 API compliance

---

## Advanced Usage

### Custom Test Prompts

You can create custom test prompts in the `tests/` directory following the format in `canonical-test-prompt.md`.

### Adding Components to Registry

To add a new component to the registry:
1. Update the component whitelist in `validation/component-whitelist-validator.js`
2. Add property definitions to `validation/hallucination-detector.js`
3. Update the skill file `.cursor/skills/sapui5-basic-form-demo/SKILL.md`

### Running Multiple Benchmarks

```bash
# Test multiple models
node benchmark/run-benchmark.js run claude-output.json claude
node benchmark/run-benchmark.js run gemini-output.json gemini
node benchmark/run-benchmark.js run codex-output.json codex

# Generate comparison
node benchmark/run-benchmark.js leaderboard
```

---

## File Reference

### Validation Tools
- `validation/scoring.js` - Scoring algorithm
- `validation/json-schema-validator.js` - Schema validation
- `validation/component-whitelist-validator.js` - Component validation
- `validation/hallucination-detector.js` - Hallucination detection
- `validation/run-validation.js` - Unified pipeline

### Benchmark Tools
- `benchmark/run-benchmark.js` - Benchmark runner
- `benchmark/results/` - Benchmark results storage
- `benchmark/leaderboard.json` - Model leaderboard

### Schemas
- `schemas/expected-output-schema.json` - Output schema
- `schemas/componentspec-schema.json` - ComponentSpec schema

### Tests
- `tests/canonical-test-prompt.md` - Standardized test prompt

### Documentation
- `docs/VALIDATION_FRAMEWORK.md` - Full validation framework
- `docs/GETTING_STARTED.md` - This file
- `CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md` - Case study

---

## Next Steps

1. Test with your preferred LLM
2. Run validation on the output
3. Check if score ≥ 85
4. If not, iterate and improve
5. Add results to benchmark
6. Compare across multiple models
7. Achieve 100% LLM-Ready status

---

## Support

For issues or questions:
1. Check `docs/VALIDATION_FRAMEWORK.md` for detailed framework information
2. Review the case study for methodology
3. Check the skill file for component details
