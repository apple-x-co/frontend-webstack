import path from 'path';
import fs from 'fs';

function styleWriter (
  /** @type {boolean} */ bundled,
  /** @type {string} */ styles,
  /** @type {Object[]} */ styleNodes,
  /** @type {string} */ stylesDir, // NOTE: "src/styles/"
  /** @type {string} */ distDir, // NOTE: "dist/" OR ".watch/"
  /** @type {string} */ cssRoot, // NOTE: "css/"
) {
  if (bundled) {
    const cssPath = path.resolve(path.join(distDir, cssRoot, 'style.css'));
    if (! fs.existsSync(path.dirname(cssPath))) {
      fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    }

    fs.writeFileSync(cssPath, styles);
    console.info('created ' + cssPath);

    return;
  }

  styleNodes.forEach(styleNode => {
    const dirName = path.dirname(path.relative(path.resolve(stylesDir), styleNode['id']));
    const cssPath = path.resolve(path.join(distDir, dirName, cssRoot, 'style.css'));
    if (! fs.existsSync(path.dirname(cssPath))) {
      fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    }

    fs.writeFileSync(cssPath, styleNode['content']);
    console.info('created ' + cssPath);
  });
}

export {
  styleWriter
}
