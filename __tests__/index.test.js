import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing genDiff json stylish', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toBe(readFile('expectedFileStylish.txt'));
});

test('testing genDiff yml stylish', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toBe(readFile('expectedFileStylish.txt'));
});

test('testing genDiff json plain', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toBe(readFile('expectedFilePlain.txt'));
});

test('testing genDiff yml plain', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(result).toBe(readFile('expectedFilePlain.txt'));
});

test('testing genDiff json', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(result).toBe(readFile('expectedFileJson.txt'));
});
