import tseslint from 'typescript-eslint';

import noLongClassname from '../../eslint-rules/no-long-classname.js';

const classNamePlugin = {
  rules: {
    'no-long-classname': noLongClassname,
  },
};

export default [
  {
    files: ['**/*.{ts,tsx,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: { classname: classNamePlugin },
    rules: {
      'classname/no-long-classname': [
        'warn',
        { maxClasses: 9, cnImportPath: '@/shared/lib/utils' },
      ],
    },
  },
];
