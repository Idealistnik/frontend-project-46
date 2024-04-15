import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormat = (data, formatName) => {
  switch (formatName) {
    case ('stylish'): return stylish(data);
    case ('plain'): return plain(data);
    case ('json'): return json(data);
    default: throw new Error('wrong formatName');
  }
};
export default getFormat;
