// тут все мелкие фукнции
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

export const getFileExtension = (file) => file.split('.').at(-1);
export const getFilePathExtension = (filePath) => path.extname(filePath);
export const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
export const readFile = (absolutePath) => fs.readFileSync(absolutePath);

export const getInfoFromFile = (filePath) => {
  const fileAbsolutePath = getAbsolutePath(filePath);
  const fileInfo = readFile(fileAbsolutePath);
  return fileInfo;
};

export const getParsedFile = (file, fileExtension) => {
  switch (fileExtension) {
    case ('.json'): return JSON.parse(file);
    case ('.yml'): return yaml.load(file);
    default: throw new Error('wrong extension');
  }
};

export const getDiffObject = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const result = keys.reduce((acc, key) => {
    const newAcc = {};
    if (!_.has(obj1, key)) {
      newAcc.key = key;
      newAcc.value = obj2[key];
      newAcc.status = 'added';
    } else if (!_.has(obj2, key)) {
      newAcc.key = key;
      newAcc.value = obj1[key];
      newAcc.status = 'deleted';
    } else if (obj1[key] !== obj2[key]) {
      newAcc.key = key;
      newAcc.oldValue = obj1[key];
      newAcc.value = obj2[key];
      newAcc.status = 'changed';
    } else {
      newAcc.key = key;
      newAcc.value = obj1[key];
      newAcc.status = 'unchanged';
    }
    return [...acc, newAcc];
  }, []);

  return result;
};

export const getResult = (arr) => {
  const sorted = _.sortBy(arr, ['key']);
  const result = sorted.map(({
    key, value, status, oldValue,
  }) => {
    let newLine;
    switch (status) {
      case 'added': {
        newLine = `  + ${key}: ${value}`;
        break;
      }
      case 'deleted': {
        newLine = `  - ${key}: ${value}`;
        break;
      }
      case 'changed': {
        newLine = `  - ${key}: ${oldValue}\n  + ${key}: ${value}`;
        break;
      }
      case 'unchanged': {
        newLine = `    ${key}: ${value}`;
        break;
      }
      default: throw new Error('wrong status value');
    }
    return newLine;
  });
  const result1 = ['{', ...result, '}'].join('\n');
  return result1;
};
