# Prompt Examples for LLMs

This document provides ready-to-use prompts for Claude, Cursor, Windsurf, and other LLMs to build SAPUI5 applications using the LLM-Ready framework.

## 🤖 Claude AI Prompts

### Basic Form Generation

```
Generate a SAPUI5 form with the following requirements:

Use only controls from the verified registry in .cursor/skills/sapui5-basic-form-demo/SKILL.md.
Follow SAP Fiori guidelines and apply SAP Horizon theme.

Form Requirements:
- Title: "User Registration"
- Fields: First Name (Input), Last Name (Input), Email (Input), Submit Button
- Use short names: Page, Panel, Label, Input, Button
- Include design tokens: sapUiContentPadding, sapUiSizeCompact
- Apply semantic classes for proper theming

Output format: JSON with structure:
{
  "ui": { ... },
  "meta": {
    "model": "claude",
    "design_system_version": "1.0",
    "timestamp": "ISO-8601"
  }
}
```

### List View Generation

```
Create a SAPUI5 list view with the following specifications:

Use only verified controls from SKILL.md.

Requirements:
- Table with columns: ID, Name, Status, Actions
- Status column should use ObjectStatus component
- Actions column should have Edit and Delete buttons
- Apply SAP Horizon theme with sapUiSizeCompact
- Include proper spacing tokens

Short names to use: Page, Table, Column, ObjectStatus, Button

Output: JSON format with complete meta section
```

### Object Page Generation

```
Generate a SAPUI5 Object Page for displaying product details:

Constraints:
- Use only controls from the verified registry
- Follow SAP Fiori Object Page pattern
- Apply SAP Horizon theme
- Include header section with title and subtitle
- Include content section with form fields
- Add footer with action buttons

Components to use: Page, ObjectHeader, Panel, Label, Input, Button, Toolbar

Output: JSON with meta.model, meta.design_system_version, meta.timestamp
```

---

## 🖱️ Cursor AI Prompts

### Project Context Setup

Add this to your `.cursorrules` file:

```
Always use SAPUI5 controls from the verified registry in .cursor/skills/sapui5-basic-form-demo/SKILL.md.
Never hallucinate properties or invent controls.
Use short names (Page, Table, Button) or full namespaces (sap.m.Page, sap.m.Table, sap.m.Button).
Validate output using: node validation/run-validation.js <output-file>
Follow SAP Fiori guidelines and SAP Horizon theme standards.
```

### Basic Prompt Pattern

```
Generate a SAPUI5 [component type] using only verified controls from SKILL.md.

Requirements:
- [specific requirements]
- Use short names: [list components]
- Include design tokens: sapUiContentPadding, sapUiSizeCompact
- Follow SAP Fiori guidelines

Validate the output using the validation pipeline.
```

### Example: Master-Detail View

```
Create a SAPUI5 master-detail view with:

Master View:
- List of items using Table component
- Click to navigate to detail view

Detail View:
- Display selected item details
- Edit and Delete buttons in toolbar

Use only controls from SKILL.md.
Apply SAP Horizon theme with sapUiSizeCompact.
Include proper navigation between views.

Components: App, Page, Table, Button, Toolbar
```

---

## 🌊 Windsurf Prompts

### Setup

The `.windsurfrules` file in this repository already contains the necessary rules. Simply open the repository in Windsurf and start prompting.

### Basic Prompt

```
Create a SAPUI5 [component] with:
- [specific requirements]
- Only use controls from the verified registry in SKILL.md
- Apply SAP Horizon theme and design tokens
```

### Example: Dashboard

```
Build a SAPUI5 dashboard with:

Layout:
- Header with title and user menu
- 3 cards displaying metrics
- Recent activity table
- Action buttons for common tasks

Constraints:
- Use only verified controls from SKILL.md
- Apply SAP Horizon theme
- Use sapUiSizeCompact for desktop
- Include proper spacing tokens

Components to use: Page, Panel, Toolbar, Button, Table, Label
```

---

## 📝 Universal Prompt Template (ChatGPT, etc.)

```
Context: You are building SAPUI5 applications using a verified component registry.

Source of Truth:
- Component registry: .cursor/skills/sapui5-basic-form-demo/SKILL.md
- Validation: node validation/run-validation.js

Constraints:
- Use ONLY controls from the registry
- No guessing or inventing properties
- Apply SAP Horizon theme tokens
- Include design tokens: sapUiContentPadding, sapUiSizeCompact
- Follow SAP Fiori guidelines

Task: [Your specific task here]

Component Naming:
- Short names: Page, Table, Button, Input, Label, Panel, etc.
- Full namespaces: sap.m.Page, sap.m.Table, sap.m.Button, etc.
- Both formats are supported

Output Format:
{
  "ui": {
    "components": [...]
  },
  "meta": {
    "model": "[model-name]",
    "design_system_version": "1.0",
    "timestamp": "[ISO-8601-timestamp]"
  }
}
```

---

## ✅ Best Practices

### DO:
- Use short names for easier prompting (Page, Table, Button)
- Validate your output using the validation pipeline
- Include meta section with model, version, timestamp
- Apply SAP Horizon theme tokens
- Follow SAP Fiori guidelines
- Use the SKILL.md as your source of truth

### DON'T:
- Hallucinate properties not in the registry
- Use controls not documented in SKILL.md
- Guess API specifications
- Skip validation
- Use deprecated APIs
- Mix density modes incorrectly

---

## 🔧 Validation

After generating output, always validate:

```bash
node validation/run-validation.js <your-output-file>
```

Expected result: Score ≥85/100 with zero hallucinations.

---

## 📚 Related Documentation

- [Easy Prompting Guide](docs/EASY_PROMPTING_GUIDE.md) - Short name mapping
- [Testing with Claude](docs/TESTING_WITH_CLAUDE.md) - Claude-specific instructions
- [Testing with Cursor](docs/TESTING_WITH_CURSOR.md) - Cursor-specific instructions
- [Testing with Windsurf](docs/TESTING_WITH_WINDSURF.md) - Windsurf-specific instructions
- [Validation Framework](docs/VALIDATION_FRAMEWORK.md) - Validation system details

---

## 💡 Tips

1. **Start Simple**: Begin with basic forms, then move to complex layouts
2. **Validate Often**: Run validation after each generation
3. **Use Short Names**: They're easier to type and remember
4. **Check SKILL.md**: Always verify components exist in the registry
5. **Include Meta**: Always add the meta section for consistency
6. **Apply Design Tokens**: Don't forget density and spacing classes

---

## 🎯 Quick Reference

### Common Components (Short Names)

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

### Design Tokens

- `sapUiSizeCompact` - Desktop density
- `sapUiSizeCozy` - Touch density
- `sapUiContentPadding` - Content spacing
- `sapUiSmallMargin` - Small margin
- `sapUiMediumMargin` - Medium margin

---

**Ready to build? Start with a simple form and validate your output!**
