// тут все мелкие фукнции
import path from 'path';
import fs from 'fs';


export const getFileExtension = (file) => file.split('.').at(-1);    //получить расширение из имени файла
export const getFilePathExtension = (filePath) => path.extname(filePath);  //получить расширение из пути файла

export const getAbsolutePath = (filePath) => path.resolve(filePath);    // process.cwd()
export const readFile = (absolutePath) => fs.readFileSync(absolutePath);
export const parseJson = (file) => JSON.parse(file);
export const parseYml = (file) => yaml.load(file);





// 1. пути 2. как с бинарником связать 3. follow: false