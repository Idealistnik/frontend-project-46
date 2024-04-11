import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('testing genDiff json stylish', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFileStylish.txt'), 'utf-8'));
});

test('testing genDiff yml stylish', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFileStylish.txt'), 'utf-8'));
});

test('testing genDiff json plain', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFilePlain.txt'), 'utf-8'));
});

test('testing genDiff yml plain', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFilePlain.txt'), 'utf-8'));
});

test('testing genDiff json', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  expect(result).toBe(fs.readFileSync(getFixturePath('expectedFileJson.txt'), 'utf-8'));
});
