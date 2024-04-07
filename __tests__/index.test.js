import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('testing genDiff json', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFile.txt'), 'utf-8'));
});
// test('testing genDiff yml', () => {

//   const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
//   expect(result).toBe(expectedData);
// });

// getFixturePath('expectedFile.txt')
// expect(result).toBe(fs.readFileSync(getFixturePath('expectedFile.txt')));  // почему не работает