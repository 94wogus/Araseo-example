import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Load a JSON fixture file
 * @param {string} fixturePath - Absolute path to the fixture file
 * @returns {Object} Parsed JSON data
 */
export function loadFixture(fixturePath) {
  const content = readFileSync(fixturePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Load all JSON fixtures from a directory
 * @param {string} directoryPath - Absolute path to the directory
 * @returns {Array<{name: string, path: string, data: Object}>}
 */
export function loadAllFixtures(directoryPath) {
  const files = readdirSync(directoryPath)
    .filter(file => file.endsWith('.json'));

  return files.map(file => {
    const path = join(directoryPath, file);
    return {
      name: file.replace('.json', ''),
      path,
      data: loadFixture(path)
    };
  });
}

/**
 * Load a markdown planning document
 * @param {string} mdPath - Absolute path to the markdown file
 * @returns {string} Markdown content
 */
export function loadMarkdownDoc(mdPath) {
  return readFileSync(mdPath, 'utf-8');
}

/**
 * Load all markdown planning documents from a directory
 * @param {string} directoryPath - Absolute path to the directory
 * @returns {Array<{name: string, path: string, content: string}>}
 */
export function loadAllMarkdownDocs(directoryPath) {
  const files = readdirSync(directoryPath)
    .filter(file => file.endsWith('.md'));

  return files.map(file => {
    const path = join(directoryPath, file);
    return {
      name: file.replace('.md', ''),
      path,
      content: loadMarkdownDoc(path)
    };
  });
}

/**
 * Get the expected fixture path for a planning document
 * @param {string} planningDocName - Name of the planning document (without extension)
 * @param {string} fixturesDir - Path to fixtures directory
 * @returns {string} Path to corresponding JSON fixture
 */
export function getExpectedFixturePath(planningDocName, fixturesDir) {
  return join(fixturesDir, `${planningDocName}.json`);
}
