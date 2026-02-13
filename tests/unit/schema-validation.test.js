import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  validateFlowchartData,
  validateUIData,
  formatValidationErrors,
  validateNodeReferences,
  detectCycles
} from '../helpers/schema-validator.js';
import { loadAllFixtures } from '../helpers/fixture-loader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturesDir = join(__dirname, '../../fixtures');

describe('Schema Validation - Flowchart', () => {
  describe('Valid flowchart fixtures', () => {
    const fixtures = loadAllFixtures(fixturesDir).filter(f =>
      f.data.graph && f.data.graph.type === 'flowchart'
    );

    it('should have flowchart fixtures to test', () => {
      expect(fixtures.length).toBeGreaterThan(0);
    });

    fixtures.forEach(fixture => {
      it(`should validate ${fixture.name} against flowchart schema`, () => {
        const result = validateFlowchartData(fixture.data);

        if (!result.valid) {
          console.error(`Validation errors for ${fixture.name}:`);
          console.error(formatValidationErrors(result.errors));
        }

        expect(result.valid).toBe(true);
      });
    });
  });

  describe('Flowchart schema requirements', () => {
    it('should reject flowchart without graph property', () => {
      const invalid = {};
      const result = validateFlowchartData(invalid);
      expect(result.valid).toBe(false);
    });

    it('should reject flowchart without required graph properties', () => {
      const invalid = {
        graph: {
          label: 'Test'
        }
      };
      const result = validateFlowchartData(invalid);
      expect(result.valid).toBe(false);
    });

    it('should accept valid minimal flowchart', () => {
      const valid = {
        graph: {
          directed: true,
          label: 'Test Flowchart',
          type: 'flowchart',
          nodes: {
            start: {
              label: 'Start'
            }
          },
          edges: []
        }
      };
      const result = validateFlowchartData(valid);
      expect(result.valid).toBe(true);
    });

    it('should validate node shape values', () => {
      const valid = {
        graph: {
          directed: true,
          label: 'Shape Test',
          type: 'flowchart',
          nodes: {
            rect: {
              label: 'Rectangle',
              metadata: { shape: 'rectangle' }
            },
            oval: {
              label: 'Oval',
              metadata: { shape: 'oval' }
            },
            diamond: {
              label: 'Diamond',
              metadata: { shape: 'diamond' }
            }
          },
          edges: []
        }
      };
      const result = validateFlowchartData(valid);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid node shape', () => {
      const invalid = {
        graph: {
          directed: true,
          label: 'Invalid Shape',
          type: 'flowchart',
          nodes: {
            test: {
              label: 'Test',
              metadata: { shape: 'invalid_shape' }
            }
          },
          edges: []
        }
      };
      const result = validateFlowchartData(invalid);
      expect(result.valid).toBe(false);
    });

    it('should validate hex color codes', () => {
      const valid = {
        graph: {
          directed: true,
          label: 'Color Test',
          type: 'flowchart',
          nodes: {
            node1: {
              label: 'Node',
              metadata: { color: '#FF5733' }
            }
          },
          edges: []
        }
      };
      const result = validateFlowchartData(valid);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid color codes', () => {
      const invalid = {
        graph: {
          directed: true,
          label: 'Invalid Color',
          type: 'flowchart',
          nodes: {
            node1: {
              label: 'Node',
              metadata: { color: 'red' } // Should be hex
            }
          },
          edges: []
        }
      };
      const result = validateFlowchartData(invalid);
      expect(result.valid).toBe(false);
    });
  });
});

describe('Schema Validation - UI Mockup', () => {
  describe('Valid UI fixtures', () => {
    const fixtures = loadAllFixtures(fixturesDir).filter(f =>
      (f.data.ui && f.data.ui.type) || (f.data.mockup && f.data.mockup.layout)
    );

    it('should have UI fixtures to test', () => {
      expect(fixtures.length).toBeGreaterThan(0);
    });

    fixtures.forEach(fixture => {
      it(`should validate ${fixture.name} against UI schema`, () => {
        const result = validateUIData(fixture.data);

        if (!result.valid) {
          console.error(`Validation errors for ${fixture.name}:`);
          console.error(formatValidationErrors(result.errors));
        }

        expect(result.valid).toBe(true);
      });
    });
  });

  describe('UI schema requirements', () => {
    it('should reject UI without ui property', () => {
      const invalid = {};
      const result = validateUIData(invalid);
      expect(result.valid).toBe(false);
    });

    it('should accept valid minimal UI mockup', () => {
      const valid = {
        ui: {
          type: 'page',
          title: 'Test Page',
          components: []
        }
      };
      const result = validateUIData(valid);
      expect(result.valid).toBe(true);
    });

    it('should validate component types', () => {
      const valid = {
        ui: {
          type: 'page',
          title: 'Component Test',
          components: [
            { id: 'btn1', type: 'button', label: 'Click Me' },
            { id: 'input1', type: 'input', label: 'Name' },
            { id: 'text1', type: 'text', label: 'Description' }
          ]
        }
      };
      const result = validateUIData(valid);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid component type', () => {
      const invalid = {
        ui: {
          type: 'page',
          title: 'Invalid Component',
          components: [
            { id: 'test', type: 'invalid_type', label: 'Test' }
          ]
        }
      };
      const result = validateUIData(invalid);
      expect(result.valid).toBe(false);
    });
  });
});

describe('Node Reference Validation', () => {
  it('should validate all edge references exist in nodes', () => {
    const validGraph = {
      nodes: {
        start: { label: 'Start' },
        end: { label: 'End' }
      },
      edges: [
        { source: 'start', target: 'end', relation: 'flows_to', directed: true }
      ]
    };

    const result = validateNodeReferences(validGraph);
    expect(result.valid).toBe(true);
    expect(result.missingNodes).toHaveLength(0);
  });

  it('should detect missing source node', () => {
    const invalidGraph = {
      nodes: {
        end: { label: 'End' }
      },
      edges: [
        { source: 'start', target: 'end', relation: 'flows_to', directed: true }
      ]
    };

    const result = validateNodeReferences(invalidGraph);
    expect(result.valid).toBe(false);
    expect(result.missingNodes).toHaveLength(1);
    expect(result.missingNodes[0].id).toBe('start');
  });

  it('should detect missing target node', () => {
    const invalidGraph = {
      nodes: {
        start: { label: 'Start' }
      },
      edges: [
        { source: 'start', target: 'end', relation: 'flows_to', directed: true }
      ]
    };

    const result = validateNodeReferences(invalidGraph);
    expect(result.valid).toBe(false);
    expect(result.missingNodes).toHaveLength(1);
    expect(result.missingNodes[0].id).toBe('end');
  });

  describe('Validate all fixtures have valid node references', () => {
    const flowchartFixtures = loadAllFixtures(fixturesDir).filter(f =>
      f.data.graph && f.data.graph.type === 'flowchart'
    );

    flowchartFixtures.forEach(fixture => {
      it(`should have valid node references in ${fixture.name}`, () => {
        const result = validateNodeReferences(fixture.data.graph);

        if (!result.valid) {
          console.error(`Missing nodes in ${fixture.name}:`, result.missingNodes);
        }

        expect(result.valid).toBe(true);
      });
    });
  });
});

describe('Cycle Detection', () => {
  it('should detect no cycles in linear flow', () => {
    const linearGraph = {
      nodes: {
        a: { label: 'A' },
        b: { label: 'B' },
        c: { label: 'C' }
      },
      edges: [
        { source: 'a', target: 'b', relation: 'flows_to', directed: true },
        { source: 'b', target: 'c', relation: 'flows_to', directed: true }
      ]
    };

    const result = detectCycles(linearGraph);
    expect(result.hasCycle).toBe(false);
  });

  it('should detect simple cycle', () => {
    const cyclicGraph = {
      nodes: {
        a: { label: 'A' },
        b: { label: 'B' }
      },
      edges: [
        { source: 'a', target: 'b', relation: 'flows_to', directed: true },
        { source: 'b', target: 'a', relation: 'flows_to', directed: true }
      ]
    };

    const result = detectCycles(cyclicGraph);
    expect(result.hasCycle).toBe(true);
  });

  it('should allow intentional cycles (like retry loops)', () => {
    // This test documents that cycles are allowed (e.g., error retry patterns)
    const retryGraph = {
      nodes: {
        input: { label: 'Input' },
        verify: { label: 'Verify' },
        error: { label: 'Error' }
      },
      edges: [
        { source: 'input', target: 'verify', relation: 'flows_to', directed: true },
        { source: 'verify', target: 'error', relation: 'flows_to', directed: true },
        { source: 'error', target: 'input', relation: 'flows_to', directed: true }
      ]
    };

    const result = detectCycles(retryGraph);
    // Cycles are detected but not necessarily errors (intentional retry patterns)
    expect(result.hasCycle).toBe(true);
    expect(result.cycles.length).toBeGreaterThan(0);
  });
});
