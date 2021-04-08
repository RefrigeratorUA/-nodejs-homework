import * as fs from 'fs/promises'
import { isAccessible } from '../utils/accessible.js'
import { handleError } from '../utils/handleerror.js'
import { extname, join } from 'path'

class SortFiles {
  constructor(dist) {
    this.dist = dist
  }

  async #copyFile(file) {
    const folder = extname(file.path)
    const targetDir = join(this.dist, folder)
    try {
      if (!(await isAccessible(targetDir))) {
        await fs.mkdir(targetDir)
      }
      await fs.copyFile(file.path, join(targetDir, file.name))
    } catch (error) {
      handleError(error)
    }
  }

  async readFolder(srcDir) {
    const items = await fs.readdir(srcDir)
    for (const item of items) {
      const localItem = join(srcDir, item)
      const localItemType = await fs.stat(localItem)
      if (localItemType.isDirectory()) {
        await this.readFolder(localItem)
      } else {
        await this.#copyFile({ name: item, path: localItem })
      }
    }
  }
}

export default SortFiles
