# Frontend web stack

## Get started

**minimum**

```bash
npm install ejs glob rollup
npm install rollup-plugin-sass rollup-plugin-serve
# npm install eslint --save-dev

node -v > .node-version

mkdir -p dist/{assets,css,js}
mkdir -p src/{modules,styles,template/includes}
touch src/modules/index.js
touch src/styles/main.scss
touch src/templates/index.ejs
touch src/templates/_header.ejs

cp -ap THIS_PROJECT/.gitignore .
cp -ap THIS_PROJECT/main.js .
cp -ap THIS_PROJECT/rollup.config.mjs .
cp -ap THIS_PROJECT/template-compiler.mjs .
cp -ap THIS_PROJECT/template-contexts.mjs .
cp -ap THIS_PROJECT/template-global.mjs .
# cp -ap THIS_PROJECT/env.prod.mjs .
# cp -ap THIS_PROJECT/eslint.config.mjs .
```

### Environment

| 名前          | 用途            | デフォルト       | 例                        |
|-------------|---------------|-------------|--------------------------|
| `ENV`       | 環境変数          |             | `local`, `stage`, `prod` |
| `HOST`      | ローカルサーバーのホスト名 | `localhost` | `127.0.0.1`              |
| `PORT`      | ローカルサーバーのポート  | `3000`      | `8000`                   |
| `OPEN_PAGE` | ローカルで開くページ    | `/`         | `/homepage`              |

### Directory structure

| ディレクトリ                             | 用途                      | 定数             |
|------------------------------------|-------------------------|----------------|
| `dist/`                            | ビルド後のファイル               | `DIST_DIR`     |
| `dist/assets/`                     | 静的ファイル（画像,PDF,SVG）を格納   | `ASSETS_ROOT`  |
| `dist/css/style.css`               | SCSS ビルド後の CSS ファイル     | `CSS_ROOT`     |
| `dist/js/index.js`                 | ビルド後の JavaScript ファイル   | `JS_ROOT`      |
| `node_modules/.frontend-webstack/` | 監視モードで起動したときの一時ファイル     | `TMP_DIST_DIR` |
| `src/`                             | ソースファイル                 |                |
| `src/modules/`                     | JavaScript モジュール（ライブラリ） |                |
| `src/styes/`                       | SCSS ファイル               |                |
| `src/templates/`                   | EJS ファイル                |                |
| `src/templates/includes/`          | EJS インクルードファイル          |                |

### Files

| ファイル                    | 用途            |
|-------------------------|---------------|
| `env.[ENV_NAME].mjs`    | 環境変数定義        |
| `main.js`               | エントリーポイント     |
| `template-contexts.mjs` | EJS のテンプレート変数 |
| `template-global.mjs`   | EJS のグローバル変数  |

### Danger files

| ファイル                    | 用途         |
|-------------------------|------------|
| `rollup.config.mjs`     | Rollup の定義 |
| `template-compiler.mjs` | EJS のコンパイル |

## How to build

```bash
npm run build
# rollup --config
```

## How to build with ENV

```bash
touch env.xxx.mjs
ENV=xxx rollup --config
```

`env.xxx.mjs`
```:js
const vars = {
  someKey: 'SomeValue',
};

export {
  vars,
}
```

`some.ejs`
```ejs
<%= envVars.someKey %>
```

## How to development

```bash
npm run watch
# rollup --config --watch
```

※ `dist/` に出力は行いません。
