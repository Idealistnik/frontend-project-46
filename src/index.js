import getDiffList, { getData, getFilePathExtension } from './functions.js';
import getFormat from './formatters/index.js';
import getParsedData from './parsers.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const firstFileInfo = getData(filePath1);
  const secondFileInfo = getData(filePath2);
  const firstFile = getParsedData(firstFileInfo, getFilePathExtension(filePath1));
  const secondFile = getParsedData(secondFileInfo, getFilePathExtension(filePath2));
  const diffFile = getDiffList(firstFile, secondFile);
  return getFormat(diffFile, formatName);
};

export default genDiff;
