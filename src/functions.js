// тут все мелкие фукнции
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export const getFilePathExtension = (filePath) => path.extname(filePath);
export const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
export const readFile = (absolutePath) => fs.readFileSync(absolutePath, 'utf-8');

export const getData = (filePath) => {
  const fileAbsolutePath = getAbsolutePath(filePath);
  return readFile(fileAbsolutePath);
};

export const getDiffList = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const result = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      const newAcc = { key, status: 'added', value: data2[key] };
      return [...acc, newAcc];
    }
    if (!_.has(data2, key)) {
      const newAcc = { key, status: 'deleted', value: data1[key] };
      return [...acc, newAcc];
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const newAcc = {
        key, status: 'nested', value: getDiffList(data1[key], data2[key]),
      };
      return [...acc, newAcc];
    }
    if (data1[key] !== data2[key]) {
      const newAcc = {
        key, status: 'changed', oldValue: data1[key], value: data2[key],
      };
      return [...acc, newAcc];
    }
    const newAcc = { key, status: 'unchanged', value: data1[key] };
    return [...acc, newAcc];
  }, []);
  return result;
};
