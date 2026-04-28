const fs = require('fs');
const path = require('path');

/**
 * Registry Validator
 * Validates the SAPUI5 component registry structure
 */

class RegistryValidator {
  constructor() {
    this.requiredFields = [
      'schemaVersion',
      'id',
      'name',
      'source',
      'category',
      'status',
      'description',
      'intentTags',
      'props',
      'events',
      'slots',
      'composition',
      'tokens',
      'a11y',
      'examples',
      'versioning'
    ];
  }

  validate(filePath) {
    const issues = [];
    const warnings = [];
    
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Validate top-level structure
      if (!content.generatedAt) {
        issues.push('Missing required field: generatedAt');
      }
      if (!content.schemaVersion) {
        issues.push('Missing required field: schemaVersion');
      }
      if (!content.components || !Array.isArray(content.components)) {
        issues.push('Missing or invalid components array');
        return { valid: false, issues, warnings, componentCount: 0 };
      }

      // Validate each component
      content.components.forEach((component, index) => {
        const prefix = `Component ${index + 1} (${component.id || 'unknown'})`;
        
        // Check required fields
        this.requiredFields.forEach(field => {
          if (!component[field]) {
            issues.push(`${prefix}: Missing required field: ${field}`);
          }
        });

        // Validate source
        if (component.source) {
          if (!component.source.system) {
            issues.push(`${prefix}: Missing source.system`);
          }
          if (!component.source.ref) {
            issues.push(`${prefix}: Missing source.ref`);
          }
        }

        // Validate arrays
        if (!Array.isArray(component.intentTags)) {
          issues.push(`${prefix}: intentTags must be an array`);
        }
        if (!Array.isArray(component.props)) {
          issues.push(`${prefix}: props must be an array`);
        }
        if (!Array.isArray(component.events)) {
          issues.push(`${prefix}: events must be an array`);
        }
        if (!Array.isArray(component.slots)) {
          issues.push(`${prefix}: slots must be an array`);
        }
        if (!Array.isArray(component.examples)) {
          issues.push(`${prefix}: examples must be an array`);
        }

        // Validate props structure
        if (component.props) {
          component.props.forEach((prop, propIndex) => {
            if (!prop.name) {
              issues.push(`${prefix}: Prop ${propIndex}: Missing name`);
            }
            if (!prop.type) {
              issues.push(`${prefix}: Prop ${propIndex}: Missing type`);
            }
          });
        }

        // Validate events structure
        if (component.events) {
          component.events.forEach((event, eventIndex) => {
            if (!event.name) {
              issues.push(`${prefix}: Event ${eventIndex}: Missing name`);
            }
          });
        }

        // Validate versioning
        if (component.versioning) {
          if (!component.versioning.since) {
            issues.push(`${prefix}: versioning.since is required`);
          }
        }

        // Validate composition
        if (component.composition) {
          if (!Array.isArray(component.composition.allowedWith)) {
            issues.push(`${prefix}: composition.allowedWith must be an array`);
          }
          if (!Array.isArray(component.composition.forbiddenWith)) {
            issues.push(`${prefix}: composition.forbiddenWith must be an array`);
          }
        }

        // Validate a11y
        if (component.a11y) {
          if (typeof component.a11y.role !== 'string') {
            issues.push(`${prefix}: a11y.role must be a string`);
          }
        }
      });

      const valid = issues.length === 0;
      
      return {
        valid,
        issues,
        warnings,
        componentCount: content.components.length
      };

    } catch (error) {
      return {
        valid: false,
        issues: [`Failed to parse JSON: ${error.message}`],
        warnings: [],
        componentCount: 0
      };
    }
  }
}

// Run validation if executed directly
if (require.main === module) {
  const validator = new RegistryValidator();
  const registryPath = process.argv[2] || path.join(__dirname, '../data/registry.json');
  
  console.log('=== Component Registry Validation ===');
  console.log(`File: ${registryPath}`);
  console.log('');
  
  const result = validator.validate(registryPath);
  
  console.log(`Valid: ${result.valid ? '✓ PASSED' : '✗ FAILED'}`);
  console.log(`Component Count: ${result.componentCount}`);
  console.log(`Issues: ${result.issues.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  console.log('');
  
  if (result.issues.length > 0) {
    console.log('=== Issues ===');
    result.issues.forEach(issue => console.log(`  - ${issue}`));
    console.log('');
  }
  
  if (result.warnings.length > 0) {
    console.log('=== Warnings ===');
    result.warnings.forEach(warning => console.log(`  - ${warning}`));
    console.log('');
  }
  
  if (result.valid) {
    console.log('✓ All components are valid and ready to use!');
  } else {
    console.log('✗ Validation failed. Please fix the issues above.');
    process.exit(1);
  }
}

module.exports = RegistryValidator;
