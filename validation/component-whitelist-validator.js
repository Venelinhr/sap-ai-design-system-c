const fs = require('fs');
const path = require('path');

/**
 * Component Whitelist Validator
 * Validates that all components in LLM output are in the approved registry
 */

class ComponentWhitelistValidator {
  constructor() {
    this.loadComponentRegistry();
  }

  loadComponentRegistry() {
    // Load component registry from SKILL.md
    // For now, we'll use a comprehensive list based on SAPUI5
    this.componentRegistry = new Set([
      'sap.m.App',
      'sap.m.Page',
      'sap.m.Panel',
      'sap.m.Button',
      'sap.m.Input',
      'sap.m.TextArea',
      'sap.m.Select',
      'sap.m.ComboBox',
      'sap.m.Table',
      'sap.m.Column',
      'sap.m.ColumnListItem',
      'sap.m.Text',
      'sap.m.Label',
      'sap.m.CheckBox',
      'sap.m.Switch',
      'sap.m.DatePicker',
      'sap.m.MessageStrip',
      'sap.m.ObjectStatus',
      'sap.m.Toolbar',
      'sap.m.ToolbarSpacer',
      'sap.m.OverflowToolbar',
      'sap.m.SearchField',
      'sap.m.Dialog',
      'sap.m.HBox',
      'sap.m.VBox',
      'sap.ui.layout.form.SimpleForm',
      'sap.ui.layout.HorizontalLayout',
      'sap.ui.layout.VerticalLayout',
      'sap.ui.layout.Grid',
      'sap.ui.core.Control',
      'sap.ui.core.mvc.Controller',
      'sap.ui.core.Item'
    ]);

    // Mapping from short names to full namespaces
    this.shortNameMap = {
      'App': 'sap.m.App',
      'Page': 'sap.m.Page',
      'Panel': 'sap.m.Panel',
      'Button': 'sap.m.Button',
      'Input': 'sap.m.Input',
      'TextArea': 'sap.m.TextArea',
      'Select': 'sap.m.Select',
      'ComboBox': 'sap.m.ComboBox',
      'Table': 'sap.m.Table',
      'Column': 'sap.m.Column',
      'ColumnListItem': 'sap.m.ColumnListItem',
      'Text': 'sap.m.Text',
      'Label': 'sap.m.Label',
      'CheckBox': 'sap.m.CheckBox',
      'Switch': 'sap.m.Switch',
      'DatePicker': 'sap.m.DatePicker',
      'MessageStrip': 'sap.m.MessageStrip',
      'ObjectStatus': 'sap.m.ObjectStatus',
      'Toolbar': 'sap.m.Toolbar',
      'ToolbarSpacer': 'sap.m.ToolbarSpacer',
      'OverflowToolbar': 'sap.m.OverflowToolbar',
      'SearchField': 'sap.m.SearchField',
      'Dialog': 'sap.m.Dialog',
      'Item': 'sap.ui.core.Item'
    };
  }

  validate(output) {
    const unknownComponents = [];
    const validComponents = [];

    const traverse = (node) => {
      if (!node) return;

      const componentKey = node.type || node.component;
      if (componentKey) {
        // Convert short name to full namespace if needed
        const normalizedKey = this.shortNameMap[componentKey] || componentKey;
        
        if (this.componentRegistry.has(normalizedKey)) {
          validComponents.push(normalizedKey);
        } else {
          unknownComponents.push(componentKey);
        }
      }

      // Traverse children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    };

    try {
      if (output.ui_tree) {
        traverse(output.ui_tree);
      }
    } catch (error) {
      return {
        valid: false,
        unknownComponents: [],
        validComponents: [],
        errors: [`Error traversing UI tree: ${error.message}`]
      };
    }

    const valid = unknownComponents.length === 0;
    const errors = unknownComponents.map(comp => `Unknown component: ${comp}`);

    return {
      valid,
      unknownComponents,
      validComponents,
      errors
    };
  }

  /**
   * Get valid alternatives for unknown components
   */
  getAlternatives (unknownComponent) {
    // Simple similarity matching - could be enhanced
    const alternatives = [];
    const parts = unknownComponent.split('.');
    
    for (const component of this.componentRegistry) {
      const compParts = component.split('.');
      
      // Check if any part matches
      if (parts.some(part => compParts.includes(part))) {
        alternatives.push(component);
      }
    }

    return alternatives.slice(0, 5); // Return top 5 alternatives
  }
}

module.exports = ComponentWhitelistValidator;