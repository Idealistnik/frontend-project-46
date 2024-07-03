import yaml from 'js-yaml';

const map = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};
const getParsedData = (data, fileExtension) => map[`${fileExtension}`](data);
export default getParsedData;
