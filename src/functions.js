// тут все мелкие фукнции
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export const getFilePathExtension = (filePath) => path.extname(filePath);
export const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
export const readFile = (absolutePath) => fs.readFileSync(absolutePath, 'utf-8');

export const getData = (filePath) => {
  const fileAbsolutePath = getAbsolutePath(filePath);
  return readFile(fileAbsolutePath);
};

export const getDiffList = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      const newAcc = { key, status: 'added', value: data2[key] };
      return [...acc, newAcc];
    }
    if (!_.has(data2, key)) {
      const newAcc = { key, status: 'deleted', value: data1[key] };
      return [...acc, newAcc];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const newAcc = {
        key, status: 'nested', value: getDiffList(data1[key], data2[key]),
      };
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

export const getIndent = (depth = 1) => {
  const spacer = ' ';
  const spacerCount = 4;
  const indentBeforeKey = 2;
  return spacer.repeat(depth * spacerCount - indentBeforeKey);
};

// export const getValue = (data, depth) => {
//   if (!_.isObject(data)) {
//     return data;
//   }
//   const lines = Object
//     .entries(data)
//     .map(([key, value]) => `${getIndent(depth + 0.5)}${key}: ${getValue(value, depth + 1)}`);
//   return ['{', ...lines, `${getIndent(depth - 0.5)}}`].join('\n');
// };

// export const stylish = (arr) => {
//   const iter = (arr1, depth = 1) => {
//     const sorted = _.sortBy(arr1, ['key']);
//     const lines = sorted.map(({
//       key, value, status, oldValue,
//     }) => {
//       switch (status) {
//         case 'added': {
//           return `${getIndent(depth)}+ ${key}: ${getValue(value, depth + 1)}`;
//         }
//         case 'deleted': {
//           return `${getIndent(depth)}- ${key}: ${getValue(value, depth + 1)}`;
//         }
//         case 'changed': {
//           return `${getIndent(depth)}- ${key}: ${getValue(oldValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${getValue(value, depth + 1)}`;
//         }
//         case 'unchanged': {
//           return `${getIndent(depth)}  ${key}: ${getValue(value, depth + 1)}`;
//         }
//         case 'nested': {
//           return `${getIndent(depth)}  ${key}: {\n${iter(value, depth + 1)}\n${getIndent(depth)}  }`;
//         }
//         default: throw new Error('wrong status value');
//       }
//     });
//     const result = lines.join('\n');
//     return result;
//   };
//   return `{\n${iter(arr)}\n}`;
// };

// export const getValue = (data, spacer = '*', spacesCount = 4) => {
//   const iter = (node, depth) => {
//     if (!_.isObject(node)) {
//       return `${node}`;
//     }
//     const indentSize = depth * spacesCount;
//     const currentIndent = spacer.repeat(indentSize);
//     const bracketIndent = spacer.repeat(indentSize - spacesCount);
//     const lines = Object
//       .entries(node)
//       .map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);
//     return ['{', ...lines, `${bracketIndent}}`].join('\n');
//   };
//   return iter(data, 1);
// };

// export const getValue = (data, depth) => {
//   const iter = (node, depth1) => {
//     if (!_.isObject(node)) {
//       return `${node}`;
//     }
//     const lines = Object
//       .entries(node)
//       .map(([key, value]) => `${getIndent(depth)}${key}: ${iter(value, depth1 + 1)}`);
//     return ['{', ...lines, `${getIndent(depth - 1)}}`].join('\n');
//   };
//   return iter(data, 1);
// };

// export const getValue = (data, depth) => {
//   if (!_.isObject(data)) {
//     return data;
//   }
//   const lines = Object
//     .entries(data)
//     .map(([key, value]) => `${getIndent(depth + 1.5)}${key}: ${getValue(value, depth + 1)}`);
//   return ['{', ...lines, `${getIndent(depth + 0.5)}}`].join('\n');
// };

// export const stylish = (arr, depth = 1) => {
//   const sorted = _.sortBy(arr, ['key']);
//   const lines = sorted.map(({
//     key, value, status, oldValue,
//   }) => {
//     switch (status) {
//       case 'added': {
//         return `${getIndent(depth)}+ ${key}: ${getValue(value, depth)}`;
//       }
//       case 'deleted': {
//         return `${getIndent(depth)}- ${key}: ${getValue(value, depth)}`;
//       }
//       case 'changed': {
//         return `${getIndent(depth)}- ${key}: ${getValue(oldValue, depth)}\n${getIndent(depth)}+ ${key}: ${getValue(value, depth)}`;
//       }
//       case 'unchanged': {
//         return `${getIndent(depth)}  ${key}: ${getValue(value, depth)}`;
//       }
//       case 'nested': {
//         return `${getIndent(depth)}  ${key}: ${stylish(value, depth + 1)}`;
//       }
//       default: throw new Error('wrong status value');
//     }
//   });
//   const result = ['{', ...lines, `${getIndent(depth - 0.5)}}`].join('\n');
//   return result;
// };
