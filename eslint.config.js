module.exports = [
  {
    ignores: ['node_modules/', 'coverage/']
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fs: 'readonly',
        path: 'readonly',
        EventEmitter: 'readonly',
        Date: 'readonly',
        Promise: 'readonly',
        JSON: 'readonly',
        Object: 'readonly',
        Array: 'readonly',
        Map: 'readonly',
        Set: 'readonly'
      }
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'no-multiple-empty-lines': ['error', { maxEOF: 1, max: 1 }]
    }
  }
];