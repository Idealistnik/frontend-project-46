import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getData, getFilePathExtension, getDiffResult } from './src/functions.js';
import getParsedData from './src/parsers.js';

const getDiffList = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data1, key)
      && _.isObject(data1[key]) && _.isObject(data2[key])) {
      const newAcc = {
        key, status: 'nested', value: getDiffList(data1[key], data2[key]),
      };
      return [...acc, newAcc];
    }
    if (!_.has(data1, key)) {
      const newAcc = { key, status: 'added', value: data2[key] };
      return [...acc, newAcc];
    }
    if (!_.has(data2, key)) {
      const newAcc = { key, status: 'deleted', value: data1[key] };
      return [...acc, newAcc];
    }
    if (data1[key] !== data2[key]) {
      const newAcc = {
        key, status: 'changed', oldValue: data1[key], value: data2[key],
      };
      return [...acc, newAcc];
    }
    const newAcc = { key, status: 'unchanged', value: data1[key] };
    return [...acc, newAcc];
  }, []);
  return result;
};
const getValue = (data, spacer = '*', spacesCount = 4) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = spacer.repeat(indentSize);
    const bracketIndent = spacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(node)
      .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};

// const obj = {
//   common: {
//     setting1: 'Value 1',
//     setting2: {
//       key: 'value',
//       doge: {
//         wow: '',
//       },
//     },
//   },
// };

// console.log(getValue(obj));

const getDiffResult1 = (arr) => {
  const sorted = _.sortBy(arr, ['key']);
  const result = sorted.map(({
    key, value, status, oldValue,
  }) => {
    let newLine;
    switch (status) {
      case 'added': {
        newLine = `  + ${key}: ${_.isObject(value) ? getValue(value) : value}`;
        break;
      }
      case 'deleted': {
        newLine = `  - ${key}: ${_.isObject(value) ? getValue(value) : value}`;
        break;
      }
      case 'changed': {
        newLine = `  - ${key}: ${_.isObject(oldValue) ? getValue(oldValue) : oldValue}\n+ ${key}: ${_.isObject(value) ? getValue(value) : value}`;
        break;
      }
      case 'unchanged': {
        newLine = `    ${key}: ${_.isObject(value) ? getValue(value) : value}`;
        break;
      }
      case 'nested': {
        newLine = `    ${key}: ${Array.isArray(value) ? getDiffResult1(value) : value}`;
        break;
      }
      default: throw new Error('wrong status value');
    }
    return newLine;
  });
  const result1 = ['{', ...result, '}'].join('\n');
  return result1;
};

const firsrtFileInfo = getData('__fixtures__/file1.json');
const secondFileInfo = getData('__fixtures__/file2.json');
const firstFile = getParsedData(firsrtFileInfo, getFilePathExtension('__fixtures__/file1.json'));
const secondFile = getParsedData(secondFileInfo, getFilePathExtension('__fixtures__/file2.json'));
const result = getDiffList(firstFile, secondFile);
// console.log(JSON.stringify(result, null, "   "));
// console.log(JSON.stringify(firstFile, null, "   "));
// console.log(firstFile);
// fs.writeFileSync('result1.js', firstFile, 'utf-8');

console.log(getDiffResult1(result));
// fs.writeFileSync('resultDiff.js', JSON.stringify(result, null, "    "), 'utf-8');
// console.log(result);
// const result1 = getDiffResult1(result);
// console.log(JSON.stringify(result1, null, "      "));

    // let currentValue;
    // if (_.isObject(value)) {
    //   const [keyValue] = Object.keys(value);
    //   currentValue = `{\n ${keyValue}: ${value[keyValue]} \n }`;
    // } else {
    //   currentValue = value;
    // }
    // let oldValue1;
    // if (_.isObject(oldValue)) {
    //   const [keyValue1] = Object.keys(oldValue);
    //   oldValue1 = `{\n ${keyValue1}: ${oldValue[keyValue1]} \n }`;
    // } else {
    //   oldValue1 = oldValue;
    // }