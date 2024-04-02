// import fs from 'fs';
// import path from 'path';
import _ from 'lodash';
// import {
//   getInfoFromFile,
//   getParsedFile,
//   getFilePathExtension,
// } from '../src/functions.js';

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

const obj5 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const obj6 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

// const diff = getDiffObject(obj5, obj6);

// console.log(diff);
// console.log(getResult(diff));

// const result = sorted.map(({ key, value, status, oldValue }) => {
//   let sign;
//   switch (status) {
//     case 'added': {
//       sign = '+';
//       break;
//     }
//     case 'deleted': {
//       sign = '-';
//       break;
//     }
//     case 'changed': {
//       sign = '+';
//       break;
//     }
//     case 'unchanged': {
//       sign = ' ';
//       break;
//     }
//     default: throw new Error('wrong status value');
//   }
//   const newLine = status === 'changed' ?
//   ` ${sign} ${key}: ${oldValue}\n - ${key}: ${value}` :
//   ` ${sign} ${key}: ${value}`;
//   return newLine;
// });

const result1 = `{  
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

console.log(result1);