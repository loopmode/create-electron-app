module.exports = {
 
  extends: ['eslint:recommended', 'plugin:react/recommended'],

  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // allow anonymous component functions
    'react/display-name': 0,
    // allow spreading out properties from an object without warnings
    'no-unused-vars': [1, { ignoreRestSiblings: true }]
  }
}