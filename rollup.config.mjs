import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';
import { templateCompiler } from './template-compiler.mjs';
import { globalVars } from './template-global.mjs';

// For "Dist"
const DIST_DIR = 'dist/';
const TMP_DIST_DIR = '.watch/';
const OUTPUT_DIR = process.env.ROLLUP_WATCH ? TMP_DIST_DIR : DIST_DIR;

const ASSETS_ROOT = 'assets/';
const CSS_ROOT = 'css/';
const JS_ROOT = 'js/';

// For "Source"
const SOURCE_DIR = 'src/';
const TEMPLATE_ROOT = 'templates/';
const TEMPLATE_INCLUDE_ROOT = 'includes/';

const plugins = [
  {
    name: 'ejs-compiler',
    version: '1.0.0',
    buildStart: async function () {
      let envVars = {};
      if (process.env.ENV !== undefined) {
        const { vars } = await import('./env.' + process.env.ENV + '.mjs');
        envVars = vars;
      }

      const templateDir = SOURCE_DIR + TEMPLATE_ROOT;

      const ejsPaths = glob.sync(templateDir + '**/*.ejs', {
        // ignore: templateDir + 'includes/**/*.ejs',
      });
      ejsPaths.forEach((ejsPath) => {
        if (! ejsPath.includes(templateDir + TEMPLATE_INCLUDE_ROOT)) {
          templateCompiler(envVars, globalVars, templateDir, OUTPUT_DIR, ASSETS_ROOT, CSS_ROOT, JS_ROOT, ejsPath);
        }

        if (process.env.ROLLUP_WATCH) {
          this.addWatchFile(path.resolve('./', ejsPath));
        }
      });
    },
  },
  sass({
    output: OUTPUT_DIR + CSS_ROOT + 'style.css',
    options: {
      outputStyle: 'compressed',
      silenceDeprecations: ['legacy-js-api'],
    },
  }),
];

let watchOptions = false;

if (process.env.ROLLUP_WATCH) {
  watchOptions = {
    // buildDelay: 0,
    chokidar: { usePolling: true },
    clearScreen: false,
    exclude: 'node_modules/**',
    include: SOURCE_DIR + '**/*.*',
    // skipWrite: false,
  };

  plugins.push([
    serve({
      open: true,
      contentBase: OUTPUT_DIR,
      host: process.env.HOST ?? 'localhost',
      port: process.env.PORT ?? 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
      },
      openPage: process.env.OPEN_PAGE ?? '/',
      onListening: function (server) {
        const address = server.address();
        const host = address.address === '::' ? 'localhost' : address.address;
        // by using a bound function, we can access options as `this`
        const protocol = this.https ? 'https' : 'http';
        console.log(`Server listening at ${protocol}://${host}:${address.port}/`);
      },
    }),
  ]);

  if (! fs.existsSync(TMP_DIST_DIR)) {
    fs.mkdirSync(TMP_DIST_DIR, { recursive: true });
    fs.symlinkSync(path.resolve(DIST_DIR + ASSETS_ROOT), path.resolve(TMP_DIST_DIR + ASSETS_ROOT), 'dir');
  }

  if (! fs.existsSync(TMP_DIST_DIR + ASSETS_ROOT)) {
    fs.symlinkSync(path.resolve(DIST_DIR + ASSETS_ROOT), path.resolve(TMP_DIST_DIR + ASSETS_ROOT), 'dir');
  }
}

export default {
  input: 'main.js',
  context: 'window',
  output: [
    {
      file: OUTPUT_DIR + JS_ROOT + 'index.js',
      format: 'esm',
    },
  ],
  watch: watchOptions,
  plugins: plugins,
};
