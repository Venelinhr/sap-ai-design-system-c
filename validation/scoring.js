const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

/**
 * Scoring System for LLM-Ready Validation
 * 
 * Scores LLM outputs on a 0-100 scale based on:
 * - Structure Accuracy (0-25)
 * - Component Validity (0-20)
 * - Props Accuracy (0-15)
 * - SAPUI5 Compliance (0-25)
 * - Consistency (0-15)
 */

class ScoringSystem {
  constructor() {
    this.ajv = new Ajv();
    this.loadSchemas();
    this.loadComponentRegistry();
  }

  loadSchemas() {
    this.expectedOutputSchema = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../schemas/expected-output-schema.json'))
    );
    this.componentSpecSchema = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../schemas/componentspec-schema.json'))
    );
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
      'sap.m.Select',
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
      'sap.m.HBox',
      'sap.m.VBox',
      'sap.ui.layout.form.SimpleForm',
      'sap.ui.layout.HorizontalLayout',
      'sap.ui.layout.VerticalLayout',
      'sap.ui.layout.Grid',
      'sap.ui.core.Control',
      'sap.ui.core.mvc.Controller'
    ]);

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
   * Calculate total score (0-100)
   */
  calculateScore(output, designTokenScore = 0) {
    const structureScore = this.scoreStructureAccuracy(output);
    const componentScore = this.scoreComponentValidity(output);
    const propsScore = this.scorePropsAccuracy(output);
    const sapui5Score = this.scoreSAPUI5Compliance(output);
    const consistencyScore = this.scoreConsistency(output);

    // Design token score is added to SAPUI5 compliance
    const adjustedSapui5Score = Math.min(25, sapui5Score + (designTokenScore / 20 * 25));

    const totalScore = structureScore + componentScore + propsScore + adjustedSapui5Score + consistencyScore;

    return {
      total: Math.min(100, Math.max(0, totalScore)),
      breakdown: {
        structure_accuracy: structureScore,
        component_validity: componentScore,
        props_accuracy: propsScore,
        sapui5_compliance: adjustedSapui5Score,
        consistency: consistencyScore,
        design_token_score: designTokenScore
      }
    };
  }

  /**
   * Score Structure Accuracy (0-25)
   * Validates that the UI tree structure is correct
   */
  scoreStructureAccuracy(output) {
    let score = 0;
    const maxScore = 25;

    try {
      // Validate JSON structure
      if (!output.ui_tree || typeof output.ui_tree !== 'object') {
        return 0;
      }
      score += 5;

      // Check for required fields
      if (output.ui_tree.type) score += 5;
      if (output.ui_tree.props) score += 5;
      if (Array.isArray(output.ui_tree.children)) score += 5;

      // Check for sapui5 section
      if (output.sapui5 && typeof output.sapui5 === 'object') score += 3;
      if (output.sapui5.xml_view) score += 1;
      if (output.sapui5.controller_js) score += 1;

    } catch (error) {
      return 0;
    }

    return Math.min(maxScore, score);
  }

  /**
   * Score Component Validity (0-20)
   * Validates that all components are in the registry
   */
  scoreComponentValidity(output) {
    let score = 0;
    const maxScore = 20;
    let totalComponents = 0;
    let validComponents = 0;

    const traverse = (node) => {
      if (!node) return;
      
      totalComponents++;
      
      // Check if component is in registry
      const componentKey = node.type || node.component;
      // Convert short name to full namespace if needed
      const normalizedKey = this.shortNameMap[componentKey] || componentKey;
      if (componentKey && this.componentRegistry.has(normalizedKey)) {
        validComponents++;
      }

      // Traverse children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    };

    try {
      traverse(output.ui_tree);

      if (totalComponents === 0) return 0;

      // Calculate percentage of valid components
      const percentage = (validComponents / totalComponents) * 100;
      score = (percentage / 100) * maxScore;

    } catch (error) {
      return 0;
    }

    return Math.min(maxScore, score);
  }

  /**
   * Score Props Accuracy (0-15)
   * Validates that properties are correctly defined
   */
  scorePropsAccuracy(output) {
    let score = 0;
    const maxScore = 15;

    try {
      const traverse = (node) => {
        if (!node || !node.props) return;

        // Check props object structure
        if (typeof node.props === 'object') {
          score += 2;
        }

        // Traverse children
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(traverse);
        }
      };

      traverse(output.ui_tree);

      // Cap at max score
      score = Math.min(maxScore, score);

    } catch (error) {
      return 0;
    }

    return score;
  }

  /**
   * Score SAPUI5 Compliance (0-25)
   * Validates XML syntax and SAPUI5-specific requirements
   */
  scoreSAPUI5Compliance(output) {
    let score = 0;
    const maxScore = 25;

    try {
      if (!output.sapui5) return 0;

      // Check XML view exists
      if (output.sapui5.xml_view && typeof output.sapui5.xml_view === 'string') {
        score += 10;
        
        // Check for required XML tags
        const xml = output.sapui5.xml_view;
        if (xml.includes('<mvc:View')) score += 3;
        if (xml.includes('<App') || xml.includes('<Page')) score += 3;
        if (xml.includes('</mvc:View>')) score += 2;
        if (xml.includes('</App>') || xml.includes('</Page>')) score += 2;
      }

      // Check controller exists
      if (output.sapui5.controller_js && typeof output.sapui5.controller_js === 'string') {
        score += 5;
      }

    } catch (error) {
      return 0;
    }

    return Math.min(maxScore, score);
  }

  /**
   * Score Consistency (0-15)
   * Measures output consistency (placeholder for multi-run testing)
   */
  scoreConsistency(output) {
    // For now, return full score if output is well-formed
    // In a full implementation, this would compare multiple runs
    let score = 0;
    const maxScore = 15;

    try {
      if (output.meta && output.meta.model) score += 5;
      if (output.meta && output.meta.design_system_version) score += 5;
      if (output.meta && output.meta.timestamp) score += 5;
    } catch (error) {
      return 0;
    }

    return Math.min(maxScore, score);
  }

  /**
   * Identify issues in the output
   */
  identifyIssues(output) {
    const issues = [];

    // Check for unknown components
    const traverse = (node) => {
      if (!node) return;

      const componentKey = node.type || node.component;
      // Convert short name to full namespace if needed
      const normalizedKey = this.shortNameMap[componentKey] || componentKey;
      if (componentKey && !this.componentRegistry.has(normalizedKey)) {
        issues.push(`Unknown component: ${componentKey}`);
      }

      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    };

    try {
      traverse(output.ui_tree);

      // Check for missing required fields
      if (!output.ui_tree) issues.push('Missing ui_tree');
      if (!output.ui_tree.type) issues.push('Missing component type');
      if (!output.sapui5) issues.push('Missing sapui5 section');
      if (!output.sapui5.xml_view) issues.push('Missing XML view');
      if (!output.sapui5.controller_js) issues.push('Missing controller');

    } catch (error) {
      issues.push(`Error parsing output: ${error.message}`);
    }

    return issues;
  }
}

module.exports = ScoringSystem;