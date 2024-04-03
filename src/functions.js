// тут все мелкие фукнции
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export const getFileExtension = (file) => file.split('.').at(-1);
export const getFilePathExtension = (filePath) => path.extname(filePath);
export const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
export const readFile = (absolutePath) => fs.readFileSync(absolutePath, 'utf-8');

export const getData = (filePath) => {
  const fileAbsolutePath = getAbsolutePath(filePath);
  const data = readFile(fileAbsolutePath);
  return data;
};

export const getDiffList = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const result = keys.reduce((acc, key) => {
    const newAcc = {};
    if (!_.has(data1, key)) {
      newAcc.key = key;
      newAcc.value = data2[key];
      newAcc.status = 'added';
    } else if (!_.has(data2, key)) {
      newAcc.key = key;
      newAcc.value = data1[key];
      newAcc.status = 'deleted';
    } else if (data1[key] !== data2[key]) {
      newAcc.key = key;
      newAcc.oldValue = data1[key];
      newAcc.value = data2[key];
      newAcc.status = 'changed';
    } else {
      newAcc.key = key;
      newAcc.value = data1[key];
      newAcc.status = 'unchanged';
    }
    return [...acc, newAcc];
  }, []);

  return result;
};

export const getDiffResult = (arr) => {
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
