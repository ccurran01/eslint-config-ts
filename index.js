module.exports = {
  // Typescript parser for ESLint
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    es2022: true
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    'import',
    'security',
    'unicorn'
  ],
  extends: [
    // ESLint recommended rules
    'eslint:recommended',
    // ESLint Typescript plugin recommended rules
    '@typescript-eslint/recommended',
    // Additional type-checking rules (formerly recommended-requiring-type-checking)
    '@typescript-eslint/recommended-type-checked',
    // Stylistic rules
    '@typescript-eslint/stylistic-type-checked',
    // ESLint Typescript Import plugin
    'plugin:import/typescript',
    // Security rules
    'plugin:security/recommended',
  ],
  overrides: [],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    // Stylistic rules (replacement for Airbnb style rules)
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/array-bracket-spacing': ['error', 'never'],

    // Modern JavaScript best practices (unicorn plugin)
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/filename-case': ['error', { case: 'camelCase' }],
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/throw-new-error': 'error',

    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // Allow defining functions (incl. arrow expressions) after use as per 'Stepdown Rule' best practice
    '@typescript-eslint/no-use-before-define': 'off',
    // Allow referencing unbound methods as long as they are static
    '@typescript-eslint/unbound-method': [
      'error',
      { 'ignoreStatic': true }
    ],
    // Disable prefer interface over type rule
    '@typescript-eslint/consistent-type-definitions': 'off',
    // Stops us from having to declare class methods which don't use this as static.
    'class-methods-use-this': 'off',
    // Enforces that files end with a newlines
    'eol-last': 2,
    // Allows you to use imports which can't be resolved, enabled for everything not in the ignore list.
    'import/no-unresolved': [
      2,
      { 'ignore': ['@azure/functions'] }
    ],
    // Allow named exports where there is only one module export
    'import/prefer-default-export': 'off',
    // Disable default max line length of 100
    'max-len': 'off',
    // Allow console logging for dev/test purposes
    'no-console': 'off',
    // Allow use of ++/-- operators given issues are extremely edge case
    'no-plusplus': 'off',
    // Allow reassigning parameter properties but not whole parameters
    'no-param-reassign': [
      'error',
      { 'props': false }
    ],
  },
};

// Node.js environment variant
module.exports.node = {
  ...module.exports,
  env: {
    ...module.exports.env,
    node: true,
  },
};

// Browser environment variant  
module.exports.browser = {
  ...module.exports,
  env: {
    ...module.exports.env,
    browser: true,
  },
};

// Jest testing variant
module.exports.jest = {
  ...module.exports,
  env: {
    ...module.exports.env,
    jest: true,
  },
  plugins: [
    ...module.exports.plugins,
    'jest',
  ],
  extends: [
    ...module.exports.extends,
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  overrides: [
    // @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
    {
      // Only turn the original rule off for test files.
      'files': ['tests/**', 'test/**', '**/*.test.*', '**/*.spec.*', '**/__mocks__/**'],
      'plugins': ['jest'],
      'rules': {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error'
      }
    }
  ],
  rules: {
    ...module.exports.rules,
    // @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
    'jest/require-top-level-describe': 'error',
    // @see https://github.com/jest-community/eslint-plugin-jest/blob/v25.3.0/docs/rules/no-hooks.md
    // Enable use of hooks (beforeEach/afterEach) - state is useful in most testsuites
    'jest/no-hooks': 'off',
  },
};
