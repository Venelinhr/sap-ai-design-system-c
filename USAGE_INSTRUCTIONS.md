# LLM-Ready SAPUI5 Design System - Usage Instructions

This document provides comprehensive instructions for using the LLM-ready SAPUI5 design system with various AI assistants and IDE integrations.

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Venelinhr/SAP-LLM-ready-design-system.git
cd SAP-LLM-ready-design-system
```

2. **Open in your IDE** (VS Code, Cursor, Windsurf, etc.)

3. **Start building SAP applications** using the verified component registry (41 controls)

---

## Claude (Anthropic)

### Using with Claude Desktop or Web Interface

**Method 1: Project Context**
1. Open the project in Claude Desktop
2. Claude will automatically read the `.windsurf/rules/sapui5-fiori.md` file
3. The design system rules are automatically applied

**Method 2: Direct Prompting**
```
I'm building a SAPUI5 application. Use the LLM-ready design system from this repository. 
I need to create a form with [specific requirements].

Please:
1. Read the SKILL.md file at .cursor/skills/sapui5-basic-form-demo/SKILL.md
2. Use only the 41 verified controls listed
3. Follow SAP Fiori guidelines (sap_horizon theme, sapUiSizeCompact density)
4. Generate valid SAPUI5 XML View and Controller code
```

**Method 3: Reference the Rules**
```
Use the SAPUI5 LLM-ready design system rules from .windsurf/rules/sapui5-fiori.md.
Build a SAP application with [specific requirements].
Use only verified controls from the registry (41 controls).
```

### Best Practices for Claude

1. **Always reference the SKILL.md file** - Claude will read it automatically if you mention it
2. **Use short component names** - "Page", "Table", "Button" instead of full namespaces
3. **Specify the architecture** - Claude will follow the multi-step agent architecture (Planner → Validator → Builder)
4. **Request validation** - Ask Claude to validate against SAPUI5 API

### Example Prompts

```
Create a customer information form using the LLM-ready SAPUI5 design system.
Include fields for: Name, Email, Phone, Address, Country.
Use SimpleForm with ResponsiveGridLayout layout.
Add Save and Cancel buttons.
```

```
Build a purchase order entry page with:
- Header section with PO number and date
- Line items table (Product, Quantity, Price)
- Action toolbar with Add/Delete buttons
- Save and Submit functionality
```

---

## Cursor AI

### Using with Cursor IDE

**Step 1: Enable Rules**
- Cursor automatically reads `.cursor/rules/sapui5-llm-ready.md`
- The 41-component registry is automatically available

**Step 2: Use Skills**
- Cursor automatically loads `.cursor/skills/sapui5-basic-form-demo/SKILL.md`
- The skill is triggered when you mention SAPUI5, SAP Fiori, or related keywords

**Step 3: Prompt in Chat**
```
@workspace Create a SAPUI5 form for employee onboarding
Use the LLM-ready design system rules
Include: Employee ID, Name, Department, Start Date, Manager
```

**Step 4: Use Composer**
- Press `Cmd+I` (Mac) or `Ctrl+I` (Windows) to open Composer
- Type your SAPUI5 requirements
- Cursor will use the design system rules automatically

### Best Practices for Cursor

1. **Use @workspace reference** - Ensures Cursor reads the design system files
2. **Mention "LLM-ready design system"** - Triggers the skill automatically
3. **Use short component names** - Cursor will map them to full namespaces
4. **Request validation** - Cursor will validate against the registry

### Example Prompts

```
@workspace Build a SAPUI5 leave request form
Use the LLM-ready design system
Fields: Employee Name, Leave Type, Start Date, End Date, Reason
Add Submit and Cancel buttons
```

```
@workspace Create a product catalog page
Use the LLM-ready design system
Display products in a Table with: Product Name, Price, Stock, Status
Add Search and Filter functionality
```

---

## Windsurf

### Using with Windsurf IDE

**Step 1: Enable Rules**
- Windsurf automatically reads `.windsurf/rules/sapui5-fiori.md`
- The comprehensive LLM guidance is automatically applied

**Step 2: Use Chat**
- Open the Windsurf chat panel
- The design system rules are automatically active

**Step 3: Prompt in Chat**
```
Build a SAPUI5 application using the LLM-ready design system
Create a form with [specific requirements]
Use only verified controls from the registry
```

### Best Practices for Windsurf

1. **The rules are automatically active** - No need to reference them explicitly
2. **Use short component names** - Windsurf will map them to full namespaces
3. **Follow the multi-step architecture** - Windsurf will use Planner → Validator → Builder
4. **Request validation** - Windsurf will validate against SAPUI5 API

### Example Prompts

```
Create a SAPUI5 user profile page
Use the LLM-ready design system
Display: Name, Email, Phone, Address, Profile Picture
Add Edit and Save functionality
```

```
Build a SAPUI5 dashboard with:
- Summary cards (Total Sales, Orders, Customers)
- Recent orders table
- Action toolbar with Refresh button
```

---

## VS Code with AI Extensions

### Using with GitHub Copilot

**Step 1: Install Copilot**
- Install GitHub Copilot extension in VS Code
- Sign in with your GitHub account

**Step 2: Reference the Design System**
- Open the `.cursor/skills/sapui5-basic-form-demo/SKILL.md` file
- Keep it open while working
- Reference it in your prompts

**Step 3: Use Copilot Chat**
```
Using the SAPUI5 LLM-ready design system from SKILL.md, 
create a form with [specific requirements]
Use only the 41 verified controls listed
```

**Step 4: Use Copilot Inline**
- Type a comment in your code file
- Reference the design system
- Copilot will generate code based on the rules

### Using with Continue.dev

**Step 1: Install Continue.dev**
- Install Continue.dev extension in VS Code

**Step 2: Configure Context**
- Add the design system files to Continue.dev context
- Use `/add` command to include SKILL.md

**Step 3: Prompt in Chat**
```
/build Create a SAPUI5 form using the LLM-ready design system
Reference the SKILL.md file for verified controls
```

### Best Practices for VS Code AI Extensions

1. **Keep SKILL.md open** - Reference it in your prompts
2. **Use short component names** - The AI will map them to full namespaces
3. **Request validation** - Ask the AI to validate against SAPUI5 API
4. **Review generated code** - Always review for accuracy

---

## ChatGPT (OpenAI)

### Using with ChatGPT Web Interface

**Step 1: Provide Context**
- Copy the contents of `.cursor/skills/sapui5-basic-form-demo/SKILL.md`
- Paste it into the ChatGPT conversation

**Step 2: Provide Rules**
- Copy the contents of `.windsurf/rules/sapui5-fiori.md`
- Paste it into the ChatGPT conversation

**Step 3: Prompt**
```
Using the SAPUI5 LLM-ready design system I just provided, 
create a SAPUI5 application with [specific requirements]
Use only the 41 verified controls listed
Follow SAP Fiori guidelines
```

### Using with ChatGPT API

**Step 1: Create a System Prompt**
```
You are a SAPUI5 expert using the LLM-ready design system.
Use only the 41 verified controls listed in the design system.
Follow SAP Fiori guidelines (sap_horizon theme, sapUiSizeCompact density).
Use the multi-step agent architecture (Planner → Validator → Builder).
Validate all code against SAPUI5 API documentation.
```

**Step 2: Provide Component Registry**
- Include the 41-component registry in the system prompt or context

**Step 3: Prompt**
```
Create a SAPUI5 application with [specific requirements]
Use only verified controls from the LLM-ready design system
```

### Best Practices for ChatGPT

1. **Provide full context** - Include SKILL.md and rules files
2. **Use short component names** - ChatGPT will map them to full namespaces
3. **Request validation** - Ask ChatGPT to validate against SAPUI5 API
4. **Iterate as needed** - Refine the generated code through multiple prompts

---

## General Best Practices

### For All AI Tools

1. **Always Use Verified Controls**
   - Only use the 41 controls listed in the registry
   - Never use controls not in the SKILL.md file
   - This ensures zero hallucinations

2. **Use Short Component Names**
   - "Page" instead of "sap.m.Page"
   - "Table" instead of "sap.m.Table"
   - "Button" instead of "sap.m.Button"
   - The AI will automatically map to full namespaces

3. **Follow SAP Fiori Guidelines**
   - Use `sap_horizon` theme
   - Use `sapUiSizeCompact` density for desktop
   - Use `sapUiSizeCozy` density for touch devices
   - Follow Clarity, Consistency, Responsiveness, Accessibility

4. **Request Validation**
   - Ask the AI to validate against SAPUI5 API
   - Check for deprecated APIs
   - Ensure composability of components

5. **Use the Multi-Step Architecture**
   - Planner → Validator → Builder
   - This ensures high-quality output
   - Reduces errors and hallucinations

### Common Prompt Patterns

**Pattern 1: Simple Form**
```
Create a SAPUI5 form using the LLM-ready design system
Fields: [list of fields]
Layout: SimpleForm with ResponsiveGridLayout
Actions: [Save, Cancel, etc.]
```

**Pattern 2: Table with Actions**
```
Build a SAPUI5 page with a Table using the LLM-ready design system
Columns: [list of columns]
Actions: [Add, Delete, Edit, etc.]
Toolbar: [list of toolbar actions]
```

**Pattern 3: Master-Detail**
```
Create a SAPUI5 master-detail application using the LLM-ready design system
Master: [list of items]
Detail: [detail fields]
Navigation: [navigation pattern]
```

**Pattern 4: Complex Form**
```
Build a SAPUI5 complex form using the LLM-ready design system
Sections: [list of sections]
Fields per section: [list of fields]
Validation: [validation rules]
Actions: [list of actions]
```

### Validation Checklist

After generating code, verify:

- [ ] All controls are in the 41-component registry
- [ ] All properties are verified in SKILL.md
- [ ] Theme is `sap_horizon`
- [ ] Density is `sapUiSizeCompact` or `sapUiSizeCozy`
- [ ] Namespaces are correct (unified, tnt if used)
- [ ] Bootstrap configuration is correct
- [ ] Code compiles without errors
- [ ] Follows SAP Fiori guidelines

---

## Troubleshooting

### Issue: AI Hallucinates Components

**Solution:**
- Explicitly reference the SKILL.md file
- List the 41 verified controls in your prompt
- Use short names and let the AI map them
- Request validation against SAPUI5 API

### Issue: Wrong Namespace Used

**Solution:**
- Check if FileUploader or InfoLabel are used
- Ensure `xmlns:unified="sap.ui.unified"` is declared
- Ensure `xmlns:tnt="sap.tnt"` is declared
- Use `unified:FileUploader` and `tnt:InfoLabel` prefixes

### Issue: Code Doesn't Compile

**Solution:**
- Verify all controls are in the registry
- Check all properties against SKILL.md
- Ensure bootstrap configuration is correct
- Validate against SAPUI5 API documentation

### Issue: Layout Issues

**Solution:**
- Use SimpleForm with ResponsiveGridLayout
- Set `width="100%"` on forms
- Use proper margin classes (sapUiSmallMarginBottom)
- Check responsive settings (columnsXL, columnsL, columnsM)

---

## Additional Resources

- **SKILL.md**: `.cursor/skills/sapui5-basic-form-demo/SKILL.md`
- **Windsurf Rules**: `.windsurf/rules/sapui5-fiori.md`
- **Cursor Rules**: `.cursor/rules/sapui5-llm-ready.md`
- **SAPUI5 API**: https://ui5.sap.com/#/api
- **SAP Fiori Guidelines**: https://experience.sap.com/fiori-design/

---

## Support

For issues or questions:
1. Check the SKILL.md file for component documentation
2. Verify against SAPUI5 API documentation
3. Review the component registry (41 controls)
4. Check the troubleshooting section above

---

**Last Updated:** April 28, 2026
**Version:** 1.0
**Component Count:** 41 verified controls
