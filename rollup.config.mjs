import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';
import { styleWriter } from './style-writer.mjs';
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
const STYLES_ROOT = 'styles/';

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
    output: (styles, styleNodes) => {
      // NOTE: "true": main.js で import したファイルすべてを結合して出力ディレクトリの CSS ルートに出力
      // NOTE: "false": main.js で import したファイル毎に出力ディレクトリに出力。
      styleWriter(
        true,
        styles,
        styleNodes,
        SOURCE_DIR + STYLES_ROOT,
        OUTPUT_DIR,
        CSS_ROOT
      );
    },
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
        console.info(`Server listening at ${protocol}://${host}:${address.port}/`);
      },
    }),
  ]);

  if (! fs.existsSync(TMP_DIST_DIR)) {
    fs.mkdirSync(TMP_DIST_DIR, { recursive: true });
  }

  if (! fs.existsSync(path.dirname(path.resolve(TMP_DIST_DIR + ASSETS_ROOT)))) {
    fs.mkdirSync(path.dirname(path.resolve(TMP_DIST_DIR + ASSETS_ROOT)), { recursive: true });
  }

  if (! fs.existsSync(TMP_DIST_DIR + ASSETS_ROOT)) {
    fs.symlinkSync(path.resolve(DIST_DIR + ASSETS_ROOT), path.resolve(TMP_DIST_DIR + ASSETS_ROOT), 'dir');
  }
}

export default [
  {
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
  },
  {
    input: 'main-another.js',
    context: 'window',
    output: [
      {
        file: OUTPUT_DIR + JS_ROOT + 'main-another.js',
        format: 'esm',
      },
    ],
  }
];
