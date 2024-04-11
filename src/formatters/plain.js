import _ from 'lodash';

const valueType = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof (data) === 'string' ? `'${data}'` : data;
};

const plain = (arr) => {
  const iter = (node, str) => {
    const newArr = node.filter(({ status }) => status !== 'unchanged');
    const sorted = _.sortBy(newArr, ['key']);
    const lines = sorted.map((property) => {
      const {
        key, value, status, oldValue,
      } = property;
      switch (status) {
        case 'added': {
          return `Property '${str}${key}' was added with value: ${valueType(value)}`;
        }
        case 'deleted': {
          return `Property '${str}${key}' was removed`;
        }
        case 'changed': {
          return `Property '${str}${key}' was updated. From ${valueType(oldValue)} to ${valueType(value)}`;
        }
        case 'nested': {
          return iter(value, `${str}${key}.`);
        }
        default: throw new Error('wrong status value');
      }
    });
    const result2 = lines.join('\n');
    return result2;
  };
  return iter(arr, '');
};
export default plain;
