// тут функция для сравнения файлов
import {
  getData,
  getParsedData,
  getFilePathExtension,
  getDiffList,
  getDiffResult,
} from './functions.js';

const genDiff = (filePath1, filePath2) => {
  const firsrtFileInfo = getData(filePath1);
  const secondFileInfo = getData(filePath2);
  const firstFile = getParsedData(firsrtFileInfo, getFilePathExtension(filePath1));
  const secondFile = getParsedData(secondFileInfo, getFilePathExtension(filePath2));
  const diffFile = getDiffList(firstFile, secondFile);
  const result = getDiffResult(diffFile);
  return result;
};
export default genDiff;
