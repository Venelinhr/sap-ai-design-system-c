# SAPUI5 AI-Assisted Development - Prompting Guide

## Overview

This guide provides practical prompting strategies for AI-assisted SAPUI5 development, based on real-world experience building production-ready applications. It includes what worked, what didn't work, and best practices for achieving reliable, API-compliant results.

---

## Table of Contents

1. [Core Prompting Principles](#core-prompting-principles)
2. [Effective Prompt Patterns](#effective-prompt-patterns)
3. [What Worked](#what-worked)
4. [What Didn't Work](#what-didnt-work)
5. [Prompt Templates](#prompt-templates)
6. [Iteration Strategies](#iteration-strategies)
7. [Validation Techniques](#validation-techniques)
8. [Common Pitfalls](#common-pitfalls)

---

## Core Prompting Principles

### 1. Plan Before Build
Always request planning before implementation:
```
"Build SAP [feature] screen. Plan first, suggest idea, ask questions, then build!"
```

**Why:** Forces structured approach, ensures requirements clarity, prevents premature implementation

### 2. Specify SAP Context
Always mention SAPUI5, Fiori, and specific requirements:
```
"Build SAPUI5 form with sap_horizon theme, sapUiSizeCompact density, following SAP Fiori guidelines"
```

**Why:** Provides context for API selection and design decisions

### 3. Request Visual Blueprint
Ask for Figma diagram before implementation:
```
"Before build, create Figma file diagram of UX!"
```

**Why:** Visual reference guides implementation, reduces rework

### 4. Be Specific About Requirements
Provide detailed, unambiguous requirements:
```
"Support all subscription types (basic, professional, enterprise, custom), billing frequencies (monthly, quarterly, annually, custom), and pricing models (fixed, tiered, usage-based, per-seat)"
```

**Why:** Reduces ambiguity, prevents scope creep

### 5. Define Responsive Behavior
Specify behavior for different screen sizes:
```
"Horizontal layout for desktop, vertical stacking for mobile and tablet"
```

**Why:** Ensures responsive design is implemented correctly

---

## Effective Prompt Patterns

### Pattern 1: Planning-First Approach
```
"Build SAP [feature] screen. Plan first, suggest idea, ask questions, then build!"
```

**Example:**
"Build SAP subscription application screen. Plan first, suggest idea, ask questions, then build!"

**Result:** AI asks clarifying questions, creates structured plan, then implements

---

### Pattern 2: Visual Blueprint First
```
"Before build, create Figma file diagram of UX!"
```

**Example:**
"Before build, create Figma file diagram of UX showing all sections and layout!"

**Result:** AI generates visual blueprint, validates layout before code

---

### Pattern 3: Incremental Enhancement
```
"Add [specific feature] to existing [component]"
```

**Example:**
"Add padding between all panels. Make Billing Information and Payment Method Details collapsible."

**Result:** AI makes focused changes, validates against existing code

---

### Pattern 4: Specific Layout Request
```
"Make [component A] and [component B] in same [layout type] for [device]. Keep current layout for [other devices]"
```

**Example:**
"Make Subscriber Information and Subscription Details in same horizontal block for Desktop. Keep current layout for mobile and tablet."

**Result:** AI implements responsive layout with clear device-specific behavior

---

### Pattern 5: Confirmation Dialog Request
```
"Add confirmation message for [action]"
```

**Example:**
"Add confirmation message for Auto-renew switch toggle"

**Result:** AI adds MessageBox.confirm dialog with proper state handling

---

## What Worked

### 1. Structured Requirements
**Prompt:** "Support all subscription types, billing frequencies, pricing models, and UI options for B2B"
**Result:** AI understood scope and selected appropriate controls

### 2. Technology Specification
**Prompt:** "Use sap_horizon theme, sapUiSizeCompact density, SAP Fiori guidelines"
**Result:** AI configured bootstrap correctly

### 3. Clear Section Breakdown
**Prompt:** "Include sections for subscriber info, subscription details, billing, payment, summary, and history"
**Result:** AI created well-structured view with proper panel grouping

### 4. Responsive Specification
**Prompt:** "Horizontal layout for desktop, vertical for mobile/tablet"
**Result:** AI implemented responsive CSS with media queries

### 5. Incremental Changes
**Prompt:** "Add padding between panels. Make specific panels collapsible"
**Result:** AI made targeted changes without breaking existing functionality

### 6. Bug Fix Requests
**Prompt:** "Fix XML parsing error on line 36"
**Result:** AI identified and fixed ampersand escaping issue

---

## What Didn't Work

### 1. Vague Improvement Requests
**Prompt:** "Make it better"
**Result:** Too ambiguous, AI couldn't determine what to improve

**Fix:** Be specific about what aspect to improve (layout, spacing, functionality, UX)

---

### 2. Missing Context
**Prompt:** "Fix the layout"
**Result:** AI didn't know which layout issue to address

**Fix:** Specify the exact problem (e.g., "panels are too close together, add spacing")

---

### 3. Skipping Planning
**Prompt:** "Build the screen now" (without planning step)
**Result:** Risk of missing requirements, wrong component selection

**Fix:** Always request planning first: "Plan first, then build"

---

### 4. Not Specifying Target Devices
**Prompt:** "Make horizontal layout"
**Result:** AI might not implement responsive behavior

**Fix:** Specify devices: "Horizontal for desktop, vertical for mobile/tablet"

---

### 5. Ignoring SAP Standards
**Prompt:** "Build a form" (without SAPUI5 context)
**Result:** AI might use generic approaches not aligned with SAP standards

**Fix:** Always specify SAPUI5, Fiori, theme, density

---

## Prompt Templates

### Template 1: New SAPUI5 Application
```
Build SAP [application name] screen. Plan first, suggest idea, ask questions, then build!

Requirements:
- Use sap_horizon theme and sapUiSizeCompact density
- Follow SAP Fiori design guidelines
- Support [specific features/requirements]
- Include sections for [list of sections]
- Demo HTML page only (no backend)
- Before build, create Figma file diagram of UX!
```

**Example:**
```
Build SAP subscription management screen. Plan first, suggest idea, ask questions, then build!

Requirements:
- Use sap_horizon theme and sapUiSizeCompact density
- Follow SAP Fiori design guidelines
- Support all subscription types (basic, professional, enterprise, custom)
- Support all billing frequencies (monthly, quarterly, annually, custom)
- Support all pricing models (fixed, tiered, usage-based, per-seat)
- Include sections for subscriber info, subscription details, plan comparison, billing, payment, summary, and history
- Demo HTML page only (no backend)
- Before build, create Figma file diagram of UX!
```

---

### Template 2: UI Enhancement
```
Add [specific enhancement] to existing [component].

Requirements:
- [specific requirement 1]
- [specific requirement 2]
- Keep existing functionality intact
- Maintain SAP Fiori compliance
```

**Example:**
```
Add padding between all panels in the subscription view. Make Billing Information and Payment Method Details panels collapsible.

Requirements:
- Use sapUiSmallMarginBottom class for spacing
- Set expandable="true" for collapsible panels
- Keep existing functionality intact
- Maintain SAP Fiori compliance
```

---

### Template 3: Layout Change
```
Make [component A] and [component B] in same [layout type] for [device]. Keep current layout for [other devices].

Requirements:
- [specific layout requirement 1]
- [specific layout requirement 2]
- Add responsive CSS for breakpoint at [breakpoint]
- Test on mobile, tablet, and desktop
```

**Example:**
```
Make Subscriber Information and Subscription Details in same horizontal block for Desktop. Keep current layout for mobile and tablet.

Requirements:
- Use HBox with VBox containers
- Set width to auto with flex distribution
- Add responsive CSS for breakpoint at 1025px
- Test on mobile, tablet, and desktop
```

---

### Template 4: Feature Addition
```
Add [feature] to [component] with confirmation dialog.

Requirements:
- Show confirmation dialog when [action] is triggered
- Dialog message: "[confirmation message]"
- If confirmed: update model and show toast
- If cancelled: revert state and show cancellation message
- Use MessageBox.confirm
```

**Example:**
```
Add confirmation dialog for Auto-renew switch toggle.

Requirements:
- Show confirmation dialog when Auto-renew is toggled
- Dialog message: "Enable/Disable auto-renewal for this subscription?"
- If confirmed: update model and show toast "Auto-renew: Enabled/Disabled"
- If cancelled: revert switch state and show toast "Auto-renew change cancelled"
- Use MessageBox.confirm
```

---

### Template 5: Bug Fix
```
Fix [specific error] in [file] at [location].

Error: [error message]
Context: [what was happening when error occurred]
```

**Example:**
```
Fix XML parsing error in Subscription.view.xml at line 36.

Error: xmlParseEntityRef: no name
Context: Ampersand character in headerText attribute causing XML parser to fail
```

---

## Iteration Strategies

### Strategy 1: Start Simple, Add Complexity
**Approach:** Begin with basic functionality, then enhance incrementally

**Example:**
1. Build basic form with required fields
2. Add validation
3. Add dynamic calculations
4. Add advanced features (toggle, responsive layout)
5. Add confirmation dialogs

**Benefits:** Each iteration is easier to validate, issues caught early

---

### Strategy 2: Validate Each Change
**Approach:** After each change, verify it works before proceeding

**Example:**
1. Add padding → test → confirm working
2. Make collapsible → test → confirm working
3. Add toggle → test → confirm working

**Benefits:** Issues isolated and resolved immediately

---

### Strategy 3: Use Visual Feedback
**Approach:** Request screenshots or visual descriptions to verify changes

**Example:**
"Show me how the horizontal layout looks on desktop vs mobile"

**Benefits:** Visual confirmation ensures requirements are met

---

### Strategy 4: Document Decisions
**Approach:** Ask AI to document why it chose specific approaches

**Example:**
"Explain why you chose HBox over Grid for this layout"

**Benefits:** Understanding design decisions helps future maintenance

---

## Validation Techniques

### 1. API Compliance Check
**Prompt:** "Verify all controls used are in SAPUI5 API documentation"

**What to Check:**
- Control names match SAPUI5 SDK
- Properties are valid for each control
- Events are properly named
- No deprecated APIs used

---

### 2. Fiori Compliance Check
**Prompt:** "Verify the design follows SAP Fiori guidelines"

**What to Check:**
- Color usage follows Fiori palette
- Typography follows Fiori standards
- Layout follows Fiori patterns
- Accessibility (ARIA, keyboard navigation)

---

### 3. Component Compatibility
**Prompt:** "Verify all components can be used together without conflicts"

**What to Check:**
- No conflicting properties
- Proper parent-child relationships
- Compatible aggregations
- No lifecycle conflicts

---

### 4. Responsive Validation
**Prompt:** "Test the layout on mobile, tablet, and desktop breakpoints"

**What to Check:**
- Mobile (<1025px): Vertical stacking works
- Tablet (1025px-1440px): Appropriate layout
- Desktop (>1440px): Horizontal layout works
- No horizontal scroll on mobile
- Touch targets appropriate size

---

### 5. Code Quality Check
**Prompt:** "Review the code for best practices and potential issues"

**What to Check:**
- Proper indentation and formatting
- No duplicate code
- Efficient data binding
- Proper error handling
- Clear naming conventions

---

## Common Pitfalls

### Pitfall 1: Skipping API Verification
**Problem:** AI uses non-existent or deprecated APIs
**Solution:** Always request API verification: "Verify all controls against SAPUI5 SDK"

---

### Pitfall 2: Ignoring Responsive Design
**Problem:** Layout breaks on mobile devices
**Solution:** Always specify responsive behavior: "Horizontal for desktop, vertical for mobile/tablet"

---

### Pitfall 3: XML Special Characters
**Problem:** Unescaped characters cause parsing errors
**Solution:** Remember to escape: & → &amp;, < → &lt;, > → &gt;, " → &quot;, ' → &apos;

---

### Pitfall 4: Missing Context
**Problem:** AI doesn't have enough information to make good decisions
**Solution:** Always provide: theme, density, target devices, specific requirements

---

### Pitfall 5: Too Much at Once
**Problem:** Complex requests lead to errors and incomplete implementations
**Solution:** Break down into smaller, focused requests

---

### Pitfall 6: Not Testing
**Problem:** Code looks correct but has runtime errors
**Solution:** Always test in browser after each major change

---

### Pitfall 7: Ignoring Error Messages
**Problem:** Error messages provide clues but are ignored
**Solution:** Pay attention to error details, they often point to the exact issue

---

## Best Practices Summary

### DO:
- ✅ Plan before building
- ✅ Specify SAPUI5, Fiori, theme, density
- ✅ Request Figma diagram before implementation
- ✅ Be specific about requirements
- ✅ Define responsive behavior
- ✅ Make incremental changes
- ✅ Validate each step
- ✅ Test on multiple devices
- ✅ Fix bugs immediately
- ✅ Document decisions

### DON'T:
- ❌ Be vague ("make it better")
- ❌ Skip planning
- ❌ Ignore SAP standards
- ❌ Make complex requests in one go
- ❌ Skip validation
- ❌ Ignore error messages
- ❌ Forget responsive design
- ❌ Assume without testing

---

## Conclusion

Effective prompting for SAPUI5 AI-assisted development requires:
1. Clear, specific requirements
2. SAP context (theme, density, Fiori)
3. Visual blueprints
4. Incremental approach
5. Continuous validation
6. Responsive design consideration

Following these patterns consistently leads to production-quality, API-compliant SAPUI5 applications with minimal rework.

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Based On:** SAP Subscription Management Demo Project  
