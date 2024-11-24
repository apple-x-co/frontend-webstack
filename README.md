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
cp -ap THIS_PROJECT/assets-symlink-maker.mjs .
cp -ap THIS_PROJECT/main.js .
cp -ap THIS_PROJECT/rollup.config.mjs .
cp -ap THIS_PROJECT/style-writer.mjs .
cp -ap THIS_PROJECT/template-compiler.mjs .
cp -ap THIS_PROJECT/template-contexts.mjs .
cp -ap THIS_PROJECT/template-global.mjs .
# cp -ap THIS_PROJECT/env.prod.mjs .
# cp -ap THIS_PROJECT/eslint.config.mjs .
```

[Go document](Doc.md)

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
<%= meta.env.someKey %>
```

## How to development

```bash
npm run watch
# rollup --config --watch
```

※ `dist/` に出力は行いません。
