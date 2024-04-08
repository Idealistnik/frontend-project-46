import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getDiffList, getIndent, getValue, getDiffResult, getData, getFilePathExtension } from './src/functions.js';
import getParsedData from './src/parsers.js';


const firsrtFileInfo = getData('__fixtures__/file1.json');
const secondFileInfo = getData('__fixtures__/file2.json');
const firstFile = getParsedData(firsrtFileInfo, getFilePathExtension('__fixtures__/file1.json'));
const secondFile = getParsedData(secondFileInfo, getFilePathExtension('__fixtures__/file2.json'));
const result = getDiffList(firstFile, secondFile);
// console.log(JSON.stringify(result, null, "   "));
// console.log(JSON.stringify(firstFile, null, "   "));
// console.log(firstFile);
// fs.writeFileSync('result1.js', firstFile, 'utf-8');

// console.log(getDiffResult1(result));
fs.writeFileSync('resultDiff.js', JSON.stringify(result, null, "    "), 'utf-8');
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

// export const getDiffResult = (arr) => {
//   const sorted = _.sortBy(arr, ['key']);
//   const result = sorted.map(({
//     key, value, status, oldValue,
//   }) => {
//     let newLine;
//     switch (status) {
//       case 'added': {
//         newLine = `  + ${key}: ${value}`;
//         break;
//       }
//       case 'deleted': {
//         newLine = `  - ${key}: ${value}`;
//         break;
//       }
//       case 'changed': {
//         newLine = `  - ${key}: ${oldValue}\n  + ${key}: ${value}`;
//         break;
//       }
//       case 'unchanged': {
//         newLine = `    ${key}: ${value}`;
//         break;
//       }
//       default: throw new Error('wrong status value');
//     }
//     return newLine;
//   });
//   const result1 = ['{', ...result, '}'].join('\n');
//   return result1;
// };
