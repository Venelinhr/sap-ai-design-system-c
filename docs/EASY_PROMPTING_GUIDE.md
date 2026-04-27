# Easy Prompting Guide for SAPUI5 LLM-Ready

## Overview
This guide explains how to use component naming when prompting LLMs to generate SAPUI5 code with the SAPUI5 LLM-Ready framework.

## Component Naming: Short Names OR Full Namespaces

**You can use EITHER short names OR full namespaces.**

The validation system automatically converts short names to full namespaces during validation, so both formats work correctly and are validated identically.

## Short Names (Easier for Prompting)

Use short names for easier, more concise prompting:

| Short Name | Converts To | Description |
|------------|-------------|-------------|
| `Page` | `sap.m.Page` | Page container |
| `Table` | `sap.m.Table` | Tabular data display |
| `Button` | `sap.m.Button` | Action button |
| `Input` | `sap.m.Input` | Text input field |
| `Select` | `sap.m.Select` | Dropdown selection |
| `Panel` | `sap.m.Panel` | Grouping container |
| `Label` | `sap.m.Label` | Form label |
| `Switch` | `sap.m.Switch` | Toggle switch |
| `CheckBox` | `sap.m.CheckBox` | Checkbox control |
| `DatePicker` | `sap.m.DatePicker` | Date picker |
| `TextArea` | `sap.m.TextArea` | Multi-line input |
| `ComboBox` | `sap.m.ComboBox` | Searchable dropdown |
| `Dialog` | `sap.m.Dialog` | Modal dialog |

## Full Namespaces (More Explicit)

Use full namespaces for more explicit component references:

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

## Recommendation

**Use short names for easier prompting.**

Example prompt:
```json
{
  "ui_tree": {
    "type": "Page",
    "props": {
      "title": "Products"
    },
    "children": [
      {
        "type": "Table",
        "props": {
          "columns": ["Name", "Price", "Availability"]
        }
      },
      {
        "type": "Button",
        "props": {
          "text": "Add to Cart",
          "type": "Emphasized"
        }
      }
    ]
  }
}
```

The validation system will automatically convert:
- `Page` → `sap.m.Page`
- `Table` → `sap.m.Table`
- `Button` → `sap.m.Button`

## How It Works

1. **User prompts with short names:** `"type": "Page"`
2. **LLM generates output:** `"type": "Page"` or `"type": "sap.m.Page"`
3. **Validation system:** Converts short names to full namespaces
4. **Result:** Both formats validate correctly

## Benefits

- **Easier prompting:** Short names are quicker to type
- **Less error-prone:** Fewer characters to type reduces typos
- **Same validation:** Both formats validate identically
- **Flexible:** Users can choose the format they prefer

## Example Prompts

### Using Short Names (Recommended)
```
Build a SAPUI5 app with:
- Page with title "Products"
- Table with columns: Name, Price, Availability
- Button with text "Add to Cart"
```

### Using Full Namespaces (Also Valid)
```
Build a SAPUI5 app with:
- sap.m.Page with title "Products"
- sap.m.Table with columns: Name, Price, Availability
- sap.m.Button with text "Add to Cart"
```

Both prompts will generate valid SAPUI5 code that passes validation.

## Conclusion

Use short names for easier prompting. The validation system handles the conversion automatically, ensuring both formats work correctly.
