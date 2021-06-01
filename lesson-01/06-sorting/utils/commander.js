import commander from 'commander';
const { program } = commander;

export default program
  .version('0.0.1')
  .requiredOption('-f, --folder <type>', 'Input folder')
  .option('-o, --output [type]', 'Output folder', './dist')
  .option('-d, --delete', 'Delete source folder');
