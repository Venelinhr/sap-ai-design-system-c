# Getting Started with SAPUI5 LLM-Ready Design System

This guide will help you quickly get started with building SAPUI5 applications using AI-assisted development with zero hallucinations and 100% build success.

## 🎯 What You'll Need

- Node.js installed (for validation)
- An AI assistant (Claude, Cursor, Windsurf, or other LLM)
- Basic understanding of SAPUI5 concepts

## 📋 Prerequisites

### 1. Clone the Repository

```bash
git clone https://github.com/Venelinhr/SAP-LLM-ready-design-system.git
cd SAP-LLM-ready-design-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Installation

```bash
node validation/run-validation.js --help
```

If you see the help message, you're ready to go!

## 🚀 Quick Start (5 Minutes)

### Step 1: Choose Your AI Assistant

**For Claude AI:**
- Use the prompts in [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md#-claude-ai-prompts)
- Follow [Testing with Claude](docs/TESTING_WITH_CLAUDE.md)

**For Cursor AI:**
- The SKILL.md is already configured in `.cursor/skills/`
- Use prompts from [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md#-cursor-ai-prompts)
- Follow [Testing with Cursor](docs/TESTING_WITH_CURSOR.md)

**For Windsurf:**
- The `.windsurfrules` file is already configured
- Use prompts from [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md#-windsurf-prompts)
- Follow [Testing with Windsurf](docs/TESTING_WITH_WINDSURF.md)

**For Other LLMs:**
- Use the universal prompt template from [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md#-universal-prompt-template-chatgpt-etc)

### Step 2: Generate Your First SAPUI5 Component

**Example Prompt (Claude):**
```
Generate a SAPUI5 form with:
- Title: "User Registration"
- Fields: First Name, Last Name, Email
- Submit button
- Use only controls from SKILL.md
- Apply SAP Horizon theme with sapUiSizeCompact

Output: JSON format with meta section
```

### Step 3: Validate Your Output

```bash
# Save the LLM output to a file (e.g., output.json)
node validation/run-validation.js output.json
```

**Expected Result:**
- Score: ≥85/100
- Status: PASSED
- Zero hallucinations

### Step 4: Iterate if Needed

If validation fails:
1. Check the error messages
2. Fix the issues in your prompt
3. Regenerate
4. Re-validate

## 📖 Understanding the System

### The Component Registry

The verified component registry is in `.cursor/skills/sapui5-basic-form-demo/SKILL.md`

**Supported Controls (Short Names):**
- `Page` - sap.m.Page
- `App` - sap.m.App
- `Panel` - sap.m.Panel
- `Table` - sap.m.Table
- `Button` - sap.m.Button
- `Input` - sap.m.Input
- `Label` - sap.m.Label
- `Select` - sap.m.Select
- `CheckBox` - sap.m.CheckBox
- `Switch` - sap.m.Switch
- `DatePicker` - sap.m.DatePicker
- `TextArea` - sap.m.TextArea
- `ComboBox` - sap.m.ComboBox
- `Dialog` - sap.m.Dialog

**You can use either short names or full namespaces.**

### Design Tokens

**Density Classes:**
- `sapUiSizeCompact` - Desktop/non-touch
- `sapUiSizeCozy` - Touch devices

**Spacing Tokens:**
- `sapUiContentPadding` - Content spacing
- `sapUiSmallMargin` - Small margin
- `sapUiMediumMargin` - Medium margin

**Semantic Classes:**
- `sapMListBG` - List background
- `sapMBarBG` - Toolbar background
- `sapMPageBG` - Page background

### Output Format

Your LLM should output JSON in this format:

```json
{
  "ui": {
    "components": [...]
  },
  "meta": {
    "model": "claude",
    "design_system_version": "1.0",
    "timestamp": "2026-04-27T12:00:00Z"
  }
}
```

## ✅ Do's and Don'ts

### ✅ DO

- Use short names (Page, Table, Button) for easier prompting
- Validate your output after generation
- Include the meta section with model, version, timestamp
- Apply SAP Horizon theme tokens
- Follow SAP Fiori guidelines
- Check SKILL.md for available controls
- Use the validation pipeline

### ❌ DON'T

- Hallucinate properties not in the registry
- Use controls not documented in SKILL.md
- Guess API specifications
- Skip validation
- Use deprecated APIs
- Mix density modes incorrectly
- Forget design tokens

## 🔧 Advanced Usage

### Running Benchmarks

```bash
# Run a benchmark test
node benchmark/run-benchmark.js run output.json claude

# View leaderboard
node benchmark/run-benchmark.js leaderboard
```

### Understanding Validation Scores

- **Structure Accuracy (0-25)**: JSON structure correctness
- **Component Validity (0-20)**: Components in registry
- **Props Accuracy (0-15)**: Properties valid and complete
- **SAPUI5 Compliance (0-25)**: API compliance + design tokens
- **Consistency (0-15)**: Metadata completeness

**Target Score**: ≥85 for LLM-Ready certification

### Common Issues and Solutions

**Issue: Unknown component error**
- Solution: Check SKILL.md for the correct component name or short name

**Issue: Hallucinated property error**
- Solution: Remove the property or verify it exists in SKILL.md

**Issue: Missing design tokens**
- Solution: Add sapUiContentPadding and sapUiSizeCompact classes

**Issue: Low consistency score**
- Solution: Add meta.model, meta.design_system_version, meta.timestamp

## 📚 Next Steps

1. **Read the Case Study**: [CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md](CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md)
2. **Review Prompt Examples**: [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md)
3. **Check Documentation**: [docs/](docs/)
4. **Try the Presentation**: [docs/presentations/SAPUI5_LLM_READY_PRESENTATION.md](docs/presentations/SAPUI5_LLM_READY_PRESENTATION.md)

## 🎓 Learning Path

### Beginner
1. Generate a simple form (3-5 fields)
2. Validate the output
3. Understand the score breakdown

### Intermediate
1. Generate a list view with Table
2. Add ObjectStatus for status indicators
3. Apply proper design tokens

### Advanced
1. Generate a master-detail view
2. Implement navigation between views
3. Use multiple SAPUI5 controls together

## 💡 Tips for Success

1. **Start Simple**: Begin with basic forms, then move to complex layouts
2. **Validate Often**: Run validation after each generation
3. **Use Short Names**: They're easier to type and remember
4. **Check SKILL.md**: Always verify components exist in the registry
5. **Include Meta**: Always add the meta section for consistency
6. **Apply Design Tokens**: Don't forget density and spacing classes
7. **Iterate**: If validation fails, fix and try again

## 🆘 Troubleshooting

### Validation Command Not Found

```bash
# Make sure you're in the repository root
cd sap-ai-design-system-c

# Check if node_modules exists
ls node_modules

# If not, install dependencies
npm install
```

### LLM Won't Follow Instructions

- Be explicit about using SKILL.md
- Emphasize "no guessing" or "no hallucinations"
- Provide the exact output format you want
- Include examples in your prompt

### Low Validation Score

- Check which category has low points
- Fix the specific issue (e.g., add missing properties)
- Re-validate
- Aim for ≥85/100 overall

## 🤝 Contributing

Found a bug or want to add a feature?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validation to ensure quality
5. Submit a pull request

## 📞 Support

- **GitHub Issues**: https://github.com/Venelinhr/SAP-LLM-ready-design-system/issues
- **Documentation**: Check the [docs/](docs/) folder
- **Case Study**: [CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md](CASE_STUDY_SAP_DESIGN_SYSTEM_LLM_READY.md)

---

**Ready to build? Start with a simple form and validate your output!**
