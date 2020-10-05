module.exports = {
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix: 'app', style: 'camelCase' },
    ],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix: 'app', style: 'kebab-case' },
    ],
  },
  overrides: [
    {
      files: ['*.component.ts', '.*.component.html', '*.ts'],
      extends: [
        // AirBnB Styleguide rules
        'airbnb-typescript/base',
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ]      
    },
    overrides: [
      {
        files: ['*.component.ts', '.*.component.html', '*.ts'],
        extends: [
          // AirBnB Styleguide rules
         'airbnb-typescript/base', 
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          extraFileExtensions: [ ".*.component.html", ".*.html" ],
          project: ["tsconfig.json", "tsconfig.app.json"]
        },
        plugins: ['@angular-eslint/template', 'html'],
        processor: '@angular-eslint/template/extract-inline-html',
        rules: {
          '@typescript-eslint/comma-dangle': 'off',
          '@typescript-eslint/no-loop-func': 'off',
          '@typescript-eslint/no-redeclare': 'off',
          '@typescript-eslint/no-shadow': 'off',
          '@typescript-eslint/import-named': 'off',
          "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")]
        },
      },
      plugins: ['@angular-eslint/template', 'html'],
      processor: '@angular-eslint/template/extract-inline-html',
      rules: {
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/import-named': 'off',
      },
    },
  ],
};
