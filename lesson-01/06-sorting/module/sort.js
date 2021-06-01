import * as fs from 'fs/promises';
import { isAccessible } from '../utils/accessible.js';
import { handleError } from '../utils/handle-error.js';
import { extname, join } from 'path';

class SortFiles {
  constructor(dist) {
    this.dist = dist;
  }

  // #copyFile - приватный метод
  async #copyFile(file) {
    const folder = extname(file.path);
    const targetPath = join(this.dist, folder);

    try {
      if (!(await isAccessible(targetPath))) {
        await fs.mkdir(targetPath); // создается папка dist
      }

      await fs.copyFile(file.path, join(targetPath, file.name));
    } catch (e) {
      handleError(e);
    }
  }

  async readFolder(base) {
    const files = await fs.readdir(base);

    for (const item of files) {
      const localBase = join(base, item);
      const state = await fs.stat(localBase);

      if (state.isDirectory()) {
        await this.readFolder(localBase);
      } else {
        await this.#copyFile({ name: item, path: localBase });
      }
    }
  }
}

export default SortFiles;
