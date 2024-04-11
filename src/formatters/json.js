import stylish from './stylish.js';

const json = (arr) => {
  const diffStylish = stylish(arr);
  return JSON.stringify(diffStylish);
};
export default json;
