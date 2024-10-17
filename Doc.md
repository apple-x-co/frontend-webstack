# Document

## Launch Environment

| 名前          | 用途            | デフォルト       | 例                        |
|-------------|---------------|-------------|--------------------------|
| `ENV`       | 環境変数          |             | `local`, `stage`, `prod` |
| `HOST`      | ローカルサーバーのホスト名 | `localhost` | `127.0.0.1`              |
| `PORT`      | ローカルサーバーのポート  | `3000`      | `8000`                   |
| `OPEN_PAGE` | ローカルで開くページ    | `/`         | `/dashboard`             |

## Directory & Files

### Directory structure

| ディレクトリ                    | 用途                      | 定数             |
|---------------------------|-------------------------|----------------|
| `dist/`                   | ビルド後のファイル               | `DIST_DIR`     |
| `dist/assets/`            | 静的ファイル（画像,PDF,SVG）を格納   | `ASSETS_ROOT`  |
| `dist/css/`               | CSS ファイル                | `CSS_ROOT`     |
| `dist/js/`                | JavaScript ファイル         | `JS_ROOT`      |
| `.watch/`                 | 監視モードで起動したときの一時ファイル     | `TMP_DIST_DIR` |
| `src/`                    | ソースファイル                 |                |
| `src/modules/`            | JavaScript モジュール（ライブラリ） |                |
| `src/styes/`              | SCSS ファイル               |                |
| `src/templates/`          | EJS ファイル                |                |
| `src/templates/includes/` | EJS インクルードファイル          |                |

### Variable files

| ファイル                    | 用途            |
|-------------------------|---------------|
| `env.[ENV_NAME].mjs`    | 環境変数定義        |
| `template-contexts.mjs` | EJS のテンプレート変数 |
| `template-global.mjs`   | EJS のグローバル変数  |

### Danger files

| ファイル                    | 用途         |
|-------------------------|------------|
| `rollup.config.mjs`     | Rollup の定義 |
| `template-compiler.mjs` | EJS のコンパイル |

## EJS

### Built-in Variables

| 名前                         | 用途       |
|----------------------------|----------|
| `meta.env.xxx`             | 環境変数     |
| `meta.global.xxx`          | グローバル変数  |
| `meta.page.xxx`            | テンプレート変数 |

### Helper

| 名前                          | 用途                                |
|-----------------------------|-----------------------------------|
| `helper.asset(path)`        | アセットファイルへのパス作成 ※ `/` から始める        |
| `helper.css(path)`          | CSS ファイルへのパス作成 ※ `/` から始める        |
| `helper.js(path)`           | JavaScript ファイルへのパス作成 ※ `/` から始める |
| `helper.absoluteLink(path)` | 絶対パスのリンクのパス作成 ※ `/` から始める         |
