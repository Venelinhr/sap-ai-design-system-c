const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

/**
 * JSON Schema Validator
 * Validates LLM outputs against expected schemas
 */

class JSONSchemaValidator {
  constructor() {
    this.ajv = new Ajv();
    this.loadSchemas();
  }

  loadSchemas() {
    this.expectedOutputSchema = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../schemas/expected-output-schema.json'))
    );
    this.componentSpecSchema = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../schemas/componentspec-schema.json'))
    );
  }

  /**
   * Validate output against expected schema
   */
  validateOutput(output) {
    const validate = this.ajv.compile(this.expectedOutputSchema);
    const valid = validate(output);

    return {
      valid,
      errors: validate.errors || []
    };
  }

  /**
   * Validate ComponentSpec against schema
   */
  validateComponentSpec(componentSpec) {
    const validate = this.ajv.compile(this.componentSpecSchema);
    const valid = validate(componentSpec);

    return {
      valid,
      errors: validate.errors || []
    };
  }

  /**
   * Validate JSON file
   */
  validateFile(filePath) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return this.validateOutput(content);
    } catch (error) {
      return {
        valid: false,
        errors: [{ message: `Failed to parse JSON: ${error.message}` }]
      };
    }
  }
}

module.exports = JSONSchemaValidator;
