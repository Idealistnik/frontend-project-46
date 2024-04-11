// тут функция для сравнения файлов
import {
  getData,
  getFilePathExtension,
  getDiffList,
} from './functions.js';
import getFormat from './formatters/index.js';
import getParsedData from './parsers.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const firsrtFileInfo = getData(filePath1);
  const secondFileInfo = getData(filePath2);
  const firstFile = getParsedData(firsrtFileInfo, getFilePathExtension(filePath1));
  const secondFile = getParsedData(secondFileInfo, getFilePathExtension(filePath2));
  const diffFile = getDiffList(firstFile, secondFile);
  const diff = getFormat(diffFile, formatName);
  return diff;
};

export default genDiff;
