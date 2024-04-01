#!/usr/bin/env node

// Тут исполняемый файл с коммандером
import { program } from 'commander';
import { getObjectFromPath, genDiff, getResult } from './index.js';


// const func = () => getObjectFromPath(filePath);

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output more information')
  .action((filepath1, filepath2) => {
    const result = getResult((genDiff(getObjectFromPath(filepath1), getObjectFromPath(filepath2))));
    console.log(result);
  });

program.parse(); // этой командой считывается инфа передаваемая через командную строку (по идее работа с process.argv)

// export default func;