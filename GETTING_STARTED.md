# Getting Started with SAPUI5 LLM-Ready Design System

This guide will help you quickly get started with building SAPUI5 applications using AI-assisted development with zero hallucinations and 100% build success.

**Current Status:** 41 verified SAPUI5 controls with 100% API-accurate properties, aggregations, and events.

## 🎯 What You'll Need

- An AI assistant (Claude, Cursor, Windsurf, VS Code with Copilot, ChatGPT, or other LLM)
- Basic understanding of SAPUI5 concepts (optional - the design system handles this)
- Clone this repository

## 📋 Prerequisites

### 1. Clone the Repository

```bash
git clone https://github.com/Venelinhr/SAP-LLM-ready-design-system.git
cd SAP-LLM-ready-design-system
```

### 2. No Installation Required

The design system is ready to use immediately with your AI assistant. No dependencies need to be installed.

## 🚀 Quick Start (5 Minutes)

### Step 1: Choose Your AI Assistant

**For Claude AI:**
- Open the repository in Claude Desktop
- The `.windsurf/rules/sapui5-fiori.md` file is automatically loaded
- Use prompts from [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md#claude-anthropic)
- See detailed component documentation in [COMPONENTS.md](COMPONENTS.md)

**For Cursor AI:**
- Open the repository in Cursor IDE
- The `.cursor/rules/sapui5-llm-ready.md` file is automatically loaded
- The `.cursor/skills/sapui5-basic-form-demo/SKILL.md` skill is automatically activated
- Use prompts from [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md#cursor-ai)

**For Windsurf:**
- Open the repository in Windsurf IDE
- The `.windsurf/rules/sapui5-fiori.md` file is automatically loaded
- Use prompts from [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md#windsurf)

**For VS Code with GitHub Copilot:**
- Open the repository in VS Code
- Keep [COMPONENTS.md](COMPONENTS.md) open for reference
- Use prompts from [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md#vs-code-with-ai-extensions)

**For ChatGPT (Web Interface):**
- Copy the contents of [COMPONENTS.md](COMPONENTS.md)
- Paste it into ChatGPT as context
- Use prompts from [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md#chatgpt-openai)

### Step 2: Generate Your First SAPUI5 Application

**Example Prompt (Any AI):**
```
I'm building a SAPUI5 application using the LLM-ready design system.
Create a customer information form with:
- Fields: First Name, Last Name, Email, Phone, Address
- Use SimpleForm with ResponsiveGridLayout layout
- Add Save and Cancel buttons
- Use only verified controls from the registry (41 controls)
- Apply SAP Horizon theme with sapUiSizeCompact density
```

### Step 3: Review the Generated Code

The AI will generate:
1. **Form Architecture** - Sections, fields, interaction flow
2. **SAPUI5 XML View** - Clean, modular, readable code
3. **Controller Logic** - Event handling, validation, user feedback

**Verify:**
- All controls are in the 41-component registry
- All properties are documented in [COMPONENTS.md](COMPONENTS.md)
- Theme is `sap_horizon`
- Density is `sapUiSizeCompact` or `sapUiSizeCozy`

## 📖 Understanding the System

### The Component Registry (41 Verified Controls)

The verified component registry is in [COMPONENTS.md](COMPONENTS.md) and `.cursor/skills/sapui5-basic-form-demo/SKILL.md`

**Core Container Controls (2):**
- `App` - Application container
- `Page` - Page container

**Form Controls (21):**
- `Label` - Form label
- `Input` - Text input
- `TextArea` - Multi-line input
- `Select` - Dropdown selection
- `ComboBox` - Searchable dropdown
- `Item` - Select/ComboBox item
- `Switch` - Toggle switch
- `CheckBox` - Checkbox
- `DatePicker` - Date picker
- `MessageStrip` - Message display
- `Link` - Hyperlink
- `Slider` - Range slider
- `MultiComboBox` - Multi-select dropdown
- `RatingIndicator` - Star rating
- `ProgressIndicator` - Progress bar
- `SegmentedButton` - Segmented button group
- `SegmentedButtonItem` - Segmented button item
- `StepInput` - Numeric input with +/-
- `ToggleButton` - Toggle button
- `RadioButton` - Radio button
- `MaskInput` - Input with mask format

**Action Controls (5):**
- `Button` - Action button
- `Toolbar` - Toolbar container
- `ToolbarSpacer` - Toolbar spacer
- `OverflowToolbar` - Toolbar with overflow
- `SearchField` - Search input

**Display Controls (9):**
- `Text` - Text display
- `ObjectStatus` - Status indicator
- `Image` - Image display
- `Title` - Title text
- `ObjectHeader` - Object header
- `ObjectAttribute` - Object attribute
- `GenericTag` - Generic tag
- `MessagePopover` - Message popover
- `MessagePopoverItem` - Message popover item

**Layout Controls (12):**
- `Panel` - Grouping container
- `Table` - Tabular data display
- `Column` - Table column
- `ColumnListItem` - Table row item
- `Dialog` - Modal dialog
- `HBox` - Horizontal flexbox
- `VBox` - Vertical flexbox
- `List` - List control
- `StandardListItem` - Standard list item
- `IconTabBar` - Tab bar with icons
- `IconTabFilter` - Tab filter
- `Breadcrumbs` - Breadcrumb navigation

**Layout Controls (sap.ui.layout.form) (1):**
- `SimpleForm` - Form layout

**Other Controls (2):**
- `FileUploader` - File upload (requires `xmlns:unified="sap.ui.unified"`)
- `InfoLabel` - Info label (requires `xmlns:tnt="sap.tnt"`)

**You can use either short names (e.g., "Page", "Table") or full namespaces (e.g., "sap.m.Page", "sap.m.Table").**

### Bootstrap Configuration

**Required bootstrap settings:**
```html
<script
  id="sap-ui-bootstrap"
  src="https://ui5.sap.com/resources/sap-ui-core.js"
  data-sap-ui-theme="sap_horizon"
  data-sap-ui-compatVersion="edge"
  data-sap-ui-async="true"
  data-sap-ui-libs="sap.m,sap.ui.layout,sap.ui.core"
  data-sap-ui-resourceroots='{"appnamespace":"./"}'
></script>
```

### Design Tokens

**Theme:**
- `sap_horizon` - Official SAP Fiori Horizon theme

**Density Classes:**
- `sapUiSizeCompact` - Desktop/non-touch (smaller controls)
- `sapUiSizeCozy` - Touch devices (larger touch targets)

**Spacing Tokens:**
- `sapUiContentPadding` - Content spacing
- `sapUiSmallMargin` - Small margin
- `sapUiSmallMarginBottom` - Small bottom margin (default for panels)
- `sapUiMediumMargin` - Medium margin

## ✅ Do's and Don'ts

### ✅ DO

- Use short names (Page, Table, Button) for easier prompting
- Use only the 41 verified controls from the registry
- Apply SAP Horizon theme (sap_horizon)
- Apply sapUiSizeCompact density for desktop
- Follow SAP Fiori guidelines (Clarity, Consistency, Responsiveness, Accessibility)
- Check [COMPONENTS.md](COMPONENTS.md) for available controls and properties
- Use the multi-step agent architecture (Planner → Validator → Builder)
- Request validation against SAPUI5 API

### ❌ DON'T

- Use controls not in the 41-component registry
- Hallucinate properties not documented in [COMPONENTS.md](COMPONENTS.md) or SKILL.md
- Guess API specifications
- Use deprecated APIs
- Forget namespace requirements for FileUploader and InfoLabel
- Skip the multi-step validation process

## 🔧 Advanced Usage

### Multi-Step Agent Architecture

The design system uses a multi-step agent architecture:

1. **Planner** - Translate request to structured UI plan
2. **Validator** - Critically verify the plan (check SAPUI5 API, no deprecated APIs, composability)
3. **Builder** - Generate final implementation

If validation fails → Provide feedback → Revise plan → Re-validate → Build

### Namespace Requirements

**For FileUploader:**
- Add to XML namespaces: `xmlns:unified="sap.ui.unified"`
- Use prefix: `unified:FileUploader`

**For InfoLabel:**
- Add to XML namespaces: `xmlns:tnt="sap.tnt"`
- Use prefix: `tnt:InfoLabel`

## 📚 Next Steps

1. **Read Component Documentation**: [COMPONENTS.md](COMPONENTS.md)
2. **Review Usage Instructions**: [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md)
3. **Check Prompt Examples**: [PROMPT_EXAMPLES.md](PROMPT_EXAMPLES.md)
4. **Read the README**: [README.md](README.md)

## 🎓 Learning Path

### Beginner
1. Generate a simple form (3-5 fields)
2. Review the generated code
3. Verify all controls are in the registry
4. Test in a browser

### Intermediate
1. Generate a list view with Table
2. Add ObjectStatus for status indicators
3. Apply proper design tokens (sapUiSizeCompact, sapUiSmallMarginBottom)
4. Use Toolbar with ToolbarSpacer

### Advanced
1. Generate a master-detail view
2. Implement navigation between views
3. Use multiple SAPUI5 controls together
4. Apply proper namespace handling for FileUploader and InfoLabel

## 💡 Tips for Success

1. **Start Simple**: Begin with basic forms, then move to complex layouts
2. **Use Short Names**: They're easier to type and remember
3. **Check Registry**: Always verify components exist in the 41-control registry
4. **Apply Design Tokens**: Don't forget density and spacing classes
5. **Iterate**: If the code doesn't work, refine your prompt
6. **Reference Documentation**: Keep [COMPONENTS.md](COMPONENTS.md) open for reference

## 🆘 Troubleshooting

### AI Won't Follow Instructions

- Be explicit about using the LLM-ready design system
- Reference the [COMPONENTS.md](COMPONENTS.md) file
- Emphasize "use only verified controls from the registry"
- Provide the exact component count (41 controls)

### Unknown Component Error

- Check [COMPONENTS.md](COMPONENTS.md) for the correct component name
- Use short names (e.g., "Page" instead of "sap.m.Page")
- Verify the control is in the 41-component registry

### Wrong Namespace Error

- For FileUploader: Add `xmlns:unified="sap.ui.unified"` and use `unified:FileUploader`
- For InfoLabel: Add `xmlns:tnt="sap.tnt"` and use `tnt:InfoLabel`

## 📞 Support

- **GitHub Issues**: https://github.com/Venelinhr/SAP-LLM-ready-design-system/issues
- **Component Documentation**: [COMPONENTS.md](COMPONENTS.md)
- **Usage Instructions**: [USAGE_INSTRUCTIONS.md](USAGE_INSTRUCTIONS.md)
- **Registry Analysis**: [COMPONENT_REGISTRY_ANALYSIS.md](COMPONENT_REGISTRY_ANALYSIS.md)

---

**Ready to build? Open the repository in your AI assistant and start building SAP applications immediately!**
