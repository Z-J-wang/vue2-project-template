module.exports = {
  root: true,

  env: {
    node: true
  },

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
    'vue/name-property-casing': ['error', 'PascalCase'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-spaced-func': 2,
    'no-const-assign': 2,
    'no-alert': 0,
    'space-before-function-paren': [0, 'always'],
    'no-useless-escape': 0,
    quotes: [1, 'single'],
    semi: [2, 'never']
  },

  extends: ['plugin:vue/essential', 'eslint:recommended'],

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
