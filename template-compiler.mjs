import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { templateContexts } from './template-contexts.mjs';

function templateCompiler (
  /** @type {Object} */ envVars,
  /** @type {Object} */ globalVars,
  /** @type {string} */ templateDir, // NOTE: "src/templates/"
  /** @type {string} */ distDir, // NOTE: "dist/" OR ".watch/"
  /** @type {string} */ assetRoot, // NOTE: "assets/"
  /** @type {string} */ cssRoot, // NOTE: "css/"
  /** @type {string} */ jsRoot, // NOTE: "js/"
  /** @type {string} */ ejsPath, // NOTE: "src/templates/index.ejs"
) {
  const template = fs.readFileSync(ejsPath, { encoding: 'utf-8' });
  const compiler = ejs.compile(template, { filename: ejsPath, root: templateDir });

  const distPath = distDir + path.relative(templateDir, ejsPath).replaceAll('.ejs', '.html');
  if (! fs.existsSync(path.dirname(distPath))) {
    fs.mkdirSync(path.dirname(distPath), { recursive: true });
  }

  const assetDir = distDir + assetRoot;
  const cssDir = distDir + cssRoot;
  const jsDir = distDir + jsRoot;

  if (ejsPath in templateContexts && 'pages' in templateContexts[ejsPath]) {
    const pages = templateContexts[ejsPath].pages;
    pages.forEach(page => {
      const pagePath = distPath.replace(path.basename(distPath), page.slug);
      fs.writeFileSync(
        pagePath,
        compiler({
          meta: {
            env: envVars,
            global: globalVars,
            page: page.data,
            path: {
              current: path.relative(distDir, pagePath),
              relative: {
                asset: path.relative(path.dirname(pagePath), assetDir),
                css: path.relative(path.dirname(pagePath), cssDir),
                js: path.relative(path.dirname(pagePath), jsDir),
              },
            },
          },
        }),
      );
      info('created ' + pagePath);
    });

    return;
  }

  fs.writeFileSync(distPath, compiler({
    meta: {
      env: envVars,
      global: globalVars,
      page: ejsPath in templateContexts && 'data' in templateContexts[ejsPath] ? templateContexts[ejsPath].data : null,
      path: {
        current: path.relative(distDir, distPath),
        relative: {
          asset: path.relative(path.dirname(distPath), assetDir),
          css: path.relative(path.dirname(distPath), cssDir),
          js: path.relative(path.dirname(distPath), jsDir),
        },
      },
    },
  }));
  info('created ' + distPath);
}

function info (/** @type {string} */ message) {
  const magenta = '\u001b[36m';
  const bold = '\u001b[1m';
  const reset = '\u001b[0m';
  console.info(magenta + bold + message + reset);
}

export {
  templateCompiler,
};
