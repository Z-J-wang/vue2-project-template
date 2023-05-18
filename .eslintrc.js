module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier'],
  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-spaced-func': 2,
    'no-const-assign': 2,
    'no-alert': 0,
    'space-before-function-paren': [0, 'always'],
    'no-useless-escape': 0,
    'no-control-regex': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [1, 'single'],
    semi: [2, 'always']
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
