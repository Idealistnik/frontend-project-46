// тут функция для сравнения файлов
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';


import {
  getFileExtension,
  getFilePathExtension,
  getAbsolutePath,
  readFile,
  parseJson,
} from './functions.js';

export const getObjectFromPath = (filePath) => {
  const fileExtentions = getFilePathExtension(filePath);
  const absolutePath = getAbsolutePath(filePath);
  const fileContent = readFile(absolutePath);

  switch (fileExtentions) {
    case ('.json'): return parseJson(fileContent);
    case ('.yml'): return yaml.load(fileContent);
    default: throw new Error('wrong extension');
  }
};

// console.log(getObjectFromPath('../testFiles/file1.json'));
export const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const result = keys.reduce((acc, key) => {
    const newAcc = {};
    if (!obj1[key]) {
      newAcc.key = key;
      newAcc.value = obj2[key];
      newAcc.status = 'added';
      // acc[key] = 'added';
    } else if (!obj2[key]) {
      newAcc.key = key;
      newAcc.value = obj1[key];
      newAcc.status = 'deleted';
      // acc[key] = 'deleted';
    } else if (obj1[key] !== obj2[key]) {
      newAcc.key = key;
      newAcc.value = obj2[key];
      newAcc.status = 'changed1';
      newAcc.key = key;
      newAcc.value = obj2[key];
      newAcc.status = 'changed2';

      // acc[key] = 'changed';
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
  const result = sorted.map(({ key, value, status }) => {
    const sign = status === 'added' ?
    '+' : status === 'deleted' ?
    '-' : status === 'changed' ?
    '-' : ' ';
    const newLine = ` ${sign} ${key}: ${value}`;
    return newLine;
  });
  const result1 = ['{', ...result, '}'].join('\n');
  return result1;
}


// console.log(genDiff(getObjectFromPath('../testFiles/file1.json'), getObjectFromPath('../testFiles/file2.json')))

export default genDiff;

// const result = fileExtentions === '.json' ?
// parseJson(fileContent) : fileExtentions === '.yml' ?
//   yaml.load(fileContent) : 'wrong extension';
// return result;