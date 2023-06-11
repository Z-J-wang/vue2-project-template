module.exports = {
  root: true,

  env: {
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  // 全局变量。详见https://zh-hans.eslint.org/docs/latest/use/configure/language-options#-6
  globals: {
    // $: 'readonly'
  },

  // eslint 规则扩展
  extends: [
    'eslint:recommended', // 启用ESLint内置的推荐规则
    'plugin:vue/essential', // 启用eslint-plugin-vue插件中的essential规则
    'plugin:prettier/recommended' // 启用eslint-plugin-prettier插件中的recommended规则
  ],

  // 配置插件，由插件名称组成的列表。可以省略插件名称中的 eslint-plugin- 前缀。
  plugins: [
    'vue' // 等价于eslint-plugin-vue，用于检测.vue文件种的`<template>`和<script>`以及.js文件种的Vue代码
  ],

  // 自定义规则，详见：https://zh-hans.eslint.org/docs/latest/use/configure/rules
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-spaced-func': 'error',
    'no-const-assign': 'error',
    'no-alert': 'off',
    'no-useless-escape': 'off',
    'no-control-regex': 'off',
    'space-before-function-paren': ['off', 'always']
  },

  // eslint配置重写，用于为特定文件设置eslint
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
