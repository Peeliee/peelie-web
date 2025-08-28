import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 글로벌 ignore
  { ignores: ['dist', 'node_modules'] },

  // 에어비앤비
  ...compat.extends('airbnb'),

  // TS 프로젝트 인식 + 경로 alias 해석 + 글로벌 환경만 지정 (규칙 추가 없음)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { project: ['./tsconfig.app.json'] },
        node: { extensions: ['.js', '.ts', '.jsx', '.tsx'] },
      },
      react: { version: 'detect' },
    },
    rules: {
      // React 17+ / 19
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'react/function-component-definition': 'off',
      // Vite 자산 import 절대경로 허용
      'import/no-absolute-path': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          packageDir: __dirname,
        },
      ],
    },
  },

  // 선택: Vite HMR 규칙(원래 쓰던 거면 유지)
  reactRefresh.configs.vite,

  {
    files: ['vite.config.{ts,js}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'].filter(Boolean),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: { ...globals.node },
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.ts'] },
        typescript: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'].filter(Boolean),
        },
      },
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },

  // eslint 설정 파일엔 lint 규칙 미적용
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'off',
    },
  },
  ...compat.extends('prettier'),
];
