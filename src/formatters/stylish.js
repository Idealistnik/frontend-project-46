import _ from 'lodash';

export const getIndent = (depth = 1) => {
  const spacer = ' ';
  const spacerCount = 4;
  const indentBeforeKey = 2;
  return spacer.repeat(depth * spacerCount - indentBeforeKey);
};

export const getValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getIndent(depth + 0.5)}${key}: ${getValue(value, depth + 1)}`);
  return ['{', ...lines, `${getIndent(depth - 0.5)}}`].join('\n');
};

const stylish = (arr) => {
  const iter = (arr1, depth = 1) => {
    const sorted = _.sortBy(arr1, ['key']);
    const lines = sorted.map(({
      key, value, status, oldValue,
    }) => {
      switch (status) {
        case 'added': {
          return `${getIndent(depth)}+ ${key}: ${getValue(value, depth + 1)}`;
        }
        case 'deleted': {
          return `${getIndent(depth)}- ${key}: ${getValue(value, depth + 1)}`;
        }
        case 'changed': {
          return `${getIndent(depth)}- ${key}: ${getValue(oldValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${getValue(value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${getIndent(depth)}  ${key}: ${getValue(value, depth + 1)}`;
        }
        case 'nested': {
          return `${getIndent(depth)}  ${key}: {\n${iter(value, depth + 1)}\n${getIndent(depth)}  }`;
        }
        default: throw new Error('wrong status value');
      }
    });
    const result = lines.join('\n');
    return result;
  };
  return `{\n${iter(arr)}\n}`;
};
export default stylish;
