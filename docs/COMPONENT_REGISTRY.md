# SAPUI5 Component Registry

This document lists all SAPUI5 components available in the LLM-Ready design system registry. The registry contains **25 commonly used components** from the `sap.m` namespace and related libraries.

## Component Categories

### Layout Components
- **sap.m.Page** - Full-screen page with title, content, and optional footer
- **sap.m.HBox** - Horizontal layout container
- **sap.m.VBox** - Vertical layout container
- **sap.m.Toolbar** - Toolbar for grouping actions and controls
- **sap.m.Panel** - Grouping container with optional header
- **sap.ui.layout.form.SimpleForm** - Responsive form layout

### Form Components
- **sap.m.Button** - Button control for actions
- **sap.m.Input** - Text input field
- **sap.m.Select** - Dropdown selection control
- **sap.m.DatePicker** - Date selection with calendar popup
- **sap.m.TextArea** - Multi-line text input
- **sap.m.SearchField** - Search input with search button
- **sap.m.Label** - Form field labels for accessibility
- **sap.m.CheckBox** - Boolean selection control

### Display Components
- **sap.m.Text** - Text display control
- **sap.m.Title** - Heading/title control
- **sap.m.ObjectHeader** - Object details header with title, subtitle, and icon

### Data Components
- **sap.m.Table** - Table for displaying data in rows and columns
- **sap.m.Column** - Table column definition
- **sap.m.ColumnListItem** - Table row item
- **sap.m.List** - List for displaying items
- **sap.m.StandardListItem** - List item with title, description, and icon

### Navigation Components
- **sap.m.IconTabBar** - Tabbed navigation with icons

### Feedback Components
- **sap.m.Dialog** - Modal dialog for alerts, confirmations, and forms

## Component Details

Each component in the registry includes:
- **Properties** - All available properties with types and defaults
- **Events** - Event handlers and their parameters
- **Slots/Aggregations** - Allowed child components
- **Composition Rules** - Which components can be used together
- **Design Tokens** - Semantic token mappings
- **Accessibility** - ARIA roles, keyboard interactions, and notes
- **Versioning** - Since version and deprecation info

## Using the Registry

The registry is located at `data/registry.json` and is used by:
- **Component Whitelist Validator** - Validates that generated code only uses registered components
- **Design Token Validator** - Validates design token usage
- **AI Prompts** - Provides component context to AI assistants

## Adding New Components

To add a new component to the registry:

1. Extract component information from [SAPUI5 API Documentation](https://ui5.sap.com/#/api)
2. Add the component specification to `scripts/generate-registry.js`
3. Run `node scripts/generate-registry.js` to regenerate the registry
4. Validate with `node validation/component-whitelist-validator.js data/registry.json`
5. Update this documentation

## Component Schema

All components conform to the schema defined in `schemas/component_spec.schema.json`. This schema ensures:
- Consistent component structure
- Required fields are present
- Type safety for properties and events
- Complete metadata for AI consumption

## Validation

The registry is validated against the schema using:
```bash
node validation/component-whitelist-validator.js data/registry.json
```

All 25 components pass schema validation.
