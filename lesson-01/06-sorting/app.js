import * as fs from 'fs/promises';
import { isAccessible } from './utils/accessible.js';
import { handleError } from './utils/handle-error.js';
import program from './utils/commander.js';
import SortFiles from './module/sort.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program.parse(process.argv);

if (!(await isAccessible(program.output))) {
  await fs.mkdir(program.output);
}

try {
  const sorting = new SortFiles(program.output);
  await sorting.readFolder(resolve(__dirname, program.folder));
} catch (e) {
  handleError(e);
}

console.log('Can delete source folder.');
