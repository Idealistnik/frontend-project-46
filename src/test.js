// Тут исполняемый файл с коммандером
import { program } from 'commander';
import { getObjectFromPath } from './index.js';
import fs from 'fs';
import path from 'path';
import { getAbsolutePath, readFile} from './functions.js';
import _ from 'lodash';


const obj5 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const obj6 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
const result = _.union(_.keys(obj5), _.keys(obj6))
console.log(result);


// const func = (filePath) => {
//   const result = readFile(getAbsolutePath(filePath));
// }

// program
//   .name('gendiff')
//   .description('Compares two configuration files and shows a difference.')
//   .version('1.0.0')
//   .argument('<filepath1>')
//   // .argument('<filepath2>')
//   // .option('-f, --format <type>', 'output format')
//   .helpOption('-h, --help', 'output more information')
//   .action((filepath1) => {
//     const result = func(filepath1);
//     console.log(result);
//   });


// // const a = process.cwd();
// // const b = path.resolve(process.cwd(), '../src/fixtures/file1.js');
// // console.log(a);
// // console.log(b);


// program.parse(); // этой командой считывается инфа передаваемая через командную строку (по идее работа с process.argv)

// // export default func;