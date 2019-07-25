module.exports = {
  root: true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": "off",
    quotes: [0, "double", { avoidEscape: true }],
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "space-before-function-paren": [0, "ignore"], //函数定义时括号前面要不要有空格
    "no-extra-semi": 1, //禁止多余的冒号
    semi: [0, "always"], //语句强制分号结尾
    "eol-last": [0, "always"], //代码间间隔出现一行
    "spaced-comment": 0, //注释风格要不要有空格什么的
    indent: [0, 4], //缩进风格
    "padded-blocks": 0, //块语句内行首行尾是否要空行
    yoda: [0, "never"], //禁止尤达条件
    "no-multi-spaces": 0, //允许用多余的空格
    "no-trailing-spaces": 0, //一行结束后面不要有空格
    "no-multiple-empty-lines": [0, { max: 2 }] //空行最多不能超过2行
  }
};
