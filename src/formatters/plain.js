import _ from 'lodash';

const getValueType = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof (data) === 'string' ? `'${data}'` : data;
};

const plain = (arr) => {
  const iter = (node, str) => {
    const newArr = node.filter(({ status }) => status !== 'unchanged');
    const sorted = _.sortBy(newArr, ['key']);
    const lines = sorted.map(({
      key, value, status, oldValue,
    }) => {
      switch (status) {
        case 'added': {
          return `Property '${str}${key}' was added with value: ${getValueType(value)}`;
        }
        case 'deleted': {
          return `Property '${str}${key}' was removed`;
        }
        case 'changed': {
          return `Property '${str}${key}' was updated. From ${getValueType(oldValue)} to ${getValueType(value)}`;
        }
        case 'nested': {
          return iter(value, `${str}${key}.`);
        }
        default: throw new Error('wrong status value');
      }
    });
    return lines.join('\n');
  };
  return iter(arr, '');
};
export default plain;
