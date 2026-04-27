const ComponentWhitelistValidator = require('./component-whitelist-validator');

/**
 * Hallucination Detector
 * Detects hallucinated components and properties in LLM output
 */

class HallucinationDetector {
  constructor() {
    this.whitelistValidator = new ComponentWhitelistValidator();
    this.loadPropertyRegistry();
  }

  loadPropertyRegistry() {
    // Load property registry from ComponentSpec
    // For now, we'll use a comprehensive list based on SAPUI5
    this.propertyRegistry = {
      'sap.m.Button': ['text', 'type', 'icon', 'enabled', 'visible', 'press', 'width', 'id'],
      'sap.m.Input': ['value', 'placeholder', 'type', 'enabled', 'visible', 'change', 'width', 'required', 'id'],
      'sap.m.Panel': ['headerText', 'expandable', 'expanded', 'visible', 'width', 'backgroundDesign', 'class', 'id'],
      'sap.m.Table': ['columns', 'items', 'growing', 'growingThreshold', 'visible', 'mode', 'backgroundDesign', 'fixedLayout', 'id'],
      'sap.m.Column': ['id', 'header', 'width', 'visible', 'minWidth'],
      'sap.m.ColumnListItem': ['id', 'type', 'visible'],
      'sap.m.Page': ['title', 'showNavButton', 'navButtonPress', 'content', 'showHeader', 'enableScrolling', 'backgroundDesign', 'class', 'id'],
      'sap.m.App': ['pages', 'initialPage', 'id'],
      'sap.m.CheckBox': ['selected', 'enabled', 'visible', 'select', 'id'],
      'sap.m.Switch': ['state', 'enabled', 'visible', 'change', 'id'],
      'sap.m.Select': ['selectedKey', 'items', 'enabled', 'visible', 'change', 'id'],
      'sap.m.SearchField': ['value', 'placeholder', 'showSearchButton', 'showRefreshButton', 'enabled', 'visible', 'id'],
      'sap.m.ObjectStatus': ['text', 'state', 'id', 'visible'],
      'sap.m.Toolbar': ['id', 'visible', 'design'],
      'sap.m.ToolbarSpacer': ['id', 'visible'],
      'sap.m.OverflowToolbar': ['id', 'visible', 'design'],
      'sap.m.Text': ['text', 'id', 'visible', 'textAlign'],
      'sap.ui.layout.form.SimpleForm': ['editable', 'layout', 'width', 'columnsXL', 'columnsL', 'columnsM', 'labelSpanXL', 'labelSpanL', 'labelSpanM', 'singleContainerFullSize', 'adjustLabelSpan', 'emptySpanXL', 'emptySpanL', 'emptySpanM']
    };

    // Mapping from short names to full namespaces
    this.shortNameMap = {
      'App': 'sap.m.App',
      'Page': 'sap.m.Page',
      'Panel': 'sap.m.Panel',
      'Button': 'sap.m.Button',
      'Input': 'sap.m.Input',
      'Select': 'sap.m.Select',
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
      'SearchField': 'sap.m.SearchField'
    };
  }

  /**
   * Detect hallucinations in LLM output
   */
  detect(output) {
    const hallucinatedComponents = [];
    const hallucinatedProperties = [];
    const warnings = [];

    // Detect hallucinated components
    const componentValidation = this.whitelistValidator.validate(output);
    hallucinatedComponents.push(...componentValidation.unknownComponents);

    // Detect hallucinated properties
    const traverse = (node) => {
      if (!node) return;

      const componentKey = node.type || node.component;
      if (componentKey && node.props) {
        // Convert short name to full namespace if needed
        const normalizedKey = this.shortNameMap[componentKey] || componentKey;
        const validProps = this.propertyRegistry[normalizedKey] || [];
        const props = Object.keys(node.props);

        for (const prop of props) {
          if (!validProps.includes(prop)) {
            hallucinatedProperties.push({
              component: componentKey,
              property: prop
            });
          }
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
      warnings.push(`Error traversing UI tree: ${error.message}`);
    }

    const hasHallucinations = hallucinatedComponents.length > 0 || hallucinatedProperties.length > 0;

    return {
      hasHallucinations,
      hallucinatedComponents,
      hallucinatedProperties,
      warnings
    };
  }

  /**
   * Generate hallucination report
   */
  generateReport(output) {
    const detection = this.detect(output);
    
    const report = {
      timestamp: new Date().toISOString(),
      hasHallucinations: detection.hasHallucinations,
      summary: {
        hallucinatedComponents: detection.hallucinatedComponents.length,
        hallucinatedProperties: detection.hallucinatedProperties.length,
        warnings: detection.warnings.length
      },
      details: {
        components: detection.hallucinatedComponents,
        properties: detection.hallucinatedProperties,
        warnings: detection.warnings
      }
    };

    return report;
  }
}

module.exports = HallucinationDetector;