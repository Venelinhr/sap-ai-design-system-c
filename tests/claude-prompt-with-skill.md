Build a SAP Fiori application using SAPUI5.

Requirements:
- Page: Product List
- Components:
  - Header (Title: "Products")
  - Table (columns: Name, Price, Availability)
  - Button (Primary: "Add to Cart")

Use ONLY components from this design system:

**Component Naming:** You can use either short names (Page, Table, Button) or full namespaces (sap.m.Page, sap.m.Table, sap.m.Button). Both formats are accepted and validated correctly.

**MANDATORY Design Token Requirements:**
You MUST apply SAP Horizon theme design tokens for visual compliance:
- Use `sapUiSizeCompact` or `sapUiSizeCozy` for content density
- Use `sapUiContentPadding` class on Page content
- Use spacing tokens like `sapUiSmallMargin`, `sapUiMediumMargin`
- Use semantic classes like `sapMListBG`, `sapMBarBG`, `sapMPageBG`
- Apply Horizon theme colors via design tokens (sapPrimary, sapNeutralBG, etc.)

Your output MUST include these design tokens in the XML view and UI tree class properties.
---
name: sapui5-basic-form-demo
description: >-
  Production-ready SAPUI5 form development skill with strict validation pipeline,
  verified controls, and enterprise-grade quality standards. Covers sap.m and
  sap.ui.layout.form controls with 100% API-accurate properties, aggregations,
  and events. Follows SAP Fiori design principles and multi-step agent architecture
  (Planner → Validator → Builder). All controls verified against official SAPUI5 API
  at ui5.sap.com. Includes Horizon theme, sapUiSizeCompact, and proper form patterns.
  Triggers: SAPUI5 form, basic demo, customer demo, purchase order, simple form,
  sap.m controls, sap.ui.layout.form, Horizon theme, compact density, enterprise form.
---

# SAPUI5 Enterprise Form Development - Production-Ready (100% API-Accurate)

> **Repository:** [sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)
> **API Source:** [SAPUI5 SDK - Demo Kit](https://ui5.sap.com/#/api)
> **Theme:** sap_horizon (official SAP Fiori Horizon theme)
> **Density:** sapUiSizeCompact (desktop/non-touch), sapUiSizeCozy (touch devices)
> **Quality Standard:** Enterprise production grade, not examples or prototypes

Use this skill when creating production-grade SAPUI5 form applications with standard controls. Follow the multi-step validation pipeline (Planner → Validator → Builder) and strict engineering principles. All controls, properties, and aggregations are verified against the official SAPUI5 API documentation.

---

## -1) Core Operating Principles (Strict Engineering Mode)

### Documentation-First Enforcement
- Always rely on official SAPUI5 APIs and SAP Fiori guidelines
- Never invent, approximate, or guess APIs
- Avoid deprecated or legacy components

### Strict Validation Pipeline (MANDATORY)
Execute tasks in this order:
1. **Understand the request** - Clarify requirements
2. **Map requirements → SAPUI5 components** - Select verified controls
3. **Validate against documentation** - Check SAPUI5 API
4. **Check component compatibility** - Ensure composability
5. **Validate UX against Fiori standards** - SAP Fiori principles
6. **Only then implement** - Generate code

If any step fails → DO NOT proceed.

### Component Integrity Rules
Ensure all UI controls:
- Are composable together
- Follow lifecycle and binding rules
- Do not conflict in layout or behavior
- Prefer stable, widely supported controls

### UX & Design Compliance
Follow SAP Fiori principles:
- **Clarity** - Clear, understandable interface
- **Consistency** - Uniform design patterns
- **Responsiveness** - Adaptive to screen sizes
- **Accessibility** - ARIA attributes, keyboard navigation
- Use proper layout containers (forms, panels, grids)

### Transparency & Failure Handling
If something cannot be implemented:
```
⚠️ LIMITATION DETECTED
```
Then:
- Explain the issue clearly
- Reference the constraint (API, UX rule, or architecture)
- Provide a valid alternative solution

### Output Requirements (MANDATORY)
You MUST produce:
1. **Form Architecture** - Sections, fields, interaction flow
2. **SAPUI5 XML View** - Clean, modular, readable
3. **Controller Logic** - Event handling, validation, user feedback

### Prohibited Behavior
- No hallucinated APIs
- No skipped validation
- No partial implementations
- No vague descriptions instead of code

### Quality Standard
Output must match **enterprise SAP production quality**, not examples or prototypes.

---

## 0) Multi-Step Agent Architecture

### Overview
The system consists of 3 roles:
1. **Planner** - Translate request to structured UI plan
2. **Validator** - Critically verify the plan
3. **Builder** - Generate final implementation

### Step 1: Planner Agent
**Role:** Translate user request into structured UI plan

**Output Format:**
```
UI_PLAN:
- Sections:
  - Section Name
    - Fields (type → SAPUI5 control mapping)
- Required Components:
- Interaction Patterns:
- Data Flow:
```

**Rules:**
- No code
- Map each feature to a real SAPUI5 control
- Include all required UI elements

### Step 2: Validator Agent
**Role:** Critically verify the plan

**Validation Checklist:**
- Components exist in SAPUI5
- No deprecated APIs
- Components are composable
- Fiori UX compliance
- No conflicting patterns

**Output:**
```
VALIDATION: PASS
```
or
```
VALIDATION: FAIL
⚠️ LIMITATION DETECTED
- Issue:
- Reason:
- Fix / Alternative:
```

### Step 3: Builder Agent
**Role:** Generate final implementation

**Input:** Approved UI_PLAN

**Output:**
1. Architecture Overview
2. SAPUI5 XML View
3. Controller (JS)

**Rules:**
- Strictly follow validated plan
- No deviations without re-validation

### Execution Flow
```
User Request → Planner (UI_PLAN) → Validator (PASS/FAIL) → Builder (Final Code)
```

### Fail-Safe Loop
If validation fails: Validator → Feedback → Planner (revised) → Validator (again). Repeat until PASS.

---

## 1) Bootstrap Configuration (index.html)

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

**Theme:** `sap_horizon` - Official SAP Fiori Horizon theme (default for modern SAP applications)
**Libraries:** `sap.m` (mobile controls), `sap.ui.layout` (layout controls), `sap.ui.core` (core controls)

**Content Density (CSS classes):**
- `sapUiSizeCompact` - For desktop/non-touch devices (smaller controls, optimized for mouse)
- `sapUiSizeCozy` - For touch devices (larger touch targets, optimized for touch interaction)
- **Apply to:** `<body>` tag and/or View
- **Detection:** Use `Device.support.touch` to determine appropriate density
- `Manifest.json:` Specify supported densities: `"contentDensities": { "compact": true, "cozy": true }`

---

## 2) Form Architecture Pattern

**Required Output Before Implementation:**

```
FORM_ARCHITECTURE:
- Sections:
  - Section Name 1
    - Field 1: [Type] → [SAPUI5 Control]
    - Field 2: [Type] → [SAPUI5 Control]
  - Section Name 2
    - Field 3: [Type] → [SAPUI5 Control]
- Required Components:
  - [Control 1]
  - [Control 2]
- Interaction Patterns:
  - [Pattern 1]
  - [Pattern 2]
- Data Flow:
  - [Model Structure]
  - [Binding Paths]
```

**Example:**
```
FORM_ARCHITECTURE:
- Sections:
  - Tax Payer Information
    - Allocation ID: [String] → sap.m.Input
    - Taxpayer Name: [String] → sap.m.Input (required)
    - Taxpayer Type: [Enum] → sap.m.Select
  - Allocation Details
    - Total Amount: [Number] → sap.m.Input (type="Number")
    - Currency: [String] → sap.m.Select (EUR fixed)
- Required Components:
  - sap.m.App, sap.m.Page, sap.ui.layout.form.SimpleForm
  - sap.m.Panel (4 sections), sap.m.Table (line items)
- Interaction Patterns:
  - Add/Delete table rows
  - Auto-calculate on field change
  - Validation on Save
- Data Flow:
  - JSONModel with allocations array
  - Two-way binding to form fields
  - Formatters for calculated fields
```

---

## 3) Core Container Controls

### sap.m.App
**Purpose:** Root application container, provides full viewport management
**Key Properties:**
- `busyIndicatorDelay` - Delay before busy indicator appears (default: 1000ms)
**Aggregations:**
- `pages` (0..n) - Array of `sap.m.Page` controls
**Usage:** Always wrap pages in `sap.m.App` for proper viewport handling

### sap.m.Page
**Purpose:** Page container with header and content areas
**Key Properties:**
- `title` - Page title (string)
- `showNavButton` - Show back navigation button (boolean)
- `enableScrolling` - Enable content scrolling (boolean)
- `backgroundDesign` - Background design: "Standard", "Transparent", "Solid" (enum)
- `class` - CSS classes, e.g., "sapUiContentPadding"
**Aggregations:**
- `content` (0..n) - Page content controls
- `customHeader` (0..1) - Custom header toolbar
**Usage:** Primary container for application screens

---

## 4) Form Controls (sap.m)

### sap.m.Label
**Purpose:** Label text for form fields
**Verified Properties:**
- `text` - Label text (string)
- `required` - Show required indicator (boolean)
- `design` - Label design: "Bold", "Standard" (enum)
- `textAlignment` - Text alignment: "Begin", "Center", "End", "Left", "Right" (enum)
- `textDirection` - Text direction: "LTR", "RTL" (enum)
- `width` - Label width (CSS size string)
- `labelFor` - ID of associated control (string)
**Events:** None
**Usage:** Pair with input controls in forms

### sap.m.Input
**Purpose:** Single-line text input field
**Verified Properties:**
- `value` - Input value (string)
- `placeholder` - Placeholder text (string)
- `type` - Input type: "Text", "Email", "Number", "Tel", "Url", "Password" (enum)
- `required` - Required field indicator (boolean)
- `editable` - Editable state (boolean)
- `maxLength` - Maximum character length (int)
- `showValueHelp` - Show value help icon (boolean)
**Events:**
- `change` - Fired when value changes and focus is lost
- `liveChange` - Fired while typing
- `valueHelpRequest` - Fired when value help icon is clicked
**Usage:** Standard text input for form fields

### sap.m.TextArea
**Purpose:** Multi-line text input
**Verified Properties:**
- `value` - Text value (string)
- `rows` - Number of visible rows (int)
- `cols` - Number of visible columns (int)
- `height` - Control height (CSS size string)
- `maxLength` - Maximum character length (int)
- `growing` - Auto-grow height (boolean)
- `growingMaxLines` - Maximum lines when growing (int)
- `wrapping` - Text wrapping: "Off", "On" (enum)
- `valueLiveUpdate` - Update value during typing (boolean)
**Events:**
- `change` - Fired when value changes and focus is lost
- `liveChange` - Fired while typing
**Usage:** Multi-line text input for notes, descriptions

### sap.m.Select
**Purpose:** Dropdown selection control
**Verified Properties:**
- `selectedKey` - Selected item key (string)
**Aggregations:**
- `items` (0..n) - Array of `sap.ui.core.Item` controls
**Events:**
- `change` - Fired when selection changes
**Usage:** Dropdown selection from predefined options

### sap.ui.core.Item
**Purpose:** Item for Select/ComboBox
**Verified Properties:**
- `key` - Item key (string)
- `text` - Display text (string)
**Usage:** Define options for Select/ComboBox controls

### sap.m.Switch
**Purpose:** Toggle switch control
**Verified Properties:**
- `state` - Switch state: true/false (boolean)
- `enabled` - Enabled state (boolean)
- `type` - Switch type: "Default", "Accept", "Reject" (enum)
**Events:**
- `change` - Fired when switch state changes
**Usage:** Binary toggle (on/off, true/false)

### sap.m.CheckBox
**Purpose:** Checkbox control
**Verified Properties:**
- `selected` - Selected state (boolean)
- `text` - Label text (string)
- `enabled` - Enabled state (boolean)
**Events:**
- `select` - Fired when checkbox state changes
**Usage:** Multi-select option

### sap.m.DatePicker
**Purpose:** Date selection control
**Verified Properties:**
- `value` - Date value (string, format depends on displayFormat)
- `displayFormat` - Display format (string, e.g., "yyyy-MM-dd")
- `valueFormat` - Value format (string, e.g., "yyyy-MM-dd")
- `placeholder` - Placeholder text (string)
**Events:**
- `change` - Fired when date selection changes
**Usage:** Date input with calendar picker

### sap.m.MessageStrip
**Purpose:** Information/alert message display
**Verified Properties:**
- `text` - Message text (string)
- `type` - Message type: "Information", "Success", "Warning", "Error" (enum)
- `showIcon` - Show type icon (boolean)
- `showCloseButton` - Show close button (boolean)
- `customIcon` - Custom icon URI (string)
- `link` - Link URI (string)
**Events:**
- `close` - Fired when close button is clicked
**Usage:** Display informational messages, alerts, notifications

---

## 5) Action Controls

### sap.m.Button
**Purpose:** Action button
**Verified Properties:**
- `text` - Button text (string)
- `type` - Button type: "Default", "Emphasized", "Accept", "Reject", "Transparent" (enum)
- `enabled` - Enabled state (boolean)
- `icon` - Icon URI (string)
**Events:**
- `press` - Fired when button is pressed
**Usage:** Primary and secondary actions

### sap.m.Toolbar
**Purpose:** Action toolbar container
**Key Properties:**
- `active` - Active state (boolean)
- `design` - Toolbar design: "Auto", "Info", "Transparent" (enum)
**Aggregations:**
- `content` (0..n) - Toolbar content controls (Button, ToolbarSpacer, etc.)
**Usage:** Container for action buttons and spacers

### sap.m.ToolbarSpacer
**Purpose:** Flexible spacer in toolbar
**Key Properties:** None (spans available space)
**Usage:** Push buttons to right side of toolbar

### sap.m.ComboBox
**Purpose:** Searchable dropdown with filter capability
**Verified Properties:**
- `selectedKey` - Selected item key (string)
- `value` - Input value (string)
- `placeholder` - Placeholder text (string)
- `showValueHelp` - Show value help icon (boolean)
**Aggregations:**
- `items` (0..n) - Array of `sap.ui.core.Item` controls
**Events:**
- `selectionChange` - Fired when selection changes
- `change` - Fired when value changes
**Usage:** Dropdown with search/filter for large option lists

### sap.m.Text
**Purpose:** Text display control
**Verified Properties:**
- `text` - Text content (string)
- `maxLines` - Maximum lines to display (int)
- `wrapping` - Text wrapping: "Off", "On" (enum)
- `textAlign` - Text alignment: "Begin", "Center", "End", "Left", "Right" (enum)
**Events:** None
**Usage:** Display read-only text content

### sap.m.ObjectStatus
**Purpose:** Status indicator with text and/or icon
**Verified Properties:**
- `text` - Status text (string)
- `state` - Status state: "Success", "Warning", "Error", "Information", "None" (enum)
- `icon` - Icon URI (string)
- `title` - Tooltip title (string)
- `textDirection` - Text direction: "LTR", "RTL" (enum)
**Events:** None
**Usage:** Display status information (e.g., "Approved", "Pending", "Rejected")

### sap.m.Panel
**Purpose:** Grouping container with header
**Verified Properties:**
- `headerText` - Panel header text (string)
- `expandable` - Expandable/collapsible (boolean)
- `expanded` - Initial expanded state (boolean)
- `backgroundDesign` - Background: "Solid", "Transparent", "Translucent" (enum)
**Aggregations:**
- `content` (0..n) - Panel content controls
- `headerToolbar` (0..1) - Custom header toolbar
**Usage:** Group related content sections

### sap.m.Table
**Purpose:** Tabular data display
**Verified Properties:**
- `mode` - Selection mode: "None", "SingleSelect", "MultiSelect", "Delete" (enum)
- `backgroundDesign` - Background: "Solid", "Transparent", "Translucent" (enum)
- `fixedLayout` - Fixed table layout (boolean)
- `growing` - Growing table with more button (boolean)
- `growingThreshold` - Rows before growing (int)
**Aggregations:**
- `columns` (0..n) - Array of `sap.m.Column` controls
- `items` (0..n) - Array of `sap.m.ColumnListItem` controls
- `headerToolbar` (0..1) - Header toolbar
- `infoToolbar` (0..1) - Info toolbar
**Events:**
- `selectionChange` - Fired when selection changes
- `itemPress` - Fired when row is pressed
**Usage:** Display tabular data with columns and rows

### sap.m.Column
**Purpose:** Table column definition
**Verified Properties:**
- `header` - Column header text or control
- `width` - Column width (CSS size string)
- `minWidth` - Minimum column width (CSS size string)
- `demandPopin` - Show in popin on small screens (boolean)
- `popinDisplay` - Popin display behavior: "Block", "Inline" (enum)
**Aggregations:**
- `header` (0..1) - Column header control (e.g., Text)
**Usage:** Define table columns

### sap.m.ColumnListItem
**Purpose:** Table row item
**Verified Properties:**
- `type` - Item type: "Active", "Inactive", "Navigation" (enum)
- `selected` - Selected state (boolean)
**Aggregations:**
- `cells` (0..n) - Array of cell controls (must match column count)
**Events:**
- `press` - Fired when row is pressed
**Usage:** Define table row content

### sap.m.Dialog
**Purpose:** Modal dialog
**Verified Properties:**
- `title` - Dialog title (string)
- `type` - Dialog type: "Standard", "Message", "Confirmation" (enum)
- `state` - Dialog state: "Success", "Warning", "Error", "Information", "None" (enum)
- `resizable` - Resizable dialog (boolean)
- `draggable` - Draggable dialog (boolean)
**Aggregations:**
- `content` (0..n) - Dialog content controls
- `beginButton` (0..1) - Begin button (left)
- `endButton` (0..1) - End button (right)
- `buttons` (0..n) - Array of buttons
**Events:**
- `afterOpen` - Fired after dialog opens
- `afterClose` - Fired after dialog closes
- `confirm` - Fired when confirm button pressed
**Usage:** Modal dialogs for confirmations, forms, messages

### sap.m.SearchField
**Purpose:** Search input field
**Verified Properties:**
- `value` - Search value (string)
- `placeholder` - Placeholder text (string)
- `showSearchButton` - Show search button (boolean)
- `showRefreshButton` - Show refresh button (boolean)
**Events:**
- `search` - Fired when search is triggered
- `liveChange` - Fired while typing
**Usage:** Search/filter input

### sap.m.OverflowToolbar
**Purpose:** Toolbar with overflow for limited space
**Key Properties:**
- `design` - Toolbar design: "Auto", "Info", "Transparent" (enum)
**Aggregations:**
- `content` (0..n) - Toolbar content controls
**Usage:** Toolbar that handles overflow on smaller screens

---

## 6) Layout Controls (sap.ui.layout.form)

### sap.ui.layout.form.SimpleForm
**Purpose:** Responsive form layout container
**Verified Properties:**
- `editable` - Editable mode (boolean)
- `layout` - Layout type: "ResponsiveGridLayout", "ResponsiveGridLayout", "Grid", "GridLayout" (enum)
- `labelSpanXL` - Label width in XL screens (int)
- `labelSpanL` - Label width in L screens (int)
- `labelSpanM` - Label width in M screens (int)
- `adjustLabelSpan` - Auto-adjust label span (boolean)
- `emptySpanXL` - Empty columns after label in XL (int)
- `emptySpanL` - Empty columns after label in L (int)
- `emptySpanM` - Empty columns after label in M (int)
- `columnsXL` - Number of columns in XL (int)
- `columnsL` - Number of columns in L (int)
- `columnsM` - Number of columns in M (int)
- `singleContainerFullSize` - Single container uses full width (boolean)
- `width` - Form width (CSS size string)
**Aggregations:**
- `content` (0..n) - Form content (Label + Input pairs)
**Usage:** Responsive form layout with automatic column adjustment

**ResponsiveGridLayout Settings:**
- `columnsXL="2"` - 2 columns on extra-large screens
- `columnsL="2"` - 2 columns on large screens
- `columnsM="1"` - 1 column on medium screens
- `labelSpanXL="3"` - Label spans 3 grid units on XL
- `emptySpanXL="4"` - 4 empty grid units after label on XL
- `singleContainerFullSize="true"` - Single field uses full width
- `width="100%"` - Form uses full container width

---

## 7) Model and Data Binding

### JSONModel
**Purpose:** Client-side JSON data model
**Usage:**
```javascript
var oModel = new JSONModel({
  field1: "value1",
  field2: "value2"
});
this.getView().setModel(oModel, "modelName");
```

**Data Binding in XML:**
```xml
<Input value="{modelName>/field1}" />
```

**Model Naming:**
- Use descriptive model names (e.g., "cust" for customer, "po" for purchase order)
- Default model (no name) accessed with `{/property}`
- Named model accessed with `{modelName>/property}`

---

## 8) Controller Pattern

**Standard Controller Structure:**
```javascript
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, MessageBox, JSONModel) {
  "use strict";

  return Controller.extend("namespace.controller.ControllerName", {
    onInit: function() {
      // Initialize model
      this.getView().setModel(new JSONModel(initialData()), "modelName");
    },

    onAction: function() {
      // Handle action
    }
  });
});
```

**Common Controller Methods:**
- `onInit()` - Called when controller is initialized
- Event handlers prefixed with "on" (e.g., `onSave`, `onCancel`)

---

## 9) XML View Structure

**Standard View Template:**
```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:core="sap.ui.core"
  xmlns:form="sap.ui.layout.form"
  xmlns="sap.m"
  controllerName="namespace.controller.ControllerName"
  displayBlock="true"
  height="100%">
  <App id="appId">
    <pages>
      <Page title="Page Title" class="sapUiContentPadding">
        <content>
          <!-- Form content -->
        </content>
      </Page>
    </pages>
  </App>
</mvc:View>
```

**Required Namespaces:**
- `xmlns:mvc="sap.ui.core.mvc"` - MVC components
- `xmlns:core="sap.ui.core"` - Core components (Item)
- `xmlns:form="sap.ui.layout.form"` - Form layout
- `xmlns="sap.m"` - Mobile controls (default namespace)

---

## 10) Validation and User Feedback

### MessageBox
**Purpose:** Modal dialog for alerts/confirmations
**Types:**
- `MessageBox.show()` - Information
- `MessageBox.error()` - Error message
- `MessageBox.warning()` - Warning message
- `MessageBox.confirm()` - Confirmation dialog
- `MessageBox.success()` - Success message

**Usage:**
```javascript
MessageBox.error("Error message text");
```

### MessageToast
**Purpose:** Temporary toast notification
**Usage:**
```javascript
MessageToast.show("Notification text");
```

---

## 11) Best Practices

**Form Layout:**
1. Use `SimpleForm` with `ResponsiveGridLayout` for responsive forms
2. Set `singleContainerFullSize="true"` for full-width forms
3. Use `columnsXL="2"`, `columnsL="2"`, `columnsM="1"` for 2-column on desktop, 1-column on mobile
4. Set `labelSpanXL="3"`, `emptySpanXL="4"` for balanced label/input spacing
5. Set `width="100%"` on SimpleForm for full container width

**Control Usage:**
1. Use `Label` + `Input` pairs in SimpleForm content
2. Use `Select` with `core:Item` children for dropdowns
3. Use `Switch` for binary toggles (true/false)
4. Use `MessageStrip` with appropriate `type` for informational messages
5. Use `Toolbar` with `ToolbarSpacer` for action button alignment

**Theme and Density:**
1. Always use `sap_horizon` theme for modern SAP applications
2. Apply `sapUiSizeCompact` class to `<body>` for desktop
3. Apply `sapUiSizeCozy` class for touch devices
4. Use `Device.support.touch` to detect touch capability
5. Specify supported densities in `manifest.json`

**Data Binding:**
1. Use named models for complex data (e.g., "cust", "po")
2. Bind properties using `{modelName>/property}` syntax
3. Initialize models in controller `onInit()` method
4. Use `JSONModel` for client-side data

**Controller:**
1. Use `"use strict"` directive
2. Define dependencies in `sap.ui.define()`
3. Extend `Controller.extend("namespace.controller.Name")`
4. Prefix event handlers with "on"
5. Use `MessageToast` for feedback, `MessageBox` for alerts

**Panel Spacing:**
1. Use `sapUiSmallMarginBottom` class on panels for consistent spacing
2. Apply to MessageStrip for spacing after informational messages
3. Apply to all Panel controls for uniform spacing between sections
4. Default pattern: `class="sapUiSmallMarginBottom"`
5. For collapsible panels, set `expandable="true" expanded="true"`

---

## 12) Common Patterns

### Save/Reset Pattern
```xml
<Toolbar>
  <ToolbarSpacer />
  <Button text="Save" type="Emphasized" press=".onSave" />
  <Button text="Reset" press=".onReset" />
</Toolbar>
```

```javascript
onSave: function() {
  var data = this.getView().getModel("modelName").getData();
  // Validation
  if (!data.requiredField) {
    MessageBox.error("Required field is missing.");
    return;
  }
  // Save logic
  MessageToast.show("Saved successfully");
},

onReset: function() {
  this.getView().getModel("modelName").setData(initialData());
  MessageToast.show("Form reset");
}
```

### Required Field Pattern
```xml
<Label text="Field Name" />
<Input value="{modelName>/field}" required="true" placeholder="Placeholder" />
```

### Dropdown Pattern
```xml
<Label text="Selection" />
<Select selectedKey="{modelName>/selection}">
  <items>
    <core:Item key="key1" text="Option 1" />
    <core:Item key="key2" text="Option 2" />
  </items>
</Select>
```

### MessageStrip Pattern
```xml
<MessageStrip
  text="Informational message"
  type="Information"
  showIcon="true"
/>
```

---

## 13) Repository-Specific Rules

**Before making UI changes:**
1. Read `AGENTS.md` end-to-end
2. Use only controls from SAPUI5 API (https://ui5.sap.com/#/api)
3. Prefer `sap_horizon` + `sapUiSizeCompact` as in existing bootstraps
4. After XML/view changes: run `make build-sap-po` or `make validate-sap-demo`
5. Registry component IDs must exist in `data/registry.json` and match schema
6. Static marketing HTML: no raw hex/px in CSS; use `llm-tokens.css` variables
7. Figma (`data/figma/signals.yaml`) does not override the API
8. Quality gate: `make all` (see `CONTRIBUTING.md`)

**Source of Truth Order:**
1. SAPUI5/OpenUI5 API (https://ui5.sap.com/#/api)
2. Fiori/design pattern docs
3. In-repo view, index.html, Makefile
4. Runtime (DOM, logs, screenshot)
5. Forums as hints only, verified in (1) or (4)

---

## 14) Verified Control Summary

**100% API-Verified Controls:**
- `sap.m.App` - Application container
- `sap.m.Page` - Page container
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
- `sap.m.Text` - Text display
- `sap.m.ObjectStatus` - Status indicator
- `sap.m.Button` - Action button
- `sap.m.Toolbar` - Toolbar container
- `sap.m.ToolbarSpacer` - Toolbar spacer
- `sap.m.OverflowToolbar` - Toolbar with overflow
- `sap.m.SearchField` - Search input
- `sap.m.Panel` - Grouping container
- `sap.m.Table` - Tabular data display
- `sap.m.Column` - Table column
- `sap.m.ColumnListItem` - Table row item
- `sap.m.Dialog` - Modal dialog
- `sap.ui.layout.form.SimpleForm` - Form layout

**All properties, aggregations, and events verified against official SAPUI5 API documentation.**

---

**End of SKILL.md** - Use this skill for creating basic SAPUI5 form applications with verified controls.

Output:
1. UI structure (JSON)
2. SAPUI5 XML View
3. Controller logic (JS)

Expected JSON format:
{
  "ui_tree": { "type": "Page", "props": {...}, "children": [...] },
  "sapui5": { "xml_view": "string", "controller_js": "string" },
  "meta": { "design_system_version": "1.0.0", "model": "claude", "timestamp": "ISO-8601" }
}
