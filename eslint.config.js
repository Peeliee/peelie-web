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
      // import React 강제 안함
      'react/react-in-jsx-scope': 'off',
      // tsx 확장
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
      'react/function-component-definition': 'off',
      // import 할 때 확장자 강제x
      'import/extensions': 'off',
      // Vite 자산 import 절대경로 허용
      'import/no-absolute-path': 'off',
      // 블록 형태 유지 (불필요한 줄괄호 에러처리 x)
      'arrow-body-style': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          packageDir: __dirname,
        },
      ],
      // import 정렬 오버라이드
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // fs, path 등
            'external', // react, react-router-dom 등
            'internal', // @/ 경로 alias
            'parent', // ../
            'sibling', // ./foo
            'index', // ./index
          ],
          pathGroups: [
            {
              pattern: '@/**', // alias 패턴
              group: 'internal', // internal 그룹으로 분류
              position: 'after', // external 뒤에 위치
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'], // builtin은 pathGroups 적용 제외
          'newlines-between': 'never', // 그룹 간 줄바꿈 강제 안 함
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
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
