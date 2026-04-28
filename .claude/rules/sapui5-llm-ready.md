# SAPUI5 LLM-Ready Design System Rules for Claude AI

## Quick Start

This repository is designed to be LLM-ready for Claude AI. When you load this GitHub repo, you can immediately start building SAP applications using the verified component registry and design system rules.

## Component Registry (41 Controls)

**Use only verified controls from `.cursor/skills/sapui5-basic-form-demo/SKILL.md`**

All 41 controls are 100% API-accurate and verified against official SAPUI5 documentation at https://ui5.sap.com/#/api

### Core Container Controls
- `sap.m.App` - Application container
- `sap.m.Page` - Page container

### Form Controls (sap.m)
- `sap.m.Label` - Form label
- `sap.m.Input` - Text input
- `sap.m.TextArea` - Multi-line input
- `sap.m.Select` - Dropdown selection
- `sap.m.ComboBox` - Searchable dropdown with filter
- `sap.ui.core.Item` - Select/ComboBox item
- `sap.m.Switch` - Toggle switch
- `sap.m.CheckBox` - Checkbox
- `sap.m.DatePicker` - Date picker
- `sap.m.MessageStrip` - Message display
- `sap.m.Link` - Hyperlink
- `sap.m.Slider` - Range slider
- `sap.m.MultiComboBox` - Multi-select dropdown
- `sap.m.RatingIndicator` - Star rating
- `sap.m.ProgressIndicator` - Progress bar
- `sap.m.SegmentedButton` - Segmented button group
- `sap.m.SegmentedButtonItem` - Segmented button item
- `sap.m.StepInput` - Numeric input with +/-
- `sap.m.ToggleButton` - Toggle button
- `sap.m.RadioButton` - Radio button
- `sap.m.MaskInput` - Input with mask format

### Action Controls (sap.m)
- `sap.m.Button` - Action button
- `sap.m.Toolbar` - Toolbar container
- `sap.m.ToolbarSpacer` - Toolbar spacer
- `sap.m.OverflowToolbar` - Toolbar with overflow
- `sap.m.SearchField` - Search input

### Display Controls (sap.m)
- `sap.m.Text` - Text display
- `sap.m.ObjectStatus` - Status indicator
- `sap.m.Image` - Image display
- `sap.m.Title` - Title text
- `sap.m.ObjectHeader` - Object header
- `sap.m.ObjectAttribute` - Object attribute
- `sap.m.GenericTag` - Generic tag
- `sap.m.MessagePopover` - Message popover
- `sap.m.MessagePopoverItem` - Message popover item

### Layout Controls (sap.m)
- `sap.m.Panel` - Grouping container
- `sap.m.Table` - Tabular data display
- `sap.m.Column` - Table column
- `sap.m.ColumnListItem` - Table row item
- `sap.m.Dialog` - Modal dialog
- `sap.m.HBox` - Horizontal flexbox
- `sap.m.VBox` - Vertical flexbox
- `sap.m.List` - List control
- `sap.m.StandardListItem` - Standard list item
- `sap.m.IconTabBar` - Tab bar with icons
- `sap.m.IconTabFilter` - Tab filter
- `sap.m.Breadcrumbs` - Breadcrumb navigation

### Layout Controls (sap.ui.layout.form)
- `sap.ui.layout.form.SimpleForm` - Form layout

### Other Controls
- `sap.ui.unified.FileUploader` - File upload
- `sap.tnt.InfoLabel` - Info label

## Short Names for Easier Prompting

You can use short names instead of full namespaces:
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
- `Link` → `sap.m.Link`
- `Slider` → `sap.m.Slider`
- `MultiComboBox` → `sap.m.MultiComboBox`
- `RatingIndicator` → `sap.m.RatingIndicator`
- `ProgressIndicator` → `sap.m.ProgressIndicator`
- `SegmentedButton` → `sap.m.SegmentedButton`
- `StepInput` → `sap.m.StepInput`
- `ToggleButton` → `sap.m.ToggleButton`
- `RadioButton` → `sap.m.RadioButton`
- `MaskInput` → `sap.m.MaskInput`
- `Image` → `sap.m.Image`
- `Title` → `sap.m.Title`
- `HBox` → `sap.m.HBox`
- `VBox` → `sap.m.VBox`
- `List` → `sap.m.List`
- `ObjectHeader` → `sap.m.ObjectHeader`
- `IconTabBar` → `sap.m.IconTabBar`
- `Breadcrumbs` → `sap.m.Breadcrumbs`
- `GenericTag` → `sap.m.GenericTag`
- `InfoLabel` → `sap.tnt.InfoLabel`
- `MessagePopover` → `sap.m.MessagePopover`
- `FileUploader` → `sap.ui.unified.FileUploader`

## Bootstrap Configuration

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

**Theme:** `sap_horizon` - Official SAP Fiori Horizon theme
**Libraries:** `sap.m` (mobile controls), `sap.ui.layout` (layout controls), `sap.ui.core` (core controls)

**Content Density (CSS classes):**
- `sapUiSizeCompact` - For desktop/non-touch devices (smaller controls, optimized for mouse)
- `sapUiSizeCozy` - For touch devices (larger touch targets, optimized for touch interaction)
- **Apply to:** `<body>` tag and/or View
- **Detection:** Use `Device.support.touch` to determine appropriate density

## Mandatory Rules

1. **Read SKILL.md** - Located at `.cursor/skills/sapui5-basic-form-demo/SKILL.md`
2. **Use only verified controls** - Registry-only constraint (41 controls)
3. **No hallucinated properties** - All properties must be in SKILL.md
4. **Follow SAP Fiori guidelines** - Clarity, Consistency, Responsiveness, Accessibility
5. **Validate against SAPUI5 API** - https://ui5.sap.com/#/api
6. **Use official SAPUI5 CDN** - `https://ui5.sap.com/resources/sap-ui-core.js`
7. **Fallback to OpenUI5 CDN** - `https://openui5.hana.ondemand.com/resources/sap-ui-core.js` (if components don't load)
8. **Namespace Requirements:**
   - `xmlns:unified="sap.ui.unified"` for FileUploader
   - `xmlns:tnt="sap.tnt"` for InfoLabel
   - Use `unified:FileUploader` and `tnt:InfoLabel` with appropriate prefixes

## Multi-Step Agent Architecture

Execute tasks in this order:
1. **Planner** - Translate request to structured UI plan
2. **Validator** - Critically verify the plan (check SAPUI5 API, no deprecated APIs, composability)
3. **Builder** - Generate final implementation

If validation fails → Provide feedback → Revise plan → Re-validate → Build

## Output Requirements

You MUST produce:
1. **Form Architecture** - Sections, fields, interaction flow
2. **SAPUI5 XML View** - Clean, modular, readable
3. **Controller Logic** - Event handling, validation, user feedback

## Prohibited Behavior

- No hallucinated APIs
- No skipped validation
- No partial implementations
- No vague descriptions instead of code
- No components not in SKILL.md
