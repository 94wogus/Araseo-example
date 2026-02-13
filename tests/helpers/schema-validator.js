import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ajv = new Ajv({ allErrors: true, verbose: true });

// Load schemas
const flowchartSchemaPath = join(__dirname, '../schema/flowchart-schema.json');
const uiSchemaPath = join(__dirname, '../schema/ui-schema.json');
const uiMockupSchemaPath = join(__dirname, '../schema/ui-mockup-schema.json');

const flowchartSchema = JSON.parse(readFileSync(flowchartSchemaPath, 'utf-8'));
const uiSchema = JSON.parse(readFileSync(uiSchemaPath, 'utf-8'));
const uiMockupSchema = JSON.parse(readFileSync(uiMockupSchemaPath, 'utf-8'));

// Compile validators
const validateFlowchart = ajv.compile(flowchartSchema);
const validateUI = ajv.compile(uiSchema);
const validateUIMockup = ajv.compile(uiMockupSchema);

/**
 * Validate a flowchart JSON against the schema
 * @param {Object} data - The flowchart data to validate
 * @returns {{valid: boolean, errors: Array|null}}
 */
export function validateFlowchartData(data) {
  const valid = validateFlowchart(data);
  return {
    valid,
    errors: valid ? null : validateFlowchart.errors
  };
}

/**
 * Validate a UI mockup JSON against the schema
 * Tries both UI formats: component-based and mockup-based
 * @param {Object} data - The UI mockup data to validate
 * @returns {{valid: boolean, errors: Array|null, format: string|null}}
 */
export function validateUIData(data) {
  // Try component-based format first (ui.components)
  let valid = validateUI(data);
  if (valid) {
    return {
      valid: true,
      errors: null,
      format: 'component-based'
    };
  }

  // Try mockup-based format (mockup.layout.sections)
  valid = validateUIMockup(data);
  if (valid) {
    return {
      valid: true,
      errors: null,
      format: 'mockup-based'
    };
  }

  // Both failed, return errors from first attempt
  return {
    valid: false,
    errors: validateUI.errors,
    format: null
  };
}

/**
 * Format validation errors for better readability
 * @param {Array} errors - AJV validation errors
 * @returns {string}
 */
export function formatValidationErrors(errors) {
  if (!errors || errors.length === 0) return '';

  return errors.map(err => {
    return `  - ${err.instancePath || 'root'}: ${err.message}`;
  }).join('\n');
}

/**
 * Check if all node IDs referenced in edges exist in nodes
 * @param {Object} graphData - The graph data with nodes and edges
 * @returns {{valid: boolean, missingNodes: Array}}
 */
export function validateNodeReferences(graphData) {
  const nodeIds = new Set(Object.keys(graphData.nodes || {}));
  const missingNodes = [];

  (graphData.edges || []).forEach((edge, index) => {
    if (!nodeIds.has(edge.source)) {
      missingNodes.push({ edge: index, type: 'source', id: edge.source });
    }
    if (!nodeIds.has(edge.target)) {
      missingNodes.push({ edge: index, type: 'target', id: edge.target });
    }
  });

  return {
    valid: missingNodes.length === 0,
    missingNodes
  };
}

/**
 * Check for cycles in the flowchart (useful for detecting infinite loops)
 * @param {Object} graphData - The graph data with nodes and edges
 * @returns {{hasCycle: boolean, cycles: Array}}
 */
export function detectCycles(graphData) {
  const adjacency = new Map();

  // Build adjacency list
  Object.keys(graphData.nodes || {}).forEach(nodeId => {
    adjacency.set(nodeId, []);
  });

  (graphData.edges || []).forEach(edge => {
    if (edge.directed && adjacency.has(edge.source)) {
      adjacency.get(edge.source).push(edge.target);
    }
  });

  // DFS to detect cycles
  const visited = new Set();
  const recStack = new Set();
  const cycles = [];

  function hasCycleDFS(node, path = []) {
    visited.add(node);
    recStack.add(node);
    path.push(node);

    const neighbors = adjacency.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycleDFS(neighbor, [...path])) {
          return true;
        }
      } else if (recStack.has(neighbor)) {
        cycles.push([...path, neighbor]);
        return true;
      }
    }

    recStack.delete(node);
    return false;
  }

  for (const node of adjacency.keys()) {
    if (!visited.has(node)) {
      hasCycleDFS(node);
    }
  }

  return {
    hasCycle: cycles.length > 0,
    cycles
  };
}
