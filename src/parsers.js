import yaml from 'js-yaml';

const getParsedData = (data, fileExtension) => {
  switch (fileExtension) {
    case ('.json'): return JSON.parse(data);
    case ('.yml'): case ('.yaml'): return yaml.load(data);
    default: throw new Error('wrong extension');
  }
};
export default getParsedData;
