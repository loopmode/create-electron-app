module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],

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
        'react/prop-types': 'off',
        'react/no-children-prop': 'off',

        // allow spreading out properties from an object without warnings
        'no-unused-vars': [1, { ignoreRestSiblings: true }],

        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off'
    }
};
