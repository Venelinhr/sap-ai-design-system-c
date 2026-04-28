const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ strict: false });

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/component_spec.schema.json'), 'utf8'));
const registry = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/registry.json'), 'utf8'));

console.log(`Validating ${registry.components.length} components...`);

let validCount = 0;
let errorCount = 0;
const allErrors = [];

registry.components.forEach((component, index) => {
  const validate = ajv.compile(schema);
  const valid = validate(component);
  if (valid) {
    validCount++;
  } else {
    errorCount++;
    allErrors.push({ index: index, id: component.id, errors: validate.errors });
  }
});

console.log('\n=== Validation Results ===');
console.log(`Valid components: ${validCount}`);
console.log(`Invalid components: ${errorCount}`);

if (errorCount > 0) {
  console.log('\n=== Errors ===');
  allErrors.forEach(err => {
    console.log(`\nComponent ${err.index + 1} (${err.id}):`);
    err.errors.forEach(e => console.log('  -', e.message));
  });
}

process.exit(errorCount > 0 ? 1 : 0);
