# Detailed Prompt Example for LLM-Ready SAPUI5 Development

This document provides a comprehensive, detailed prompt example for using the SAPUI5 LLM-Ready design system with AI assistants like Claude, Cursor, or Windsurf.

---

## Example Prompt: Customer Subscription Management Application

```
I want you to build a complete SAP Fiori application using SAPUI5.

## Application Overview
Create a Customer Subscription Management application that allows sales representatives to view, create, and manage customer subscriptions.

## Page Requirements

### 1. Subscription List Page (Main Page)
- **Header**: Title "Customer Subscriptions" with subtitle "Manage all customer subscriptions"
- **Toolbar**: 
  - Search bar (placeholder: "Search by customer name...")
  - Filter button (icon: filter)
  - Add button (text: "New Subscription", type: Emphasized)
- **Table**: Display subscriptions with columns:
  - Customer Name (text)
  - Subscription Type (text)
  - Start Date (date)
  - End Date (date)
  - Status (text with status indicator: Active/Expired)
  - Amount (currency)
  - Actions (button: "View Details")

### 2. Subscription Detail Page
- **Header**: Back button, Title "Subscription Details"
- **Object Header**: 
  - Customer Name (title)
  - Subscription ID (subtitle)
  - Status indicator (Active/Expired)
- **Form**: Display subscription details
  - Customer Name (Input field, read-only)
  - Subscription Type (Select dropdown, options: Basic, Premium, Enterprise)
  - Start Date (DatePicker)
  - End Date (DatePicker)
  - Amount (Input field, currency format)
  - Status (Select dropdown, options: Active, Expired, Cancelled)
  - Notes (TextArea)
- **Footer**: 
  - Edit button (left)
  - Delete button (right, type: Reject)

### 3. Create Subscription Dialog
- **Header**: Title "Create New Subscription"
- **Form**: 
  - Customer Name (Input field, required)
  - Subscription Type (Select dropdown, required, options: Basic, Premium, Enterprise)
  - Start Date (DatePicker, required)
  - End Date (DatePicker, required)
  - Amount (Input field, currency format, required)
  - Notes (TextArea, optional)
- **Footer**: 
  - Cancel button (left)
  - Save button (right, type: Emphasized)

## Component Requirements

Use ONLY components from this design system registry. Do NOT hallucinate or use components not in the registry.

### Required Components:
- sap.m.Page (for all pages)
- sap.m.ObjectHeader (for detail page)
- sap.m.Table (for list view)
- sap.m.Column (for table columns)
- sap.m.ColumnListItem (for table rows)
- sap.m.Text (for text display)
- sap.m.Title (for titles)
- sap.m.Button (for actions)
- sap.m.Input (for input fields)
- sap.m.Select (for dropdowns)
- sap.m.DatePicker (for date selection)
- sap.m.TextArea (for multi-line text)
- sap.m.Toolbar (for page toolbar)
- sap.m.SearchField (for search)
- sap.m.Dialog (for create dialog)
- sap.m.StandardListItem (for list items if needed)
- sap.ui.layout.form.SimpleForm (for form layout)

## Design Requirements

### Theme and Styling:
- Use sap_horizon theme
- Use compact mode (sapUiSizeCompact)
- Apply SAP Horizon design tokens for colors and spacing
- Ensure responsive layout (mobile-friendly)

### Layout:
- Use ObjectPageLayout for detail page if available
- Use ResponsiveGridLayout for forms
- Ensure proper spacing between sections
- Use standard SAP Fiori spacing tokens

## Data Structure

The subscription data should follow this JSON structure:
```json
{
  "subscriptions": [
    {
      "id": "SUB001",
      "customerName": "Acme Corporation",
      "subscriptionType": "Premium",
      "startDate": "2026-01-01",
      "endDate": "2026-12-31",
      "status": "Active",
      "amount": 1200.00,
      "notes": "Annual subscription"
    }
  ]
}
```

## Validation Requirements

1. All required fields must be validated
2. End date must be after start date
3. Amount must be positive number
4. Customer name must not be empty
5. Subscription type must be selected

## Navigation

- From List Page → Detail Page (click "View Details")
- From List Page → Create Dialog (click "New Subscription")
- From Detail Page → List Page (click Back button)
- After Create → Return to List Page

## Additional Requirements

1. Use XML views for all pages
2. Use ComponentContainer for app initialization
3. Implement proper routing if needed
4. Add event handlers for all buttons
5. Use data binding for table and form fields
6. Implement search functionality for the table
7. Add status color coding (green for Active, red for Expired)

## Output Format

Please provide:
1. Complete XML view code for all pages
2. Component controller code (if needed)
3. Main index.html file
4. manifest.json (if routing is used)
5. Any necessary model/data files

Use short names for components where possible (e.g., "Page" instead of "sap.m.Page").
Ensure all components are from the registry and no hallucinations occur.
```

---

## Key Elements of This Prompt

### 1. Clear Application Overview
- Describes the purpose and scope
- Sets expectations for the final result

### 2. Detailed Page Requirements
- Specific component requirements for each page
- Clear structure and layout specifications

### 3. Component Constraints
- Explicitly states to use ONLY components from registry
- Lists required components to guide the LLM
- Prevents hallucinations by specifying valid components

### 4. Design Guidelines
- Theme and styling requirements
- Layout specifications
- Design token usage

### 5. Data Structure
- JSON schema for data
- Clear data model expectations

### 6. Validation Rules
- Business logic requirements
- Input validation specifications

### 7. Navigation Flow
- Clear user journey
- Page transition requirements

### 8. Output Format
- Specifies what files to generate
- Naming conventions
- Technical requirements

---

## Best Practices for Writing Detailed Prompts

1. **Be Specific**: Clearly define what you want
2. **Provide Context**: Explain the application purpose
3. **List Components**: Specify which components to use
4. **Include Examples**: Show data structures and formats
5. **Set Constraints**: Explicitly forbid hallucinations
6. **Request Validation**: Include validation requirements
7. **Define Output**: Specify what files to generate
8. **Use Short Names**: Encourage use of component short names

---

## Testing Your Prompt

After generating the code, validate it using:

```bash
node validation/run-validation.js your-output-file.json
```

This will check:
- JSON structure validity
- Component whitelist compliance
- Design token usage
- Hallucination detection
- Overall LLM-Ready score

Target: ≥85/100 for LLM-Ready certification
