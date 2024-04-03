import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expectedData = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('testing genDiff json', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toBe(expectedData);
});

test('testing genDiff yml', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toBe(expectedData);
});

// getFixturePath('expectedFile.txt')
// expect(result).toBe(fs.readFileSync(getFixturePath('expectedFile.txt')));  // почему не работает