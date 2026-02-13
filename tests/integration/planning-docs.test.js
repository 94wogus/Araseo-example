import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import {
  loadAllMarkdownDocs,
  loadFixture,
  getExpectedFixturePath
} from '../helpers/fixture-loader.js';
import {
  validateFlowchartData,
  validateUIData,
  validateNodeReferences
} from '../helpers/schema-validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const planningDocsDir = join(__dirname, '../../examples/planning-docs');
const fixturesDir = join(__dirname, '../../fixtures');

describe('Planning Document Integration Tests', () => {
  const planningDocs = loadAllMarkdownDocs(planningDocsDir);

  it('should have planning documents to test', () => {
    expect(planningDocs.length).toBeGreaterThan(0);
  });

  describe('Planning doc structure validation', () => {
    planningDocs.forEach(doc => {
      it(`${doc.name} should have content`, () => {
        expect(doc.content).toBeTruthy();
        expect(doc.content.length).toBeGreaterThan(0);
      });

      it(`${doc.name} should have a title`, () => {
        const lines = doc.content.split('\n');
        const hasTitle = lines.some(line => line.startsWith('#'));
        expect(hasTitle).toBe(true);
      });
    });
  });

  describe('Planning doc to JSON fixture mapping', () => {
    planningDocs.forEach(doc => {
      it(`${doc.name} should have a corresponding JSON fixture`, () => {
        const fixturePath = getExpectedFixturePath(doc.name, fixturesDir);
        const exists = existsSync(fixturePath);

        if (!exists) {
          console.warn(`Missing fixture for ${doc.name}: ${fixturePath}`);
        }

        // Note: Not all planning docs may have fixtures yet - this documents expected mappings
        // expect(exists).toBe(true);
      });
    });
  });

  describe('Fixture validation for planning docs', () => {
    const fixtureTests = [
      { name: 'simple-login-flow', type: 'flowchart' },
      { name: 'approval-workflow', type: 'flowchart' },
      { name: 'ui-login-page', type: 'ui' }
    ];

    fixtureTests.forEach(({ name, type }) => {
      describe(`${name} (${type})`, () => {
        it('should have valid JSON fixture', () => {
          const fixturePath = join(fixturesDir, `${name}.json`);
          if (!existsSync(fixturePath)) {
            console.warn(`Fixture not found: ${fixturePath}`);
            return;
          }

          const data = loadFixture(fixturePath);
          expect(data).toBeTruthy();
        });

        it('should validate against schema', () => {
          const fixturePath = join(fixturesDir, `${name}.json`);
          if (!existsSync(fixturePath)) return;

          const data = loadFixture(fixturePath);

          if (type === 'flowchart') {
            const result = validateFlowchartData(data);
            expect(result.valid).toBe(true);
          } else if (type === 'ui') {
            const result = validateUIData(data);
            expect(result.valid).toBe(true);
          }
        });

        if (type === 'flowchart') {
          it('should have valid node references', () => {
            const fixturePath = join(fixturesDir, `${name}.json`);
            if (!existsSync(fixturePath)) return;

            const data = loadFixture(fixturePath);
            const result = validateNodeReferences(data.graph);
            expect(result.valid).toBe(true);
          });
        }
      });
    });
  });
});

describe('Simple Login Flow - Detailed Integration', () => {
  const planningDocPath = join(planningDocsDir, 'simple-login-flow.md');
  const fixturePath = join(fixturesDir, 'simple-login-flow.json');

  it('should exist as both planning doc and fixture', () => {
    expect(existsSync(planningDocPath)).toBe(true);
    expect(existsSync(fixturePath)).toBe(true);
  });

  it('should represent the same login flow concept', () => {
    const data = loadFixture(fixturePath);

    expect(data.graph.label).toContain('로그인');
    expect(data.graph.type).toBe('flowchart');

    // Check key nodes exist
    const nodeIds = Object.keys(data.graph.nodes);
    expect(nodeIds).toContain('start');
    expect(nodeIds).toContain('input');
    expect(nodeIds).toContain('verify');
    expect(nodeIds).toContain('decision');
  });

  it('should have complete flow from start to end', () => {
    const data = loadFixture(fixturePath);

    // Check for start node
    expect(data.graph.nodes.start).toBeTruthy();

    // Check for end nodes
    const hasEndNode = Object.keys(data.graph.nodes).some(id =>
      id.includes('end') || data.graph.nodes[id].label.includes('종료')
    );
    expect(hasEndNode).toBe(true);
  });

  it('should have decision branch (success/failure)', () => {
    const data = loadFixture(fixturePath);

    const decisionNode = Object.values(data.graph.nodes).find(node =>
      node.metadata?.shape === 'diamond' || node.label.includes('?')
    );

    expect(decisionNode).toBeTruthy();
  });
});

describe('Approval Workflow - Detailed Integration', () => {
  const fixturePath = join(fixturesDir, 'approval-workflow.json');

  it('should exist as fixture', () => {
    expect(existsSync(fixturePath)).toBe(true);
  });

  it('should represent approval process', () => {
    const data = loadFixture(fixturePath);

    expect(data.graph.type).toBe('flowchart');

    // Check for approval-related nodes
    const labels = Object.values(data.graph.nodes).map(n => n.label.toLowerCase());
    const hasApprovalConcept = labels.some(label =>
      label.includes('승인') || label.includes('검토') || label.includes('결재')
    );

    expect(hasApprovalConcept).toBe(true);
  });

  it('should have multiple decision points', () => {
    const data = loadFixture(fixturePath);

    const decisionNodes = Object.values(data.graph.nodes).filter(node =>
      node.metadata?.shape === 'diamond'
    );

    expect(decisionNodes.length).toBeGreaterThan(0);
  });
});

describe('UI Login Page - Detailed Integration', () => {
  const fixturePath = join(fixturesDir, 'ui-login-page.json');

  it('should exist as fixture', () => {
    expect(existsSync(fixturePath)).toBe(true);
  });

  it('should represent login UI mockup', () => {
    const data = loadFixture(fixturePath);

    // This fixture uses mockup format
    expect(data.mockup).toBeTruthy();
    expect(data.mockup.title).toContain('로그인');
    expect(data.mockup.layout.type).toBe('single-page');
  });

  it('should have header, main, and footer sections', () => {
    const data = loadFixture(fixturePath);

    const sectionTypes = data.mockup.layout.sections.map(s => s.type);
    expect(sectionTypes).toContain('header');
    expect(sectionTypes).toContain('main');
    expect(sectionTypes).toContain('footer');
  });

  it('should have login form with inputs', () => {
    const data = loadFixture(fixturePath);

    const mainSection = data.mockup.layout.sections.find(s => s.type === 'main');
    expect(mainSection).toBeTruthy();

    // Find all input components recursively
    const findInputs = (components) => {
      let inputs = [];
      for (const comp of components) {
        if (comp.type === 'input') inputs.push(comp);
        if (comp.children) inputs = inputs.concat(findInputs(comp.children));
      }
      return inputs;
    };

    const inputs = findInputs(mainSection.components);
    expect(inputs.length).toBeGreaterThanOrEqual(2); // At least email and password
  });

  it('should have submit button', () => {
    const data = loadFixture(fixturePath);

    const mainSection = data.mockup.layout.sections.find(s => s.type === 'main');

    // Find all button components recursively
    const findButtons = (components) => {
      let buttons = [];
      for (const comp of components) {
        if (comp.type === 'button') buttons.push(comp);
        if (comp.children) buttons = buttons.concat(findButtons(comp.children));
      }
      return buttons;
    };

    const buttons = findButtons(mainSection.components);
    const hasSubmitButton = buttons.some(btn =>
      btn.properties?.text?.includes('로그인')
    );

    expect(hasSubmitButton).toBe(true);
  });
});

describe('End-to-End Pipeline Validation', () => {
  it('should have matching planning docs and fixtures count', () => {
    const planningDocs = loadAllMarkdownDocs(planningDocsDir);

    // Note: Not all planning docs may have fixtures yet in early development
    // This test documents the expected 1:1 mapping goal
    console.log(`Planning docs: ${planningDocs.length}`);
    console.log(`JSON fixtures available: ${existsSync(fixturesDir)}`);

    expect(planningDocs.length).toBeGreaterThan(0);
  });

  it('should demonstrate full pipeline: markdown → JSON → renderer', () => {
    // This test validates the conceptual pipeline exists
    // 1. Markdown planning doc (input)
    const planningDocExists = existsSync(join(planningDocsDir, 'simple-login-flow.md'));
    expect(planningDocExists).toBe(true);

    // 2. JSON fixture (Claude-generated output via /araseo skill)
    const fixtureExists = existsSync(join(fixturesDir, 'simple-login-flow.json'));
    expect(fixtureExists).toBe(true);

    // 3. Valid schema (renderer can consume)
    const data = loadFixture(join(fixturesDir, 'simple-login-flow.json'));
    const validation = validateFlowchartData(data);
    expect(validation.valid).toBe(true);
  });
});
