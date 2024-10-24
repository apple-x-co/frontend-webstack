// jsの品質を保つためのルールを設定するファイルです。
export default [
  {
    files: ["main.js", "src/modules/**/*.js"],
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error"
    }
  }
];
