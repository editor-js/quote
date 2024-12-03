import CodeX from 'eslint-config-codex'
import { plugin as TsPlugin, parser as TsParser } from 'typescript-eslint';


export default [
  ...CodeX,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: TsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
        sourceType: 'module',
      },
    },
    rules: {
      'n/no-missing-import': ['off'],
    }
  },
  {
    ignores: ['dev/**', 'eslint.config.mjs', 'vite.config.js', 'postcss.config.js']
  }
]
