# Quick Start - Araseo Test Suite

Get the test suite running in under 2 minutes.

## 1. Install Dependencies (30 seconds)

```bash
cd /Users/wogus/Wogus/Araseo/Araseo-example
npm install
```

This installs vitest, ajv, and coverage tools.

## 2. Run Tests (10 seconds)

```bash
npm test
```

Expected output:
```
✓ tests/unit/schema-validation.test.js (XX tests)
✓ tests/unit/edge-cases.test.js (XX tests)
✓ tests/integration/planning-docs.test.js (XX tests)

Test Files  3 passed (3)
     Tests  XX passed (XX)
```

## 3. Verify All Pass

All tests should pass ✅

If any fail:
- Check schema validation errors in output
- Verify fixtures/ directory has .json files
- Ensure examples/planning-docs/ has .md files

## 4. Explore Tests

### Watch Mode (continuous testing)
```bash
npm run test:watch
```

### Visual UI
```bash
npm run test:ui
```

Opens in browser: http://localhost:51204/__vitest__/

### Coverage Report
```bash
npm run test:coverage
open coverage/index.html
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Watch mode - re-run on changes |
| `npm run test:ui` | Visual browser UI |
| `npm run test:coverage` | Generate coverage report |
| `npx vitest run [file]` | Run specific test file |

## Test Structure

```
tests/
├── unit/
│   ├── schema-validation.test.js    # Schema compliance
│   └── edge-cases.test.js           # Edge cases & errors
├── integration/
│   └── planning-docs.test.js        # End-to-end pipeline
├── helpers/
│   ├── schema-validator.js          # Validation utilities
│   └── fixture-loader.js            # File loading utilities
└── schema/
    ├── flowchart-schema.json        # Flowchart JSON schema
    └── ui-schema.json               # UI mockup JSON schema
```

## What's Being Tested?

### ✅ Schema Validation
- All JSON fixtures match their schemas
- Required fields present
- Correct data types
- Valid enum values

### ✅ Node References
- All edges reference existing nodes
- No dangling references

### ✅ Integration
- Planning docs → JSON fixtures mapping
- Concepts match between markdown and JSON
- Complete flows (start → end)

### ✅ Edge Cases
- Empty structures
- Special characters (Korean, emoji)
- Large graphs (100+ nodes)
- Nested components
- Error handling

## Quick Validation

### Check if a fixture is valid:

```javascript
// Create: test-fixture.js
import { validateFlowchartData } from './tests/helpers/schema-validator.js';
import { loadFixture } from './tests/helpers/fixture-loader.js';

const data = loadFixture('./fixtures/simple-login-flow.json');
const result = validateFlowchartData(data);

console.log(result.valid ? '✅ Valid' : '❌ Invalid');
if (!result.valid) {
  console.error(result.errors);
}
```

```bash
node test-fixture.js
```

## Next Steps

1. ✅ Run tests to verify everything works
2. 📖 Read full [README.md](./README.md) for comprehensive guide
3. 🔧 Add new fixtures in `fixtures/`
4. 📝 Add planning docs in `examples/planning-docs/`
5. ✍️ Write integration tests for new examples

## Troubleshooting

### "Cannot find module 'vitest'"

```bash
npm install
```

### Tests fail with schema errors

Check the error output for validation details:
```
Expected: valid schema
Received: false
Errors:
  - graph.nodes.xyz: missing required property 'label'
```

Fix the JSON fixture to match schema requirements.

### No fixtures found

Ensure `fixtures/` directory has .json files:
```bash
ls -la fixtures/
```

## Documentation

- [Full Test README](./README.md) - Comprehensive test guide
- [Schema Definitions](./schema/) - JSON schema files
- [Example Planning Docs](../examples/planning-docs/) - Markdown inputs

## Support

If tests fail or you encounter issues:
1. Check error messages in test output
2. Review schema definitions in `tests/schema/`
3. Validate fixtures manually with helper functions
4. Read full README for detailed troubleshooting

---

**Time to first test run**: < 2 minutes ⚡
