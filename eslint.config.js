// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

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
  { ignores: ['dist', 'node_modules'] }, // 에어비앤비
  /**
   *  @TODO : aribnb config 너무 화나서 일단 껐습니다.........
   *  @TODO : flat config 하지말고 나중에 그냥 깃헙에서 소스 그대로 가져오는거 어떤지 고민중. 
   * 에어비앤비규칙 뭐있는지 모름 사실
   *  */
  // ...compat.extends('airbnb'), // TS 프로젝트 인식 + 경로 alias 해석 + 글로벌 환경만 지정 (규칙 추가 없음)
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
      // props spreading 허용
      'react/jsx-props-no-spreading': 'off',
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
  }, // 선택: Vite HMR 규칙(원래 쓰던 거면 유지)
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
  }, // eslint 설정 파일엔 lint 규칙 미적용
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
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./.storybook/tsconfig.json'], // 핵심: .storybook tsconfig로 파싱
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: { ...globals.node },
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: { project: ['./.storybook/tsconfig.json'] }, // 여기도 지정
      },
    },
    rules: {
      // 스토리북/테스트 세팅 파일은 devDeps 허용
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      // 확장자 강제 끔(원한다면 켜고 아래처럼 .ts 붙여라)
      'import/extensions': 'off',
    },
  },
  ...compat.extends('prettier'),
  ...storybook.configs['flat/recommended'],
];
