// тут функция для сравнения файлов
import {
  getInfoFromFile,
  getParsedFile,
  getFilePathExtension,
  getDiffObject,
  getResult,
} from './functions.js';

const genDiff = (filePath1, filePath2) => {
  const firsrtFileInfo = getInfoFromFile(filePath1);
  const secondFileInfo = getInfoFromFile(filePath2);
  const firstFile = getParsedFile(firsrtFileInfo, getFilePathExtension(filePath1));
  const secondFile = getParsedFile(secondFileInfo, getFilePathExtension(filePath2));
  const diffFile = getDiffObject(firstFile, secondFile);
  const result = getResult(diffFile);
  return result;
};
export default genDiff;
