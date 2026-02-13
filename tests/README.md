# Araseo-example Test Suite

Comprehensive test suite for validating the Araseo example data pipeline: markdown planning documents → JSON fixtures → renderer consumption.

## Overview

This test suite validates:
1. **JSON Schema Compliance**: All fixtures conform to flowchart/UI schemas
2. **Node Reference Integrity**: All edges reference valid nodes
3. **Integration Validity**: Planning documents have corresponding valid JSON outputs
4. **Edge Cases**: Handles special characters, empty structures, large graphs
5. **Pipeline Completeness**: End-to-end validation from markdown → JSON → renderer

## Directory Structure

```
tests/
├── README.md                          # This file
├── schema/                            # JSON schemas
│   ├── flowchart-schema.json          # Flowchart schema definition
│   └── ui-schema.json                 # UI mockup schema definition
├── helpers/                           # Test utilities
│   ├── schema-validator.js            # Schema validation functions
│   └── fixture-loader.js              # Fixture loading utilities
├── unit/                              # Unit tests
│   ├── schema-validation.test.js      # Schema validation tests
│   └── edge-cases.test.js             # Edge case and error handling tests
└── integration/                       # Integration tests
    └── planning-docs.test.js          # Planning doc to fixture integration tests
```

## Prerequisites

Install dependencies:

```bash
npm install
```

This installs:
- **vitest**: Fast unit test framework
- **@vitest/ui**: Visual test UI
- **@vitest/coverage-v8**: Code coverage reporting
- **ajv**: JSON schema validation library

## Running Tests

### Run All Tests

```bash
npm test
```

### Watch Mode (Continuous Testing)

```bash
npm run test:watch
```

Tests re-run automatically when files change.

### Visual Test UI

```bash
npm run test:ui
```

Opens browser-based test interface at http://localhost:51204/__vitest__/

### Coverage Report

```bash
npm run test:coverage
```

Generates coverage report in `coverage/` directory.

## Test Categories

### 1. Schema Validation Tests

**File**: `tests/unit/schema-validation.test.js`

**Purpose**: Validate all JSON fixtures conform to schema definitions

**Tests**:
- ✅ All flowchart fixtures validate against flowchart schema
- ✅ All UI fixtures validate against UI schema
- ✅ Required fields are present
- ✅ Field types are correct (boolean, string, array, object)
- ✅ Enum values are valid (shapes, colors, component types)
- ✅ Node references in edges exist in nodes collection
- ✅ Cycle detection (intentional retry patterns allowed)

**Run**:
```bash
npx vitest run tests/unit/schema-validation.test.js
```

### 2. Edge Case Tests

**File**: `tests/unit/edge-cases.test.js`

**Purpose**: Ensure robustness with special inputs and boundary conditions

**Tests**:
- ✅ Empty structures (no nodes, no edges, no components)
- ✅ Korean text, emoji, special characters in labels
- ✅ Complex node ID patterns (underscores, dashes, numbers)
- ✅ Large structures (100+ nodes)
- ✅ Deeply nested metadata and components
- ✅ Bidirectional edges and cycles
- ✅ Self-referencing nodes
- ✅ Disconnected graph components
- ✅ Error handling (null, undefined, malformed data)

**Run**:
```bash
npx vitest run tests/unit/edge-cases.test.js
```

### 3. Integration Tests

**File**: `tests/integration/planning-docs.test.js`

**Purpose**: Validate complete pipeline from planning docs to JSON fixtures

**Tests**:
- ✅ Planning documents have content and structure
- ✅ Planning docs map to corresponding JSON fixtures
- ✅ Fixtures represent the same concepts as planning docs
- ✅ Complete flows from start to end states
- ✅ Decision branches exist where expected
- ✅ UI components match expected login/form patterns

**Detailed Integration Tests**:
- **simple-login-flow**: Validates login flow structure, decision branches
- **approval-workflow**: Validates approval process with multiple decision points
- **ui-login-page**: Validates UI components (inputs, buttons, forms)

**Run**:
```bash
npx vitest run tests/integration/planning-docs.test.js
```

## Test Fixtures

### Flowchart Fixtures

Located in `fixtures/`:
- `simple-login-flow.json` - Basic login authentication flow
- `approval-workflow.json` - Multi-step approval process
- (More fixtures as examples are created)

**Schema**: `tests/schema/flowchart-schema.json`

### UI Mockup Fixtures

Located in `fixtures/`:
- `ui-login-page.json` - Login page UI mockup
- (More UI fixtures as examples are created)

**Schema**: `tests/schema/ui-schema.json`

### Planning Documents

Located in `examples/planning-docs/`:
- `simple-login-flow.md`
- `approval-workflow.md`
- `ui-login-page.md`
- `ui-dashboard.md`
- `ui-product-card.md`
- `ecommerce-checkout.md`

## JSON Schema Definitions

### Flowchart Schema

**Structure**:
```json
{
  "graph": {
    "directed": boolean,
    "label": string,
    "type": "flowchart" | "workflow",
    "metadata": object (optional),
    "nodes": {
      "[nodeId]": {
        "label": string,
        "metadata": {
          "shape": "rectangle" | "oval" | "diamond" | "parallelogram" | "circle",
          "color": "#RRGGBB"
        }
      }
    },
    "edges": [
      {
        "source": string,
        "target": string,
        "relation": string,
        "directed": boolean,
        "metadata": {
          "label": string,
          "style": "solid" | "dashed" | "dotted"
        }
      }
    ]
  }
}
```

### UI Mockup Schema

**Structure**:
```json
{
  "ui": {
    "type": "page" | "component" | "layout",
    "title": string,
    "metadata": object (optional),
    "components": [
      {
        "id": string,
        "type": "button" | "input" | "text" | "card" | "container" | ...,
        "label": string,
        "metadata": {
          "position": { "row": int, "col": int },
          "size": "small" | "medium" | "large" | "full",
          "color": "#RRGGBB",
          "placeholder": string,
          "required": boolean
        },
        "children": [ /* recursive components */ ]
      }
    ]
  }
}
```

## Helper Functions

### Schema Validator (`tests/helpers/schema-validator.js`)

**Functions**:
- `validateFlowchartData(data)` - Validate flowchart JSON against schema
- `validateUIData(data)` - Validate UI mockup JSON against schema
- `formatValidationErrors(errors)` - Format AJV errors for readability
- `validateNodeReferences(graphData)` - Check all edge references exist
- `detectCycles(graphData)` - Detect cycles in directed graphs

**Usage**:
```javascript
import { validateFlowchartData } from './tests/helpers/schema-validator.js';

const result = validateFlowchartData(myData);
if (!result.valid) {
  console.error(result.errors);
}
```

### Fixture Loader (`tests/helpers/fixture-loader.js`)

**Functions**:
- `loadFixture(path)` - Load single JSON fixture
- `loadAllFixtures(dir)` - Load all JSON fixtures from directory
- `loadMarkdownDoc(path)` - Load single markdown document
- `loadAllMarkdownDocs(dir)` - Load all markdown docs from directory
- `getExpectedFixturePath(name, dir)` - Get expected fixture path for planning doc

**Usage**:
```javascript
import { loadFixture } from './tests/helpers/fixture-loader.js';

const data = loadFixture('/path/to/fixture.json');
```

## Writing New Tests

### Adding Flowchart Tests

1. Create fixture in `fixtures/[name].json`
2. Create planning doc in `examples/planning-docs/[name].md`
3. Schema validation runs automatically
4. Add integration tests in `tests/integration/planning-docs.test.js`:

```javascript
describe('[Name] - Detailed Integration', () => {
  const fixturePath = join(fixturesDir, '[name].json');

  it('should validate against schema', () => {
    const data = loadFixture(fixturePath);
    const result = validateFlowchartData(data);
    expect(result.valid).toBe(true);
  });

  it('should represent [concept]', () => {
    const data = loadFixture(fixturePath);
    // Add specific assertions
  });
});
```

### Adding UI Tests

Same as flowchart, but use `validateUIData()` and UI schema.

### Adding Edge Case Tests

Add to `tests/unit/edge-cases.test.js`:

```javascript
describe('Edge Case - [Description]', () => {
  it('should handle [scenario]', () => {
    const data = { /* edge case data */ };
    const result = validateFlowchartData(data);
    expect(result.valid).toBe(/* expected */);
  });
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Coverage Goals

**Target Coverage**:
- Schema validation: 100%
- Helper functions: 100%
- Fixtures: 100% validated
- Planning docs: 100% have corresponding fixtures

**Check Coverage**:
```bash
npm run test:coverage
```

View HTML report:
```bash
open coverage/index.html
```

## Troubleshooting

### Tests Failing After Adding New Fixture

1. Ensure fixture matches schema:
   ```bash
   npx vitest run tests/unit/schema-validation.test.js
   ```

2. Check validation errors in output

3. Use helper to debug:
   ```javascript
   import { validateFlowchartData, formatValidationErrors } from './helpers/schema-validator.js';
   const result = validateFlowchartData(data);
   if (!result.valid) {
     console.error(formatValidationErrors(result.errors));
   }
   ```

### Node Reference Errors

If edges reference non-existent nodes:

```javascript
import { validateNodeReferences } from './helpers/schema-validator.js';
const result = validateNodeReferences(data.graph);
console.log(result.missingNodes); // Shows which nodes are missing
```

### Schema Validation Confusion

Check schema files:
- `tests/schema/flowchart-schema.json`
- `tests/schema/ui-schema.json`

Ensure your data structure matches the schema's `required` fields and type constraints.

## Future Enhancements

Potential additions:
- [ ] Performance benchmarks for large graphs (1000+ nodes)
- [ ] Visual regression tests for rendered output
- [ ] Property-based testing (generate random valid/invalid fixtures)
- [ ] Snapshot testing for planning doc → JSON conversion
- [ ] E2E tests with actual renderer integration
- [ ] Accessibility tests for UI components
- [ ] Internationalization tests (multiple languages)

## Contributing

When adding new examples or fixtures:

1. ✅ Create planning document in `examples/planning-docs/`
2. ✅ Create corresponding JSON fixture in `fixtures/`
3. ✅ Run tests to ensure schema compliance
4. ✅ Add integration tests if introducing new concepts
5. ✅ Update this README if adding new test categories

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [AJV JSON Schema Validator](https://ajv.js.org/)
- [JSON Schema Specification](https://json-schema.org/)
- [Araseo Main Project](../README.md)

## License

MIT
