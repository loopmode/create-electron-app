module.exports = {
 
  extends: ['eslint:recommended'<%if (react) { %>, 'plugin:react/recommended'<% } %>],

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
  },<%if (react) { %>
  settings: {
    react: {
      version: 'detect'
    }
  },<% } %>
  rules: {<%if (react) { %>
    // allow anonymous component functions
    'react/display-name': 0,<% } %>
    // allow spreading out properties from an object without warnings
    'no-unused-vars': [1, { ignoreRestSiblings: true }]
  }
}