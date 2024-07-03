import yaml from 'js-yaml';

const map = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
  yaml: (data) => yaml.load(data),
};
const getParsedData = (data, fileExtension) => map[fileExtension](data);
export default getParsedData;
