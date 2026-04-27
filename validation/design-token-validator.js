const fs = require('fs');
const path = require('path');

/**
 * Design Token Validator
 * Validates that SAP Horizon theme design tokens are properly applied
 * Ensures visual compliance with SAP Fiori design system
 */

class DesignTokenValidator {
  constructor() {
    this.loadDesignTokenRegistry();
  }

  loadDesignTokenRegistry() {
    // SAP Horizon theme design token registry
    // Based on SAP Fiori Horizon theme design system
    this.colorTokens = [
      'sapNeutralBG',
      'sapNeutralElement',
      'sapNeutralText',
      'sapPrimary',
      'sapPrimaryElement',
      'sapPositive',
      'sapCritical',
      'sapNegative',
      'sapInformative'
    ];

    this.spacingTokens = [
      'sapUiSmallMargin',
      'sapUiMediumMargin',
      'sapUiLargeMargin',
      'sapUiTinyMargin',
      'sapUiSmallMarginBottom',
      'sapUiSmallMarginTop',
      'sapUiSmallMarginLeft',
      'sapUiSmallMarginRight'
    ];

    this.typographyTokens = [
      'sapUiFontFamily',
      'sapUiFontSize',
      'sapUiFontHeader',
      'sapUiFontTitle',
      'sapUiFontLarge'
    ];

    this.densityTokens = [
      'sapUiSizeCompact',
      'sapUiSizeCozy'
    ];

    this.requiredThemeClasses = [
      'sapUiContentPadding',
      'sapUiResponsiveContentPadding'
    ];

    this.semanticClasses = [
      'sapMListBG',
      'sapMBarBG',
      'sapMPageBG',
      'sapMPanelBG',
      'sapMTableBG'
    ];
  }

  validate(output) {
    const issues = [];
    const foundTokens = {
      colors: [],
      spacing: [],
      typography: [],
      density: [],
      themeClasses: [],
      semanticClasses: []
    };

    // Check XML view for design tokens
    if (output.sapui5 && output.sapui5.xml_view) {
      const xml = output.sapui5.xml_view;

      // Check for theme classes
      for (const token of this.requiredThemeClasses) {
        if (xml.includes(token)) {
          foundTokens.themeClasses.push(token);
        }
      }

      // Check for semantic classes
      for (const token of this.semanticClasses) {
        if (xml.includes(token)) {
          foundTokens.semanticClasses.push(token);
        }
      }

      // Check for density tokens
      for (const token of this.densityTokens) {
        if (xml.includes(token)) {
          foundTokens.density.push(token);
        }
      }

      // Check for spacing tokens
      for (const token of this.spacingTokens) {
        if (xml.includes(token)) {
          foundTokens.spacing.push(token);
        }
      }

      // Check for typography tokens
      for (const token of this.typographyTokens) {
        if (xml.includes(token)) {
          foundTokens.typography.push(token);
        }
      }
    }

    // Check controller for design token usage
    if (output.sapui5 && output.sapui5.controller_js) {
      const js = output.sapui5.controller_js;

      for (const token of this.colorTokens) {
        if (js.includes(token)) {
          foundTokens.colors.push(token);
        }
      }
    }

    // Check UI tree for class properties
    const traverse = (node) => {
      if (!node) return;

      if (node.props && node.props.class) {
        const classes = node.props.class;
        if (typeof classes === 'string') {
          for (const token of this.spacingTokens) {
            if (classes.includes(token)) {
              foundTokens.spacing.push(token);
            }
          }
        }
      }

      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    };

    if (output.ui_tree) {
      traverse(output.ui_tree);
    }

    // Generate issues
    if (foundTokens.themeClasses.length === 0) {
      issues.push('Missing required theme classes (e.g., sapUiContentPadding)');
    }

    if (foundTokens.density.length === 0) {
      issues.push('Missing density class (e.g., sapUiSizeCompact or sapUiSizeCozy)');
    }

    if (foundTokens.spacing.length === 0) {
      issues.push('Missing spacing design tokens (e.g., sapUiSmallMargin)');
    }

    const valid = issues.length === 0;

    return {
      valid,
      foundTokens,
      issues,
      score: this.calculateScore(foundTokens, issues)
    };
  }

  calculateScore(foundTokens, issues) {
    let score = 0;
    const maxScore = 20;

    // Score based on token coverage
    if (foundTokens.themeClasses.length > 0) score += 5;
    if (foundTokens.density.length > 0) score += 5;
    if (foundTokens.spacing.length > 0) score += 5;
    if (foundTokens.semanticClasses.length > 0) score += 3;
    if (foundTokens.colors.length > 0) score += 2;

    // Deduct for issues
    score -= issues.length * 2;

    return Math.max(0, Math.min(maxScore, score));
  }

  generateReport(output) {
    const validation = this.validate(output);

    return {
      timestamp: new Date().toISOString(),
      valid: validation.valid,
      score: validation.score,
      foundTokens: validation.foundTokens,
      issues: validation.issues,
      summary: {
        themeClasses: validation.foundTokens.themeClasses.length,
        density: validation.foundTokens.density.length,
        spacing: validation.foundTokens.spacing.length,
        semanticClasses: validation.foundTokens.semanticClasses.length,
        colors: validation.foundTokens.colors.length,
        totalIssues: validation.issues.length
      }
    };
  }
}

module.exports = DesignTokenValidator;
