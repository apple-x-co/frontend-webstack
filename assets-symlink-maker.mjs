import fs from 'fs';
import path from 'path';

function assetsSymlinkMaker(
  /** @type {string} */ tmpDir, // NOTE: ".watch/"
  /** @type {string} */ distDir, // NOTE: "dist/"
  /** @type {string} */ assetDirName // NOTE: "assets"
) {
  const tmpPath = path.resolve(tmpDir);
  if (! fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }

  fs.readdirSync(path.resolve(distDir), {}).forEach(dirName => {
    const distPath = path.resolve(path.join(distDir, dirName));

    if (dirName !== assetDirName) {
      if (! fs.statSync(distPath).isDirectory()) {
        return;
      }

      fs.readdirSync(distPath, {}).forEach(_dirName => {
        const _distPath = path.resolve(path.join(distDir, dirName, _dirName));
        if (_dirName !== assetDirName) {
          return;
        }

        const tempPath = path.join(tmpPath, dirName, _dirName);
        if (fs.existsSync(tempPath)) {
          return;
        }

        if (! fs.existsSync(path.join(tmpPath, dirName))) {
          fs.mkdirSync(path.join(tmpPath, dirName), { recursive: true });
        }

        fs.symlinkSync(_distPath, tempPath, 'dir');
      });

      return;
    }

    const tempPath = path.join(tmpPath, dirName);
    if (fs.existsSync(tempPath)) {
      return;
    }

    fs.symlinkSync(distPath, tempPath, 'dir');
  });
}

export {
  assetsSymlinkMaker
}
