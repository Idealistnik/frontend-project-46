#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';


// const func = (genDiff) => (filepath1, filepath2) => genDiff(filepath1, filepath2);

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output more information')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
   console.log(result);
  });

program.parse(); // этой командой считывается инфа передаваемая через командную строку (по идее работа с process.argv)

export default program;