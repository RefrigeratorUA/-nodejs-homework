import * as fs from 'fs/promises'
import { isAccessible } from './utils/accessible.mjs'
import program from './utils/commander.mjs'
import { handleError } from './utils/handleerror.mjs'
import SortFiles from './module/sort.mjs'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

program.parse(process.argv)

if (!(await isAccessible(program.output))) {
  await fs.mkdir(program.output)
}
try {
  const sorting = new SortFiles(program.output)
  await sorting.readFolder(resolve(__dirname, program.folder))
} catch (error) {
  handleError(error)
}

console.log('тут можем удалять исходную папку')
