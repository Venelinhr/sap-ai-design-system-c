const ScoringSystem = require('./scoring');
const JSONSchemaValidator = require('./json-schema-validator');
const ComponentWhitelistValidator = require('./component-whitelist-validator');
const HallucinationDetector = require('./hallucination-detector');
const DesignTokenValidator = require('./design-token-validator');
const fs = require('fs');
const path = require('path');

/**
 * Unified Validation Pipeline
 * Runs all validators in sequence and generates comprehensive report
 */

class ValidationPipeline {
  constructor() {
    this.scoringSystem = new ScoringSystem();
    this.jsonSchemaValidator = new JSONSchemaValidator();
    this.componentWhitelistValidator = new ComponentWhitelistValidator();
    this.hallucinationDetector = new HallucinationDetector();
    this.designTokenValidator = new DesignTokenValidator();
  }

  /**
   * Run full validation on LLM output
   */
  validate(output) {
    const report = {
      timestamp: new Date().toISOString(),
      validation_results: {},
      score: null,
      issues: [],
      status: 'unknown'
    };

    // 1. JSON Schema Validation
    const schemaValidation = this.jsonSchemaValidator.validateOutput(output);
    report.validation_results.json_schema = schemaValidation;
    if (!schemaValidation.valid) {
      report.issues.push(...schemaValidation.errors.map(e => `Schema: ${e.message}`));
    }

    // 2. Component Whitelist Validation
    const componentValidation = this.componentWhitelistValidator.validate(output);
    report.validation_results.component_whitelist = componentValidation;
    if (!componentValidation.valid) {
      report.issues.push(...componentValidation.errors);
    }

    // 3. Hallucination Detection
    const hallucinationDetection = this.hallucinationDetector.detect(output);
    report.validation_results.hallucination = hallucinationDetection;
    if (hallucinationDetection.hasHallucinations) {
      report.issues.push(
        ...hallucinationDetection.hallucinatedComponents.map(c => `Hallucinated component: ${c}`),
        ...hallucinationDetection.hallucinatedProperties.map(p => `Hallucinated property: ${p.component}.${p.property}`)
      );
    }

    // 4. Design Token Validation
    const designTokenValidation = this.designTokenValidator.validate(output);
    report.validation_results.design_tokens = designTokenValidation;
    if (!designTokenValidation.valid) {
      report.issues.push(...designTokenValidation.issues);
    }

    // 5. Scoring
    const score = this.scoringSystem.calculateScore(output, designTokenValidation.score);
    report.score = score;
    const scoringIssues = this.scoringSystem.identifyIssues(output);
    report.issues.push(...scoringIssues);

    // Determine overall status
    if (score.total >= 85 && !hallucinationDetection.hasHallucinations) {
      report.status = 'passed';
    } else if (score.total >= 70) {
      report.status = 'warning';
    } else {
      report.status = 'failed';
    }

    return report;
  }

  /**
   * Validate from JSON file
   */
  validateFile(filePath) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return this.validate(content);
    } catch (error) {
      return {
        timestamp: new Date().toISOString(),
        validation_results: {},
        score: { total: 0, breakdown: {} },
        issues: [`Failed to parse file: ${error.message}`],
        status: 'error'
      };
    }
  }

  /**
   * Generate human-readable report
   */
  generateReport(validationResult) {
    const lines = [];
    
    lines.push('=== LLM-Ready Validation Report ===');
    lines.push(`Timestamp: ${validationResult.timestamp}`);
    lines.push(`Status: ${validationResult.status.toUpperCase()}`);
    lines.push('');
    
    if (validationResult.score) {
      lines.push('=== Score ===');
      lines.push(`Total: ${validationResult.score.total}/100`);
      lines.push('Breakdown:');
      lines.push(`  - Structure Accuracy: ${validationResult.score.breakdown.structure_accuracy}/25`);
      lines.push(`  - Component Validity: ${validationResult.score.breakdown.component_validity}/20`);
      lines.push(`  - Props Accuracy: ${validationResult.score.breakdown.props_accuracy}/15`);
      lines.push(`  - SAPUI5 Compliance: ${validationResult.score.breakdown.sapui5_compliance}/25`);
      lines.push(`  - Consistency: ${validationResult.score.breakdown.consistency}/15`);
      lines.push('');
    }

    lines.push('=== Validation Results ===');
    
    if (validationResult.validation_results.json_schema) {
      const schema = validationResult.validation_results.json_schema;
      lines.push(`JSON Schema: ${schema.valid ? '✓ PASSED' : '✗ FAILED'}`);
      if (!schema.valid && schema.errors) {
        schema.errors.forEach(e => lines.push(`  - ${e.message}`));
      }
    }

    if (validationResult.validation_results.component_whitelist) {
      const whitelist = validationResult.validation_results.component_whitelist;
      lines.push(`Component Whitelist: ${whitelist.valid ? '✓ PASSED' : '✗ FAILED'}`);
      if (whitelist.unknownComponents.length > 0) {
        lines.push(`  - Unknown components: ${whitelist.unknownComponents.join(', ')}`);
      }
    }

    if (validationResult.validation_results.hallucination) {
      const hallucination = validationResult.validation_results.hallucination;
      lines.push(`Hallucination Check: ${!hallucination.hasHallucinations ? '✓ PASSED' : '✗ FAILED'}`);
      if (hallucination.hasHallucinations) {
        lines.push(`  - Hallucinated components: ${hallucination.hallucinatedComponents.length}`);
        lines.push(`  - Hallucinated properties: ${hallucination.hallucinatedProperties.length}`);
      }
    }

    if (validationResult.validation_results.design_tokens) {
      const designTokens = validationResult.validation_results.design_tokens;
      lines.push(`Design Token Check: ${designTokens.valid ? '✓ PASSED' : '✗ FAILED'}`);
      lines.push(`  - Score: ${designTokens.score}/20`);
      if (designTokens.foundTokens) {
        lines.push(`  - Theme classes: ${designTokens.foundTokens.themeClasses.length}`);
        lines.push(`  - Density tokens: ${designTokens.foundTokens.density.length}`);
        lines.push(`  - Spacing tokens: ${designTokens.foundTokens.spacing.length}`);
        lines.push(`  - Semantic classes: ${designTokens.foundTokens.semanticClasses.length}`);
      }
      if (designTokens.issues.length > 0) {
        designTokens.issues.forEach(issue => lines.push(`  - ${issue}`));
      }
    }

    lines.push('');
    lines.push('=== Issues ===');
    if (validationResult.issues.length === 0) {
      lines.push('No issues found.');
    } else {
      validationResult.issues.forEach(issue => lines.push(`- ${issue}`));
    }

    return lines.join('\n');
  }
}

// CLI interface
if (require.main === module) {
  const filePath = process.argv[2];
  const pipeline = new ValidationPipeline();

  if (!filePath) {
    console.error('Usage: node validation/run-validation.js <output-file>');
    process.exit(1);
  }

  const result = pipeline.validateFile(filePath);
  console.log(pipeline.generateReport(result));

  // Save report to JSON
  const reportPath = filePath.replace('.json', '-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);
}

module.exports = ValidationPipeline;
