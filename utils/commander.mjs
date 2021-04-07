import commander from 'commander'
const { program } = commander

export default program
  .requiredOption('-f, --folder <type>', 'Input folder')
  .option('-o, --output [type]', 'Output directory', './dist')
