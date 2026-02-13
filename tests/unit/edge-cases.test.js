import { describe, it, expect } from 'vitest';
import {
  validateFlowchartData,
  validateUIData,
  validateNodeReferences,
  detectCycles
} from '../helpers/schema-validator.js';

describe('Edge Cases - Flowchart', () => {
  describe('Empty and minimal structures', () => {
    it('should handle flowchart with no edges', () => {
      const data = {
        graph: {
          directed: true,
          label: 'No Edges',
          type: 'flowchart',
          nodes: {
            single: { label: 'Single Node' }
          },
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle flowchart with no nodes but empty edges', () => {
      const data = {
        graph: {
          directed: true,
          label: 'No Nodes',
          type: 'flowchart',
          nodes: {},
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Special characters in labels', () => {
    it('should handle Korean text in labels', () => {
      const data = {
        graph: {
          directed: true,
          label: '한글 라벨 테스트',
          type: 'flowchart',
          nodes: {
            start: { label: '시작' },
            end: { label: '종료' }
          },
          edges: [
            { source: 'start', target: 'end', relation: 'flows_to', directed: true }
          ]
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle emoji in labels', () => {
      const data = {
        graph: {
          directed: true,
          label: 'Emoji Test 🎉',
          type: 'flowchart',
          nodes: {
            start: { label: '🚀 Start' },
            end: { label: '✅ Complete' }
          },
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle special characters in labels', () => {
      const data = {
        graph: {
          directed: true,
          label: 'Special & Characters < Test >',
          type: 'flowchart',
          nodes: {
            test: { label: 'A -> B & C | D' }
          },
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Complex node ID patterns', () => {
    it('should accept valid node IDs', () => {
      const data = {
        graph: {
          directed: true,
          label: 'ID Test',
          type: 'flowchart',
          nodes: {
            simple: { label: 'Simple' },
            with_underscore: { label: 'Underscore' },
            'with-dash': { label: 'Dash' },
            withNumber123: { label: 'Number' },
            _startWithUnderscore: { label: 'Start Underscore' }
          },
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Large structures', () => {
    it('should handle flowchart with many nodes', () => {
      const nodes = {};
      const edges = [];

      // Create 100 nodes
      for (let i = 0; i < 100; i++) {
        nodes[`node_${i}`] = { label: `Node ${i}` };
        if (i > 0) {
          edges.push({
            source: `node_${i - 1}`,
            target: `node_${i}`,
            relation: 'flows_to',
            directed: true
          });
        }
      }

      const data = {
        graph: {
          directed: true,
          label: 'Large Flowchart',
          type: 'flowchart',
          nodes,
          edges
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle deeply nested metadata', () => {
      const data = {
        graph: {
          directed: true,
          label: 'Deep Metadata',
          type: 'flowchart',
          metadata: {
            level1: {
              level2: {
                level3: {
                  deepValue: 'test'
                }
              }
            }
          },
          nodes: {
            test: { label: 'Test' }
          },
          edges: []
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Bidirectional edges', () => {
    it('should handle bidirectional flow', () => {
      const data = {
        graph: {
          directed: true,
          label: 'Bidirectional',
          type: 'flowchart',
          nodes: {
            a: { label: 'A' },
            b: { label: 'B' }
          },
          edges: [
            { source: 'a', target: 'b', relation: 'flows_to', directed: true },
            { source: 'b', target: 'a', relation: 'returns_to', directed: true }
          ]
        }
      };

      const result = validateFlowchartData(data);
      expect(result.valid).toBe(true);

      // This creates a cycle, which should be detected
      const cycleCheck = detectCycles(data.graph);
      expect(cycleCheck.hasCycle).toBe(true);
    });
  });
});

describe('Edge Cases - UI Mockup', () => {
  describe('Empty and minimal structures', () => {
    it('should handle UI with no components', () => {
      const data = {
        ui: {
          type: 'page',
          title: 'Empty Page',
          components: []
        }
      };

      const result = validateUIData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Nested components', () => {
    it('should handle deeply nested components', () => {
      const data = {
        ui: {
          type: 'page',
          title: 'Nested Components',
          components: [
            {
              id: 'container1',
              type: 'container',
              label: 'Container 1',
              children: [
                {
                  id: 'container2',
                  type: 'container',
                  label: 'Container 2',
                  children: [
                    {
                      id: 'button1',
                      type: 'button',
                      label: 'Nested Button'
                    }
                  ]
                }
              ]
            }
          ]
        }
      };

      const result = validateUIData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Component metadata variations', () => {
    it('should handle all size options', () => {
      const data = {
        ui: {
          type: 'page',
          title: 'Size Test',
          components: [
            { id: 'small', type: 'button', label: 'Small', metadata: { size: 'small' } },
            { id: 'medium', type: 'button', label: 'Medium', metadata: { size: 'medium' } },
            { id: 'large', type: 'button', label: 'Large', metadata: { size: 'large' } },
            { id: 'full', type: 'button', label: 'Full', metadata: { size: 'full' } }
          ]
        }
      };

      const result = validateUIData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle position metadata', () => {
      const data = {
        ui: {
          type: 'page',
          title: 'Position Test',
          components: [
            {
              id: 'positioned',
              type: 'button',
              label: 'Positioned',
              metadata: {
                position: {
                  row: 1,
                  col: 2
                }
              }
            }
          ]
        }
      };

      const result = validateUIData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('Form components', () => {
    it('should handle complete form structure', () => {
      const data = {
        ui: {
          type: 'page',
          title: 'Form Test',
          components: [
            {
              id: 'form1',
              type: 'form',
              label: 'Login Form',
              children: [
                {
                  id: 'email',
                  type: 'input',
                  label: 'Email',
                  metadata: {
                    placeholder: 'Enter email',
                    required: true
                  }
                },
                {
                  id: 'password',
                  type: 'input',
                  label: 'Password',
                  metadata: {
                    placeholder: 'Enter password',
                    required: true
                  }
                },
                {
                  id: 'submit',
                  type: 'button',
                  label: 'Submit'
                }
              ]
            }
          ]
        }
      };

      const result = validateUIData(data);
      expect(result.valid).toBe(true);
    });
  });
});

describe('Edge Cases - Node Reference Validation', () => {
  it('should handle self-referencing node', () => {
    const data = {
      nodes: {
        loop: { label: 'Loop' }
      },
      edges: [
        { source: 'loop', target: 'loop', relation: 'loops', directed: true }
      ]
    };

    const result = validateNodeReferences(data);
    expect(result.valid).toBe(true); // Self-reference is valid

    const cycleCheck = detectCycles(data);
    expect(cycleCheck.hasCycle).toBe(true);
  });

  it('should handle disconnected components', () => {
    const data = {
      nodes: {
        a: { label: 'A' },
        b: { label: 'B' },
        c: { label: 'C' },
        d: { label: 'D' }
      },
      edges: [
        { source: 'a', target: 'b', relation: 'flows_to', directed: true },
        { source: 'c', target: 'd', relation: 'flows_to', directed: true }
      ]
    };

    const result = validateNodeReferences(data);
    expect(result.valid).toBe(true); // Disconnected components are valid
  });

  it('should handle nodes with no edges', () => {
    const data = {
      nodes: {
        isolated1: { label: 'Isolated 1' },
        isolated2: { label: 'Isolated 2' },
        isolated3: { label: 'Isolated 3' }
      },
      edges: []
    };

    const result = validateNodeReferences(data);
    expect(result.valid).toBe(true);
  });
});

describe('Error Handling', () => {
  it('should gracefully handle null data', () => {
    const result = validateFlowchartData(null);
    expect(result.valid).toBe(false);
  });

  it('should gracefully handle undefined data', () => {
    const result = validateFlowchartData(undefined);
    expect(result.valid).toBe(false);
  });

  it('should gracefully handle empty object', () => {
    const result = validateFlowchartData({});
    expect(result.valid).toBe(false);
  });

  it('should handle malformed JSON structure', () => {
    const malformed = {
      graph: {
        directed: 'not-a-boolean', // Should be boolean
        label: 123, // Should be string
        type: 'invalid', // Should be 'flowchart' or 'workflow'
        nodes: 'not-an-object',
        edges: 'not-an-array'
      }
    };

    const result = validateFlowchartData(malformed);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeTruthy();
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
